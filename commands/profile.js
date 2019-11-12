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
                        mine.balance
                     )}`,
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
               let embed = {
                  embed: {
                     color: message.guild.me.displayHexColor,
                     title: `**${user.username}${
                        user.username.endsWith("s") ? `'` : `'s`
                     } Profile:**`,
                     description:
                        String(db.status) !== "null" ? db.status : null,
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
