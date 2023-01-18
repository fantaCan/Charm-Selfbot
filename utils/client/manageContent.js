const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import { info } from "../../settings/configs.js";

async function sendContent(message, channelID){
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: info.token
        },
        body: JSON.stringify({
            content: message
        })
    }
    const res = await fetch(`https://discord.com/api/v9/channels/${channelID}/messages`, options);
    const data = await res.json();
    return data;
}

async function deleteContent(messageID, channelID){
    const options = {
        method: "DELETE",
        headers: {
            authorization: info.token
        }
    }
    const res = await fetch(`https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`, options);
    return await res;
}

async function editContent(message, messageID, channelID){
    const options = {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            authorization: info.token
        },
        body: JSON.stringify({
            content: message
        })
    }
   await fetch(`https://discord.com/api/v9/channels/${channelID}/messages/${messageID}`, options);
}


export { sendContent, deleteContent, editContent };
