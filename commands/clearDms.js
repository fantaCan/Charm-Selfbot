import fetch from "node-fetch";
import { deleteContent as deleteMessage } from "../utils/client/manageContent.js";
import { info } from "../settings/configs.js";

const options = {
    headers: {
        authorization: info.token
    }
}

let messages = [];
  export default {
    name: 'clearDms',
    description: 'A description of the command',
    async execute(d, args) {

        let beforeMessageId = d.id;
        
    async function getMessages(){
            let hasMore = true;
            while (hasMore) {
                const response = await fetch(`https://discordapp.com/api/channels/${d.channel_id}/messages?before=${beforeMessageId}&limit=100`, {
                    headers: {
                        authorization: info.token
                    }
                });
        
                if (!response.ok) {
                    console.error(await response.text());
                    break;
                }
                const data = await response.json();
        
                if (data.length === 0) {
                    hasMore = false;
                    break;
                }
                messages = messages.concat(data);
                beforeMessageId = data[data.length - 1].id;
            }
            deleteAllMessageIds()
        };
        
        getMessages();
        

        
  async function deleteAllMessageIds (){
    const myMessageIds = [];

    for(var x = 0; x < messages.length; x++){
       if(messages[x].author.id == d.author.id) myMessageIds.push( messages[x].id );
       
       if(x == messages.length - 1){
        for ( var i = 0; i < myMessageIds.length;){
           await deleteMessage(myMessageIds[i], d.channel_id).then(async function (data){
           try {
            let resData = await data.json();
            if(resData.retry_after){
                await sleep(resData.retry_after * 9000);
                await deleteMessage(myMessageIds[i], d.channel_id);
            }
           }catch(e){
            return;
           }
           });
           i++;
        }
       }

    }
  }
    }

    
  };

  async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}