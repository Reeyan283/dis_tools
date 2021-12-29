const config = require("./config.json");

const webSocketClient = require("websocket").client;
  let client = new webSocketClient();
  client.connect(config.gateway.url);

global.d = 0;

client.on("connectFailed", (err)=>{
    console.log(err);
});

client.on("connect", (connection)=>{
    global.socket = connection;
    emitter.emit("initialize");

    socket.on("message", (message)=>{
        message = JSON.parse(message.utf8Data);
		
		switch(message.op) {
            case 0:
                switch (message.t) {
                    case "READY":
                        socket.log("Ready!");
                        break;
                    case "MESSAGE_CREATE":
                        emitter.emit("message", message.d);
                }
                break;
            case 1:
                heartbeat();
                break;
			case 10:
                identify();
                setInterval(heartbeat, message.d.heartbeat_interval);
                break;
		}
    });
});

function heartbeat() {
    let payload = {
        "op": 1,
        "d": d
    }
    d++;
    socket.sendUTF(JSON.stringify(payload));
}

function identify() {
    let payload = {
        "op": 2,
        "d": {
            "token": config.token,
            "capabilities": 253,
            "properties": {
                "$os": "linux",
                "$browser": "dis_tools",
                "$device": "dis_tools"
            }
        }
    }

    socket.sendUTF(JSON.stringify(payload));
}
