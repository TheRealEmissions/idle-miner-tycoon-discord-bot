const modules = require(`../modules`);
module.exports = modules.mongoose.model(`guildMines`, new modules.mongoose.Schema({
    guild_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    sum_kg: {
        type: Number,
        required: false,
        default: 0
    },
    sum_money: {
        type: Number,
        required: false,
        default: 0
    },
    sum_prestiges: {
        type: Number,
        required: false,
        default: 0
    },
    sum_rebirths: {
        type: Number,
        required: false,
        default: 0
    }
}));