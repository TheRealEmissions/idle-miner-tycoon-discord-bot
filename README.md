=---------- MODULES -----------=

To access modules (such as Discord or fs) please use this:

    client.modules.<module>

If the client is not passed through in your file, you can access it like this:

    let client = require(`./index.js`);

=---------- FUNCTIONS -----------=

Functions are stored under the "functions" directory. To setup a functions file:

The file should look like this:

    module.exports = (one, two, three) => {
        //code here
    }

You should then update the functions.js file with the respective file, for example:

    null: require(`./functions/null.js`)

=---------- STORAGE -----------=

To make life easy, I have implemented a storage system. Static information can be stored in Javascript files, it looks like JSON.

The file should look like this:

    module.exports = {
        info: `info`,
            "info": `info`
    }

You can do as you please in storage files. From here, please add the new storage file to storage.js; it should look like this:

    info: require(`./storage/info.js`)

From here, you can access the storage file like this:

    client.storage.<filename>["info"] for the "info" export
OR

    client.storage.<filename>.info for the info: export

=-------------- NOTES -----------------=

Due to how I have implemented these systems, you will **never** need to update the index.js file, the only files you should edit that are in the main directory are:

functions.js
modules.js
storage.js

and the sub-directories following it.