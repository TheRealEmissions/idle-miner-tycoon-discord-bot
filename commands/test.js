module.exports = class test {
   constructor() {
      this.name = "test";
      this.alias = [];
      this.usage = "-test";
   }

   async run(client, message, args) {
      console.log(client.functions.genNumberBetween(0, 1));
   }
};
