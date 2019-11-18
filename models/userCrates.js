const modules = require(`../modules`);
const minecrates = new modules.mongoose.Schema({
   star: {
      type: Number,
      required: true
   },
   amount: {
      type: Number,
      required: false,
      default: 0
   }
});
const standardcrates = new modules.mongoose.Schema({
   star: {
      type: Number,
      required: true
   },
   amount: {
      type: Number,
      required: false,
      default: 0
   }
});
module.exports = modules.mongoose.model(
   `userCrates`,
   new modules.mongoose.Schema({
      user_id: {
         type: String,
         required: true
      },
      mine_crates: [minecrates],
      standard_crates: [standardcrates]
   })
);
