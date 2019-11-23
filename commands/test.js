module.exports = class test {
   constructor() {
      this.name = "test";
      this.alias = [];
      this.usage = "-test";
      this.description = "Test command for bot owner";
   }

   async run(client, message, args) {
      message.channel.send(`Did you see how this command said "command for bot owner" not "command for bot user"?`)
   }
};