import { info } from "../settings/configs.js";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function addRecipientToChannel(channelID, userID) {
    const url = `https://discord.com/api/v9/channels/${channelID}/recipients/${userID}`;
    try {
        fetch(url, {
            method: 'PUT',
            headers: { authorization: info.token }
        })
    } catch (e) {
        return;
    }
}
function removeRecipientFromChannel(channelID, userID) {
    const url = `https://discord.com/api/v9/channels/${channelID}/recipients/${userID}`;
    try {
        fetch(url, {
            method: 'DELETE',
            headers: { authorization: info.token }
        })
    } catch (e) {
        return;
    }
}

export { removeRecipientFromChannel, addRecipientToChannel }