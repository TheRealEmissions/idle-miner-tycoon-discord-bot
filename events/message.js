module.exports = async (client, message) => {
   if (message.channel.type !== "text") return;
   if (message.author.id == client.user.id) return;
   if (message.author.bot) return;
   if (message.content.toString().startsWith(".")) {
      client.models.userProfiles.findOne(
         {
            user_id: message.author.id
         },
         (err, db) => {
            if (err) return console.error(err);
            if (!db) {
               if (message.content.toString().split(" ")[0] == ".start") {
                  try {
                     let cmd = client.commandHandler.getCommand(".start");
                     cmd.run(client, message, []);
                  } catch (err) {
                     console.error(err);
                  }
               } else {
                  message.channel.send(
                     `:x: You must run \`.start\` before running any other commands!`
                  );
               }
            } else {
               let args = message.content.split(" ");
               let command = args[0];
               let cmd = client.commandHandler.getCommand(command);
               if (!cmd) return;
               try {
                  cmd.run(client, message, args);
               } catch (err) {
                  console.error(err);
               }
            }
         }
      );
   }
};
