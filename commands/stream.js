import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';
  import { info } from '../settings/configs.js';
  
  import WebSocket from 'ws';

  export default {
      name: 'stream',
      description: 'A description of the command',
      async execute(d, args) {
        const msg = d.content
        await deleteMessage(d.id, d.channel_id)
        const payloadItems = msg.split(" ")
        const status = payloadItems.slice(1).join(" ")
        const ws = new WebSocket(`wss://gateway.discord.gg/?v=10&encoding=json`);
        ws.on('open', () => {
  
          const pres = {
            activities: [{
              name: status,
              type: 1,
              url: `https://twitch.tv/${status}`
            }]
        }
          ws.send(JSON.stringify({
            op: 2,
            d: {
                token: info.token,
                properties: {
                    $os: 'linux',
                    $browser: 'my_library',
                    $device: 'my_library'
                },
                presence: pres
                
            }
        }));
  
        });
  
      }
  
    };