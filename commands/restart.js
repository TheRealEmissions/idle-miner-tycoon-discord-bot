module.exports = class {
   constructor() {
      this.name = "restart";
      this.alias = ["re"];
      this.usage = ".restart";
      this.description = "Completely reset your profile";
   }

   check(client, message) {
      return new Promise((resolve, reject) => {
         message.channel
            .send(
               new client.modules.Discord.MessageEmbed()
                  .setColor(message.guild.me.displayHexColor)
                  .setDescription(
                     `Are you sure you want to restart? **This cannot be undone.**`
                  )
            )
            .then(msg => {
               msg.react(`✅`);
               msg.react(`❌`);
               const collector = new client.modules.Discord.ReactionCollector(
                  msg,
                  (reaction, user) =>
                     ["✅", "❌"].includes(reaction.emoji.name) &&
                     user.id == message.author.id,
                  {
                     max: 1
                  }
               );
               collector.on("collect", reaction => {
                  collector.stop();
                  msg.delete();
                  if (reaction.emoji.name == "✅") {
                     return resolve(true);
                  } else {
                     return resolve(false);
                  }
               });
            });
      });
   }

   async run(client, message, args) {
      const check = await this.check(client, message);
      if (check == true) {
         const msg = await message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .setDescription(
                  `Restarting your profile... <:sorrywhat:630503150096220160>`
               )
         );
         client.models.userProfiles.deleteOne(
            {
               user_id: message.author.id
            },
            err => {
               if (err) return console.error(err);
            }
         );
         client.models.userCrates.deleteOne(
            {
               user_id: message.author.id
            },
            err => {
               if (err) return console.error(err);
            }
         );
         client.mineSelected.delete(message.author.id);
         msg.delete();
         try {
            const cmd = client.commandHandler.getCommand(`.start`);
            if (!cmd) return;
            cmd.run(client, message, null);
         } catch (err) {
            return console.error(err);
         }
      } else return;
   }
};
