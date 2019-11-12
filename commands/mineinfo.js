module.exports = class mineinfo {
   constructor() {
      this.name = "mineinfo";
      this.alias = ["mi"];
      this.usage = ".mineinfo";
   }

   async run(client, message, args) {
      if (args[1]) {
         args[1] = `${args[1].charAt(0).toUpperCase()}${args[1]
            .slice(1)
            .toLowerCase()}`;
         let mine = client.storage.mines.find(x => x.type == args[1]);
         message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .addField(
                  `**${mine.type} Mine**`,
                  `\`Rarity\` ${client.functions.noToStarEmoji(
                     mine.rarity
                  )}\n\`Sell Price/KG\` $${client.functions.formatNumber(
                     mine.ppk
                  )}\n\`KG/s\` ${mine.kgps}`
               )
         );
      } else {
         if (client.mineSelected.has(message.author.id)) {
            client.models.userProfiles
               .findOne({
                  user_id: message.author.id
               })
               .lean()
               .exec((err, docs) => {
                  if (err) return console.error(err);
                  const mineType = docs.mines.find(
                     x => x.index == client.mineSelected.get(message.author.id)
                  ).type;
                  const mine = client.storage.mines.find(
                     x => x.type.toUpperCase() == mineType
                  );
                  message.channel.send(
                     new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .addField(
                           `**${mine.type} Mine**`,
                           `\`Rarity\` ${client.functions.noToStarEmoji(
                              mine.rarity
                           )}\n\`Sell Price/KG\` $${client.functions.formatNumber(
                              mine.ppk
                           )}\n\`KG/s\` ${mine.kgps}`
                        )
                  );
               });
         } else {
            client.functions.noMineSelectedMsg(client, message);
         }
      }
   }
};
