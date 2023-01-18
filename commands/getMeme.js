import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';
  import { info } from '../settings/configs.js';
  
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


  export default {
      name: 'getMemes',
      description: 'A description of the command',
      async execute(d, args) {
        const msg = d.content
        const randomNum = Math.floor(Math.random() * 5);
        await deleteMessage(d.id, d.channel_id)
        const payloadItems = msg.split(" ")
        const term = payloadItems.slice(1).join(" ")
        if(term.length < 1) return;
            async function scrape(term, pageNum = 1) {
               try {
                const url = `https://api.memes.com/search/memes?term=${term}?page=${randomNum}`
                const response = await fetch(url)
                const data = await response.json()
            
                //loop thru the posts array (response)
                for(var x = 0; x < data.posts.length; x++) {  
                    const meme = `https://cdn.memes.com/`+data.posts[x].path
                    sendMessage(meme, d.channel_id)
                }
               }catch (e) {
                return;
               }
            }
            
            scrape(term)
      }
    };