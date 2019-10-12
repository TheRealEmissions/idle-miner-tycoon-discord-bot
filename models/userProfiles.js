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
    total_kg: {
        type: Number,
        required: false,
        default: 0
    } // earned in total, not what the user currently has
});
module.exports = modules.mongoose.model(`userProfiles`, new modules.mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    mines: [mines]
}));