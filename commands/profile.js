module.exports = class profile {
   constructor() {
      this.name = "profile";
      this.alias = ["p"];
      this.usage = ".profile";
      this.description = "View your or another user's profile";
   }

   async run(client, message, args) {
      if (!message.mentions.users.first()) {
         client.models.userProfiles.findOne(
            {
               user_id: message.author.id
            },
            (err, db) => {
               if (err) return console.error(err);
               let embed = {
                  embed: {
                     color: message.guild.me.displayHexColor,
                     title: `**${message.author.username}${
                        message.author.username.endsWith("s") ? `'` : `'s`
                     } Profile:**`,
                     description: `${
                        String(db.status) !== "null"
                           ? db.status
                           : `Did you know? You can set a custom status here with \`.setstatus\``
                     }\n** **\n\`Rebirth\` ${db.rebirth}\n\`Points\` ${
                        db.points
                     }`,
                     thumbnail: {
                        url: `${message.author.avatarURL()}`
                     },
                     fields: []
                  }
               };
               for (const mine of db.mines) {
                  embed.embed.fields.push({
                     name: `${mine.type.charAt(
                        0
                     )}${mine.type
                        .toLowerCase()
                        .slice(1)} Mine ${client.functions.noToStarEmoji(
                        client.storage.mines.find(
                           x =>
                              x.type ==
                              `${mine.type.charAt(
                                 0
                              )}${mine.type.toLowerCase().slice(1)}`
                        ).rarity
                     )}`,
                     value: `\`Prestige\` ${mine.prestige}\n\`Level\` ${
                        mine.level
                     }\n\`Balance\` $${client.functions.formatNumber(
                        Number(mine.balance.toFixed(2))
                     )}${
                        client.functions
                           .formatNumber(Number(mine.balance.toFixed(2)))
                           .split(".")[1].length == 1
                           ? `0`
                           : ""
                     }`,
                     inline: true
                  });
               }
               message.channel.send(embed);
            }
         );
      } else {
         let user = message.mentions.users.first();
         if (!user) return;
         client.models.userProfiles.findOne(
            {
               user_id: user.id
            },
            (err, db) => {
               if (err) return console.error(err);
               if (!db) {
                  message.channel.send(
                     new client.modules.Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(
                           `This user has not created a profile! <:RRRRRRRRRREEEEEEEEEEEEEEEEE:630505564950102026>`
                        )
                  );
                  return;
               }
               let embed = {
                  embed: {
                     color: message.guild.me.displayHexColor,
                     title: `**${user.username}${
                        user.username.endsWith("s") ? `'` : `'s`
                     } Profile:**`,
                     description:
                        String(db.status) !== "null"
                           ? `${db.status}\n** **\n\`Rebirth\` ${db.rebirth}\n\`Points\` ${db.points}`
                           : `\n** **\n\`Rebirth\` ${db.rebirth}\n\`Points\` ${db.points}`,
                     thumbnail: {
                        url: `${user.avatarURL()}`
                     },
                     fields: []
                  }
               };
               for (const mine of db.mines) {
                  embed.embed.fields.push({
                     name: `${mine.type.charAt(
                        0
                     )}${mine.type
                        .toLowerCase()
                        .slice(1)} Mine ${client.functions.noToStarEmoji(
                        client.storage.mines.find(
                           x =>
                              x.type ==
                              `${mine.type.charAt(
                                 0
                              )}${mine.type.toLowerCase().slice(1)}`
                        ).rarity
                     )}`,
                     value: `\`Prestige\` ${mine.prestige}\n\`Level\` ${mine.level}`,
                     inline: true
                  });
               }
               message.channel.send(embed);
            }
         );
      }
   }
};
