const config = require("./config");
const fetch = require("node-fetch");

emitter.on("initialize", ()=>{
    socket.log = async (msg) => {
        return new Promise( async (resolve, reject)=>{
            let obj = {
                cId: config.logs.cId,
                gId: "@me"
            }
            
            obj["message"] = await sanatize(msg).catch((err)=>{reject(err)});

            sendMessage(obj);
        });
    }

    socket.sendMessage = async (msg, message) => {
        return new Promise(async (resolve, reject)=>{ 
            let obj = {
                cId: message.channel_id,
                gId: "@me"
            }
            if (message.guild_id) {obj.gId = message.guild_id}

            obj["message"] = await sanatize(msg).catch((err)=>{
                reject(err);
            });

            sendMessage(obj)
        });
    }

    socket.deleteMessage = async (message) => {
        return new Promise(async (resolve, reject)=>{
            let obj = {
                cId: message.channel_id,
                mId: message.id,
                gId: "@me"
            }

            if (message.guild_id) { obj.gId = message.guild_id }
            deleteMessage(obj);
        });
    }
});

function sendMessage(obj) {
    fetch(`https://discord.com/api/v9/channels/${obj.cId}/messages`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": "mfa.5R4WoWEWmWXTaRzzE7waQM_CytXt4taPHN9iqIX1gjCU6EJ694QoxG5gqp60GSJAsiCFu1fw-NGIUp7HE6gv",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"96\", \" Not A;Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-US",
            "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC4xMTMgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijk2LjAuNDY2NC4xMTMiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
            "cookie": "__dcfduid=79e4eb30560a11ecb5d2cfd0a84a792b; __sdcfduid=79e4eb31560a11ecb5d2cfd0a84a792bfd47b51a9707c1bf1ef7d5bc95d99aaf43029e3b1f50e9c349741eb6c9119532; OptanonConsent=isIABGlobal=false&datestamp=Sun+Dec+26+2021+14%3A44%3A04+GMT-0700+(Mountain+Standard+Time)&version=6.17.0&hosts=&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1&AwaitingReconsent=false",
            "Referer": `https://discord.com/channels/${obj.gId}/${obj.cId}`,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `{\"content\":\"${obj.message}\",\"nonce\":\"${Date.now()}\",\"tts\":false}`,
        "method": "POST"
        });
}

function deleteMessage(obj) {
    fetch(`https://discord.com/api/v9/channels/${obj.cId}/messages/${obj.mId}`, {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "mfa.5R4WoWEWmWXTaRzzE7waQM_CytXt4taPHN9iqIX1gjCU6EJ694QoxG5gqp60GSJAsiCFu1fw-NGIUp7HE6gv",
        "sec-ch-ua": "\"Chromium\";v=\"96\", \" Not A;Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-debug-options": "bugReporterEnabled",
        "x-discord-locale": "en-US",
        "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzk2LjAuNDY2NC4xMTMgU2FmYXJpLzUzNy4zNiIsImJyb3dzZXJfdmVyc2lvbiI6Ijk2LjAuNDY2NC4xMTMiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTA4OTI0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        "Referer": `https://discord.com/channels/${obj.gId}/${obj.cId}`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "DELETE"
    });
}

global.sanatize = async (input) =>{
    return new Promise((resolve, reject)=>{
        if (typeof input != "string") reject(); 
        input = input
          .replaceAll("\r", "")
          .replaceAll("\\", "\\\\")
          .replaceAll("\n", "\\n")

        resolve(input);
    });
}

global.time = ()=>{
    let date = new Date();
    
    let str = date.toISOString().substring(0, 11);
    if (date.getHours().toString().length == 1) {str+="0"+date.getHours();} else {str+=date.getHours();}
    str+=":";
    if (date.getMinutes().toString().length == 1) {str+="0"+date.getMinutes();} else {str+=date.getMinutes();}
    str+=":";
    if (date.getSeconds().toString().length == 1) {str+="0"+date.getSeconds();} else {str+=date.getSeconds();}
    str+=":";
    let milliseconds = date.getMilliseconds();
    for (i=date.getMilliseconds().toString().length - 1; i<1; i++) {
       milliseconds = "0" + milliseconds; 
    }
    str+=milliseconds;
    return str;
}
