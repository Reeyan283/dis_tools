module.exports = {
    name: "get",
    "aliases": ["g"],
    command: async (message, args) => {
        return new Promise((resolve, reject)=>{
            if (!args[0]) reject("no flag");
            if (!args[0].startsWith("-")) reject("bad flag");
            let flag = args[0].substring(1).toLowerCase();

            switch(flag) {
                case "channel":
                case "cid":
                    socket.sendMessage(message.channel_id, message);
                    resolve();
                    break;
                case "guild":
                case "gid":
                    if (message.guild_id) {
                        socket.sendMessage(message.guild_id, message); } else {
                        socket.sendMessage("@me", message); }
                    resolve();
                default: 
                    reject("bad flag");
                    break;
            }
        });
    }
}
