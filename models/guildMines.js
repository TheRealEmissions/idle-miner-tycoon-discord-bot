const modules = require(`../modules`);
module.exports = modules.mongoose.model(`guildMines`, new modules.mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    total_kg: {
        type: Number,
        required: false,
        default: 0
    }
}));