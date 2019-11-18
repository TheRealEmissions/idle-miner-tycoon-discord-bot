const commandRunning = new Set();
module.exports = class open {
   constructor() {
      this.name = "open";
      this.alias = ["o"];
      this.usage = ".open";
      this.crates = new Map();
      this.description = "Open a crate";
   }

   async run(client, message, args) {
      if (commandRunning.has(message.author.id)) {
         message.channel.send(
            new client.modules.Discord.MessageEmbed()
               .setColor(message.guild.me.displayHexColor)
               .setDescription(
                  `This command is already running! You cannot run two of these commands at once!`
               )
         );
         return;
      }
      commandRunning.add(message.author.id);
      client.models.userCrates.findOne(
         {
            user_id: message.author.id
         },
         (err, db) => {
            if (err) return console.error(err);
            let minecrates = "";
            for (const c of db.mine_crates) {
               if (c.amount == 0) continue;
               let no = client.functions.genNumberBetween(1, 100);
               /**
                * Minecrates name in CRATES MAP =>
                * mc(star)
                * i.e.
                * mc1 mc2
                */
               this.crates.set(no, `mc${c.star}`);
               let str = `\n${c.amount}x ${client.functions.noToStarEmoji(
                  c.star
               )} \`${no}\``;
               minecrates = minecrates.concat(str);
            }
            if (minecrates == "") {
               message.channel.send(
                  new client.modules.Discord.MessageEmbed()
                     .setColor(message.guild.me.displayHexColor)
                     .setDescription(
                        `You do not have any crates to open... :slight_frown:`
                     )
               );
               return;
            }
            let embed = {
               embed: {
                  color: message.guild.me.displayHexColor,
                  title: `**${message.author.username}${
                     message.author.username.endsWith("s") ? `'` : `'s`
                  } Crates:**`,
                  description: `** **\n:one: **Open a crate**\n:x: **Close this menu**\n**⠀**`,
                  fields: [
                     {
                        name: "Mine Crates",
                        value: minecrates
                     }
                  ]
               }
            };
            message.channel.send(embed).then(msg => {
               msg.react(`1⃣`);
               msg.react(`❌`);
               let collector = new client.modules.Discord.ReactionCollector(
                  msg,
                  (reaction, user) =>
                     (reaction.emoji.name == `1⃣` ||
                        reaction.emoji.name == "❌") &&
                     user.id == message.author.id,
                  {
                     max: 1
                  }
               );
               collector.on("collect", reaction => {
                  collector.stop();
                  if (reaction.emoji.name == `1⃣`) {
                     msg.reactions.removeAll();
                     embed.embed.description = `** **\n:white_check_mark: **Please reply with the ID you wish to open**\n:x: Close this menu\n** ⠀**`;
                     msg.edit(embed);
                     let collector = new client.modules.Discord.MessageCollector(
                        message.channel,
                        m => m.author.id == message.author.id,
                        {
                           max: 1
                        }
                     );
                     collector.on("collect", id => {
                        collector.stop();
                        id.delete();
                        new client.methods.crateHandler(
                           client,
                           message,
                           msg,
                           this.crates.get(Number(id.content))
                        );
                        this.crates.clear();
                        commandRunning.delete(message.author.id);
                     });
                  }
                  if (reaction.emoji.name == "❌") {
                     msg.delete();
                     message.delete();
                     commandRunning.delete(message.author.id);
                  }
               });
            });
         }
      );
   }
};
