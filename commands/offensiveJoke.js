import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';
  import { info } from '../settings/configs.js';
  

  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


  export default {
      name: 'ojoke',
      description: 'A description of the command',
      async execute(d, args) {
        const msg = d.content
        await deleteMessage(d.id, d.channel_id)

        try {
        const roastApiResponse = await fetch("https://evilinsult.com/generate_insult.php?lang=en&type=json")
        const roastJson = await roastApiResponse.json()
        await sendMessage(roastJson.insult, d.channel_id)
        } catch ( e ){
            await sendMessage("error.. try again loser", d.channel_id)
        }
        
      }
    };