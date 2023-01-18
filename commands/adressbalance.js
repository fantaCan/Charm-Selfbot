import {
    sendContent as sendMessage,
    deleteContent as deleteMessage,
    editContent as editMessage
}
    from '../utils/client/manageContent.js';
import logsUpdate from '../utils/logs.update.js';
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import validator from "crypto-address-validator";

export default {
    name: 'btcBal',
    description: 'A description of the command',
    async execute(d) {
        const message = d.content;
        const address = message.split(" ").slice(1)[0]
        if(address.length == 0)return;
        const btcData = await checkBitcoinAddress(address);
       try {
        const editedMessage = "```JSON\n" + `Balance: ${btcData.balance}\nCurrency: ${btcData.currency}` + "\n```"
        await editMessage(editedMessage, d.id, d.channel_id);
       }catch (e) {
        logsUpdate(`|| Possible Error: Invalid BTC Address ||`);
       }
    }
};

async function checkBitcoinAddress(address) {
    try {
        const response = await fetch(`https://blockchain.info/balance?active=${address}`);
        const data = await response.json();
        const { final_balance } = data[address];
        const balance = final_balance / 100000000;
        return { balance: balance, currency: 'BTC' };
    } catch (err) {
        return;
    }
}