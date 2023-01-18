import fetch from 'node-fetch';

import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';
import userContainers from '../data/containers/userstorage.js';
import ws from '../src/index.js';
import { info } from '../settings/configs.js';
import notify from "../utils/createNotif.js"
import { removeRecipientFromChannel } from '../utils/addRemoveRecipient.js';

const autoK_Id = userContainers.autoKick;
let connectedToGateway = false;
  export default {
      name: 'autokick',
      description: 'A description of the command',
  async execute(d, args) {
    const message = d.content;
    const user = message.split(" ").slice(1)
    const id = user[0].substring(2).slice(0, -1);
    if(!user[0].includes("<@")) return;
    validateUserId(id);
    removeIdFromArray(id, autoK_Id);
   if ( !connectedToGateway ){
    connectedToGateway = true;
    await removeRecipientFromChannel(d.channel_id, id);
    ws.on('message', async function (data) {
        const { t, d } = JSON.parse(data);
        if(t == "CHANNEL_RECIPIENT_ADD"){
           for ( const x of autoK_Id ){
               if( x == d.user.id){
                await removeRecipientFromChannel(d.channel_id, x);
               }
           }
        }
       })
   }

}

    };

    async function validateUserId (id){
        const url = `https://discord.com/api/v10/users/${id}`
        const options = {
            headers: {
                authorization: info.token
            }
        }
        const response = await fetch (url, options);
        const data = await response.json();
        if(!data.id){ 
            notify("Failed to kick!", "Looks like an invalid user_ID!");
            return;
        }
    }


    function removeIdFromArray(id, arr) {
        var index = arr.indexOf(id);
        if (index > -1) {
          arr.splice(index, 1);
          notify("No longer kicking", "...");
        }else autoK_Id.push(id);
      }