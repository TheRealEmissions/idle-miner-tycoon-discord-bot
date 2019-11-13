module.exports = class {
   constructor() {
      this.name = "levelup";
      this.alias = ["lu"];
      this.usage = ".levelup";
      this.description = "Level up your currently selected mine";
      this.rewards = [
         {
            level: 2,
            points: 2
         },
         {
            level: 5,
            points: 2
         },
         {
            level: 10,
            points: 3
         },
         {
            level: 20,
            points: 3
         },
         {
            level: 30,
            points: 3
         },
         {
            level: 50,
            points: 4
         },
         {
            level: 75,
            points: 4
         },
         {
            level: 100,
            points: 4
         },
         {
            level: 150,
            points: 5
         },
         {
            level: 200,
            points: 5
         },
         {
            level: 250,
            points: 10
         }
      ];
   }

   async run(client, message, args) {
      if (client.mineSelected.has(message.author.id)) {
         client.models.userProfiles.findOne(
            {
               user_id: message.author.id
            },
            (err, db) => {
               if (err) return console.error(err);
               const minedb = db.mines.find(
                  x => x.index == client.mineSelected.get(message.author.id)
               );
               const mine = client.storage.mines.find(
                  x =>
                     x.type ==
                     `${minedb.type.charAt(0)}${minedb.type
                        .toLowerCase()
                        .slice(1)}`
               );
               let amountforlevel = Number(
                  (
                     mine.kgps *
                     120 *
                     (1.05 ^ (minedb.level - 1)) *
                     mine.ppk
                  ).toFixed(2)
               );
               minedb.balance = Number(minedb.balance.toFixed(2));
               if (minedb.balance >= amountforlevel) {
                  db.mines.find(
                     x => x.index == client.mineSelected.get(message.author.id)
                  ).balance -= amountforlevel;
                  db.mines.find(
                     x => x.index == client.mineSelected.get(message.author.id)
                  ).level += 1;
                  if (
                     this.rewards.find(
                        x =>
                           x.level ==
                           db.mines.find(
                              x =>
                                 x.index ==
                                 client.mineSelected.get(message.author.id)
                           ).level
                     )
                  ) {
                     db.points += this.rewards.find(
                        x =>
                           x.level ==
                           db.mines.find(
                              x =>
                                 x.index ==
                                 client.mineSelected.get(message.author.id)
                           ).level
                     ).points;
                  }
                  db.markModified("mines");
                  db.save(err => {
                     if (err) return console.error(err);
                     else {
                        message.channel.send(
                           new client.modules.Discord.MessageEmbed()
                              .setColor(message.guild.me.displayHexColor)
                              .setTitle(`Upgraded!`)
                              .setDescription(
                                 `Upgraded your **${minedb.type.charAt(
                                    0
                                 )}${minedb.type
                                    .toLowerCase()
                                    .slice(1)} Mine** to **Level ${
                                    db.mines.find(
                                       x =>
                                          x.index ==
                                          client.mineSelected.get(
                                             message.author.id
                                          )
                                    ).level
                                 }**! :partying_face:`
                              )
                              .addField(
                                 `Changes:`,
                                 `**+5%** Upgrade Cost\n**+2.5%** Backpack Size${
                                    this.rewards.find(
                                       x =>
                                          x.level ==
                                          db.mines.find(
                                             x =>
                                                x.index ==
                                                client.mineSelected.get(
                                                   message.author.id
                                                )
                                          ).level
                                    )
                                       ? `\n**+${
                                            this.rewards.find(
                                               x =>
                                                  x.level ==
                                                  db.mines.find(
                                                     x =>
                                                        x.index ==
                                                        client.mineSelected.get(
                                                           message.author.id
                                                        )
                                                  ).level
                                            ).points
                                         }** Points`
                                       : ""
                                 }`
                              )
                        );
                     }
                  });
               } else {
                  message.channel.send(
                     new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(
                           `You cannot afford this upgrade! It costs **$${client.functions.formatNumber(
                              amountforlevel
                           )}** and you only have **$${client.functions.formatNumber(
                              minedb.balance
                           )}**. You need $${client.functions.formatNumber(
                              amountforlevel - minedb.balance
                           )} more.`
                        )
                  );
               }
            }
         );
      } else {
         message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .setDescription(
                  `You do not have a mine selected! Please select a mine with \`.select\``
               )
         );
      }
   }
};
