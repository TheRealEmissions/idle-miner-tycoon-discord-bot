module.exports = class setstatus {
   constructor() {
      this.name = "setstatus";
      this.alias = ["ss"];
      this.usage = ".setstatus";
      this.description = "Update your status on your profile";
   }

   async run(client, message, args) {
      if (!args[1]) {
         message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .setDescription(
                  `You must include the status you wish to set in the command.`
               )
         );
         return;
      }
      client.models.userProfiles.findOne(
         {
            user_id: message.author.id
         },
         (err, db) => {
            if (err) return console.error(err);
            db.status = `${message.content.slice(args[0].length + 1)}`;
            db.save(err => {
               if (err) return console.error(err);
               message.channel.send(
                  new client.modules.Discord.MessageEmbed()
                     .setColor(message.guild.me.displayHexColor)
                     .setDescription(
                        `Updated your status to: ${message.content.slice(
                           args[0].length + 1
                        )}`
                     )
               );
            });
         }
      );
   }
};
