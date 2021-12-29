module.exports = {
    name: "ping",
    command: async (message, args) => {
        return new Promise(async (resolve, reject)=>{
            socket.sendMessage("Pong!", message).then(()=>{resolve();}).catch(()=>{reject}); 
        });
    }
}
