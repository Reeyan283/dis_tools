const fs = require("fs");

module.exports = {
    name: "note",
    aliases: ["notes", "n"],
    delete: true,
    command: async (message, args) => {
        return new Promise((resolve, reject)=>{
            let flag = "-w";
            if (!args || args == [] || args.length == 0) {reject("empty")};
            if(args[0].startsWith("-")) {flag = args.shift()};
            let path = `${__dirname}/../notes/${message.channel_id}.txt`;
            
            switch (flag) {
                case "-w":
                    let msg = args.join(" ");

                    if (!fs.existsSync(path)) {
                        fs.writeFile(path, `${time()}> ${msg}`, (err)=>{if (err) reject(err)});
                    } else {
                        fs.appendFile(path, `\n${time()}> ${msg}`, (err) => {if (err) reject(err)});
                    }
                    resolve();
                    break;
                case "-s":
                    if (!fs.existsSync(path)) {reject("404")};
                    
                    fs.readFile(path, "utf-8", async (err, data)=>{
                        if (err) reject(err);

                        resolve(socket.sendMessage("**NOTES**\\n" + data, message));
                    });
            };
        });
    }
}
