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
                  `This command is already running, you cannot run two or more of this command at once!`
               )
         );
         return;
      }
      commandRunning.add(message.author.id);
      client.models.userCrates.findOne(
         {
            user_id: message.author.id
         },
         async (err, db) => {
            if (err) {
               commandRunning.delete(message.author.id);
               return console.error(err);
            }
            const minecrates = await this.minecratesString(client, message, db);
            const standardcrates = await this.standardcratesString(
               client,
               message,
               db
            );
            if (minecrates == "" && standardcrates == "") {
               message.channel.send(
                  new client.modules.Discord.MessageEmbed()
                     .setColor(message.guild.me.displayHexColor)
                     .setDescription(
                        `You do not have any crates to open... :slight_frown:`
                     )
               );
               commandRunning.delete(message.author.id);
               return;
            }
            let embed = await this.constructEmbed(client, message, [
               {
                  string: minecrates,
                  name: "Mine Crates"
               },
               {
                  string: standardcrates,
                  name: "Standard Crates"
               }
            ]);
            const msg = await message.channel.send(embed);
            let emojis = [`1⃣`, `❌`];
            for (const emoji of emojis) {
               msg.react(emoji);
            }
            let collector = new client.modules.Discord.ReactionCollector(
               msg,
               (reaction, user) =>
                  emojis.includes(reaction.emoji.name) &&
                  user.id == message.author.id,
               { max: 1 }
            );
            collector.on("collect", reaction => {
               collector.stop();
               if (reaction.emoji.name == emojis[0]) {
                  msg.reactions.removeAll();
                  embed.embed.description = `** **\n:white_check_mark: **Please reply with the ID you wish to open**\n:x: Close this menu\n** **`;
                  msg.edit(embed);
                  let collector = new client.modules.Discord.MessageCollector(
                     message.channel,
                     m => m.author.id == message.author.id,
                     {}
                  );
                  collector.on("collect", id => {
                     id.delete();
                     if (!this.crates.has(Number(id.content))) {
                        message.channel
                           .send(
                              `That is not a recognized ID. Please try again.`
                           )
                           .then(msg => setTimeout(() => msg.delete(), 2500));
                     } else {
                        collector.stop();
                        new client.methods.crateHandler(
                           client,
                           message,
                           msg,
                           this.crates.get(Number(id.content))
                        );
                        this.crates.clear();
                        commandRunning.delete(message.author.id);
                     }
                  });
               }
               if (reaction.emoji.name == emojis[1]) {
                  msg.delete();
                  message.delete();
                  commandRunning.delete(message.author.id);
               }
            });
         }
      );
   }

   constructEmbed(client, message, crates = []) {
      return new Promise((resolve, reject) => {
         let embed = {
            embed: {
               color: message.guild.me.displayHexColor,
               title: `**${message.author.username}${
                  message.author.username.endsWith("s") ? `'` : `'s`
               } Crates:**`,
               description: `** **\n:one: **Open a crate**\n:x: **Close this menu**\n** **`,
               fields: []
            }
         };
         for (const crate of crates) {
            if (crate.string == "") continue;
            embed.embed.fields.push({
               name: crate.name,
               value: crate.string,
               inline: true
            });
         }
         return resolve(embed);
      });
   }

   standardcratesString(client, message, db) {
      return new Promise((resolve, reject) => {
         let string = "";
         for (const c of db.standard_crates) {
            if (c.amount == 0) continue;
            let no = 0;
            while (no == 0) {
               let rn = client.functions.genNumberBetween(1, 100);
               if (!this.crates.has(rn)) {
                  no = rn;
               }
            }
            this.crates.set(no, `sc${c.star}`);
            let str = `\n${c.amount}x ${client.functions.noToStarEmoji(
               c.star
            )} \`${no}\``;
            string = string.concat(str);
         }
         return resolve(string);
      });
   }

   minecratesString(client, message, db) {
      return new Promise((resolve, reject) => {
         client.models.userProfiles
            .findOne({
               user_id: message.author.id
            })
            .lean()
            .exec((err, docs) => {
               if (err) {
                  commandRunning.delete(message.author.id);
                  return reject(err);
               }
               let string = "";
               if (docs.mines.length >= 5) {
                  return resolve("");
               } else {
                  for (const c of db.mine_crates) {
                     if (c.amount == 0) continue;
                     let no = 0;
                     while (no == 0) {
                        let rn = client.functions.genNumberBetween(1, 100);
                        if (!this.crates.has(rn)) {
                           no = rn;
                        }
                     }
                     this.crates.set(no, `mc${c.star}`);
                     let str = `\n${c.amount}x ${client.functions.noToStarEmoji(
                        c.star
                     )} \`${no}\``;
                     string = string.concat(str);
                  }
                  return resolve(string);
               }
            });
      });
   }
};
