import { sendContent as sendMessage, 
  deleteContent as deleteMessage, 
  editContent as editMessage} 
from '../utils/client/manageContent.js';

export default {
    name: 'ping',
    description: 'A description of the command',
    async execute(d, args) {
      await deleteMessage(d.id, d.channel_id)
      const newMsg = await sendMessage("pong", d.channel_id)
      await editMessage("pong x2", newMsg.id, d.channel_id)
    }
  };