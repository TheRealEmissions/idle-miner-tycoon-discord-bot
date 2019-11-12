module.exports = class test {
   constructor() {
      this.name = "test";
      this.alias = [];
      this.usage = "-test";
      this.description = "Test command for bot owner";
   }

   async run(client, message, args) {
      message.channel.send(`success`);
   }
};
