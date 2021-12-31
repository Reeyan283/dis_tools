require("./emitter.js");
require("./gateway.js");
require("./functions.js")
const config = require("./config");
const wordBank = require("./wordBank");

const fs = require("fs");

const { exec } = require("child_process");
  exec("node gateway.js")

global.muted = [];
global.db = {};
config.banks.snipe.forEach(id=>{
    db[id] = {};
});

emitter.on("initialize", ()=>{
    /* command handler */
    socket.commands = [];
    const files = fs.readdirSync("./commands")
      .filter(file=>file.endsWith(".js"))
      .map(file=>{return __dirname + "\\commands\\" + file});
    files.forEach(file => {
        let command = require(file);
        socket.commands.push(command);
    });

    // get function
    socket.commands.get = async (str)=>{
        return new Promise((resolve, reject)=>{
            socket.commands.forEach((command)=>{
                if (command.name == str) resolve(command);
                if (command.aliases) {
                    command.aliases.forEach(alias=>{if (alias == str) resolve(command)});
                }
            });
            reject();
        });
    }
});

emitter.on("message", async (message)=>{
    cache(message);

    /*mute*/
    if (muted.includes(message.author.id) || muted.includes(message.channel_id)) socket.deleteMessage(message);

    alexSorry(message);

    /* El L */
    if (config.whiteList.includes(message.author.id) && message.content.toLowerCase() == 'l') return require("./commands/figlet.js").command(message, ["L"]);

    commandParser(message).then(()=>{}).catch((err)=>{
        if (err) console.log(err);
    });
});

async function commandParser(message) {
    return new Promise(async (resolve, reject) => {
        config.prefixes.forEach(async prefix=> {
            if (!message.content.startsWith(prefix) || !config.whiteList.includes(message.author.id)) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            let command = args.shift().toLowerCase();

            command = await socket.commands.get(command).catch((err)=>{return err});
            if (!command) {return};
            if (command.delete) socket.deleteMessage(message);
            command.command(message, args).then(()=>{}).catch((err)=>{
                reject(err);
            });
        });
    });
}

function alexSorry(message) {
    if (message.author.id != "647678228613300236") return;

    let msg = message.content.toLowerCase()
      .replaceAll(" ", "")
      .replaceAll(".", "")
    config.banks.alexSorry.forEach((word)=>{
        if (msg.includes(word)) socket.sendMessage("Don't be sorry", message);
    });
    return;
}

function cache(message) {
    if (config.banks.snipe.includes(message.channel_id)) {
        db[message.id] = message;
    }
}
