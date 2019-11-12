module.exports = class {
   constructor() {
      this.name = "help";
      this.alias = ["h", "guide"];
      this.usage = ".help";
      this.description = "View all commands";
   }

   async run(client, message, args) {
      let embed = {
         embed: {
            color: message.guild.me.displayHexColor,
            title: `Idle Miner Tycoon Help Menu`,
            description: ""
         }
      };
      client.modules.fs.readdir(`./commands/`, (err, files) => {
         if (err) return console.error(err);
         for (const file of files) {
            const command = require(`./${file}`);
            const cmd = new command();
            embed.embed.description = embed.embed.description.concat(
               `\n\`.${file.split(".")[0]}\` - ${cmd.description}`
            );
         }
         message.channel.send(embed);
      });
   }
};
