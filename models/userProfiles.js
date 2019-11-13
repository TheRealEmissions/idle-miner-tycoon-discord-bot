const modules = require(`../modules.js`);
const mines = new modules.mongoose.Schema({
   index: {
      type: Number,
      required: true
   },
   type: {
      type: String,
      required: false,
      default: null
   },
   prestige: {
      type: Number,
      required: false,
      default: 0
   },
   level: {
      type: Number,
      required: false,
      default: 1
   },
   balance: {
      type: Number,
      required: false,
      default: 0
   },
   lastsell_timestamp: {
      type: Date,
      required: false,
      default: new Date()
   }
});
module.exports = modules.mongoose.model(
   `userProfiles`,
   new modules.mongoose.Schema({
      user_id: {
         type: String,
         required: true
      },
      status: {
         type: String,
         required: false,
         default: null
      },
      points: {
         type: Number,
         required: false,
         default: 0
      },
      rebirth: {
         type: Number,
         required: false,
         default: 0
      },
      mines: [mines]
   })
);
