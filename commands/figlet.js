const figlet = require("figlet");

module.exports = {
    name: "figlet",
    delete: true,
    command: async (message, args) => {
        return new Promise((resolve, reject)=>{
            if (args.lenght == 0) resolve("empty message");
            let msg = args.join(" ");
            figlet(msg, (err, data)=>{
                if (err) reject(err);
                data = `${message.author.username}> \n\`\`\`${data}\`\`\``
                socket.sendMessage(data, message);
            });
        });
    }
}
