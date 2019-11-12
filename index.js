const modules = require(`./modules.js`);
const storage = require(`./storage.js`);
const functions = require(`./functions.js`);
const methods = require(`./methods.js`);
const models = require(`./models.js`);
const client = new modules.Discord.Client({
   disableEveryone: false,
   shardCount: 1,
   totalShardCount: 1,
   messageCacheMaxSize: 200,
   messageCacheLifetime: 0,
   messageSweepInterval: 0,
   fetchAllMembers: false,
   restWsBridgeTimeout: 5000,
   restTimeOffset: 500,
   restSweepInterval: 60,
   disabledEvents: ["TYPING_START"]
});
const auth = require(`./storage/auth`);
if (!auth) {
   console.error(`[ERROR] Could not find auth.js in /storage/`);
   return;
}

/*
HANDLERS
*/

let url = auth.mongoUrl;
if (!url) {
   console.error(`[ERROR] Could not find mongoUrl in auth.js /storage/`);
   return;
}
if (typeof url !== "string") {
   console.error(`[ERROR] mongoUrl provided is NOT string`);
   return;
}
modules.mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
modules.mongoose.connection.on(
   "error",
   console.error.bind(console, `[ERROR] Connection error:`)
);
modules.mongoose.connection.once("open", () => {
   console.log(`[LOG] Connected to the database.`);
});

modules.fs.readdir(`./events/`, (err, files) => {
   if (err) return console.error(err);
   files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
      console.log(`[LOG] Loaded event ${file}`);
   });
});

const { CommandHandler } = require(`djs-commands`);
let cmdHandler = new CommandHandler({
   folder: __dirname + `/commands/`,
   prefix: ["."]
});

/*
BINDINGS
*/

client.modules = modules;
client.commandHandler = cmdHandler;
client.storage = storage;
client.functions = functions;
client.methods = methods;
client.models = models;

const mineSelected = new Map();
client.mineSelected = mineSelected;

/*
EXPORTS + LOGIN
*/

module.exports = client;
let token = auth.token;
if (!token) {
   console.error(`[ERROR] Cannot find token in auth.js in /storage/`);
   return;
}
if (typeof token !== "string") {
   console.error(
      `[ERROR] Token presented in auth.js /storage/ not a string!  `
   );
   return;
}
client.login(require(`./storage/auth`).token);
