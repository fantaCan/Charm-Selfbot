import WebSocket from "ws";
import { info } from "../settings/configs.js";


export default function (guildID){
const userIdArr = []
const client = new WebSocket('wss://gateway.discord.gg');

client.on('open', () => {

  client.send(JSON.stringify({
    op: 2,
    d: {
      token: info.token,
      properties: {
        $os: 'linux',
        $browser: 'my_library',
        $device: 'my_library'
      }
    }
  }));
});

client.on('message', message => {
  const data = JSON.parse(message);

  if (data.op === 0 && data.t === 'READY') {
    client.send(JSON.stringify({
      op: 8,
      d: {
        guild_id: guildID,
        query: '',
        limit: 0
      }
    }));
  }

  if (data.op === 0 && data.t === 'GUILD_MEMBERS_CHUNK') {
    const members = data.d.members;
    members.forEach(member => {
      userIdArr.push(member)
    });
  } else console.log(`|| Missing permissions! || "View Guild" & "View Channel"`)
});
}
