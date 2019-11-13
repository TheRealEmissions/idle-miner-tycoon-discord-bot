const modules = require(`../modules`);
module.exports = modules.mongoose.model(
   `guildStats`,
   new modules.mongoose.Schema({
      guild_id: {
         type: String,
         required: true
      },
      sum_rebirths: {
         type: Number,
         required: false,
         default: 0
      },
      sum_sells: {
         type: Number,
         required: false,
         default: 0
      },
      sum_levelups: {
         type: Number,
         required: false,
         default: 0
      },
      sum_points: {
         type: Number,
         required: false,
         default: 0
      }
   })
);
