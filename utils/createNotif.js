import notifier from "node-notifier";
import path from "path";

import { cwd } from "process";
import { options } from "../settings/configs.js";

export default function (Title, Message) {
    if(options.notifications == false) return;
    notifier.notify({
        title: Title,
        message: Message,
        appName: 'Charm Selfbot', 
        icon: path.join(cwd(), "imgs/discordicon.png") 
      });
}