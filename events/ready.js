module.exports = (client) => {
    console.log(`[LOG] Bot successfully initialized:`);
    console.log(`- Username: ${client.user.username}`);
    console.log(`- Discriminator: ${client.user.discriminator}`);
    console.log(`- ID: ${client.user.id}`);
}