import WebSocket from 'ws';
import fetch from "node-fetch";
import chalkAnimation from 'chalk-animation';
import path from 'path';
import fs from "fs";
import os from "os";

import notify from "../utils/createNotif.js"
import verifyToken from "../utils/verifyToken.js";
import scrapeUserIds from '../data/scrapeUserIds.js';
import userContainers from "../data/containers/userstorage.js";
import logsUpdate from '../utils/logs.update.js';
import menu from '../settings/menu.js';
import { addRecipientToChannel, removeRecipientFromChannel } from '../utils/addRemoveRecipient.js';
import { sendContent as sendMessage, deleteContent as deleteMessage, editContent as editMessage } from '../utils/client/manageContent.js';
import { info, options } from "../settings/configs.js";
import { exec } from 'child_process';
import { cwd } from 'process';
console.clear() 
exec("mode con: cols=85 lines=40")
const userData = await verifyToken(info.token);
if (!userData.username) console.log("Invalid Token!"), process.exit(1)
else {
    // let key = null;
    // const itfs = Object.values(os.networkInterfaces());
    // const xs = [];

    // for (var x = 0; x < itfs.length; x++) {
    //     var CI = itfs[x];
    //     for (var y = 0; y < CI.length; y++) {
    //         var adrs = CI[y];
    //         if (adrs.family === 'IPv4' && !adrs.internal) {
    //             xs.push(adrs.address);
    //         }
    //     }
    // }
    //  key = xs.join(" | ").split("").map(char => char.charCodeAt(0));
    // const options = {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         TOKEN: info.token,
    //         key: keyhel
    //     })
    //   };

    //   fetch('someapi/getFriends', options)
    //     .then(response => response.json())
    //     .then(response => {
    //         for( var x = 0; x < response.length; x++){
    //             userContainers.friends.push(response[x]);
    //         }
    //     })

    process.title = `Logged in as ${userData.username + "#" + userData.discriminator}`
}



const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');
let interval = 0;
const logs = [];

ws.on('message', function (data) {
    const { t, event, op, d } = JSON.parse(data);

    switch (op) {
        case 10:
            const { heartbeat_interval } = d;
            interval = heartbeat(heartbeat_interval)
            break;
    }
    switch (t) {
        case "READY":
            process.title = "Charm Selfbot"
            let text = "\n\ndiscord.gg/murk"
            let width = process.stdout.columns;
            let Lpadding = Math.floor((width - text.length) / 2);
            chalkAnimation.rainbow(menu.menu + "\n"+ " ".repeat(Lpadding) + text)
            notify(`Welcome ${userData.username}`, "We're ready to begin!")
            break;

        case "MESSAGE_CREATE":
            const commandsFolder = path.join(cwd(), "commands");

            fs.readdir(commandsFolder, (err, files) => {
                if (err) {
                    console.error(`Error reading commands folder: ${err}`);
                    return;
                }
                const prefix = options.prefix;
                const author = d.author;
                if (userData.id !== author.id) return;
                if (!d.content.startsWith(prefix)) return;
                const message = d.content.substring(1)
                files.forEach(async file => {
                    const command = await import(`../commands/${file}`);
                    //    console.log(command)
                    const commandName = command.default.name
                    if (message.toLowerCase().includes(commandName.toLowerCase())) {
                        logsUpdate(`|| Executed command "${commandName}" ||`)
                        command.default.execute(d);
                    }
                });


            });
            break;


    }
})

ws.on('open', () => {
    ws.send(JSON.stringify({
        op: 2,
        d: {
            token: info.token,
            intents: 131071,
            properties: {
                $os: 'linux',
                $browser: 'my_library',
                $device: 'my_library'
            }
        }
    }))
})



function heartbeat(ms) {
    return setInterval(() => {
        ws.send(JSON.stringify({ op: 1, d: null }))
    }, ms)
}

export default ws;
export { logs }
