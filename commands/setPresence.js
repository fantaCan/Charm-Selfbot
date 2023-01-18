import { sendContent as sendMessage, 
  deleteContent as deleteMessage, 
  editContent as editMessage} 
from '../utils/client/manageContent.js';
import { info } from '../settings/configs.js';

import WebSocket from 'ws';

export default {
    name: 'setPresence',
    description: 'A description of the command',
    async execute(d, args) {
      const msg = d.content
      await deleteMessage(d.id, d.channel_id)
      const payloadItems = msg.split(" ")
      if(payloadItems[2] == 1 || payloadItems[2] == 4) return;
      console.log(payloadItems)
      const ws = new WebSocket(`wss://gateway.discord.gg/?v=10&encoding=json`);
      ws.on('open', () => {

        const pres = {
          activities: [{
            name: payloadItems[1],
            type: parseInt(payloadItems[2])
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


// 0	Game	
// 2	Listening	
// 3	Watching
// 5	Competing	