import { logs } from "../src/index.js"
import chalkAnimation from "chalk-animation";
export default function (text){
    console.clear();
    let w = process.stdout.columns;
    let Lpadding = Math.floor((w - text.length) / 2)
    logs.push(" ".repeat(Lpadding) + text)
    let executedCommandsLogs = "";
    for(let i = 0; i < logs.length; i++) {
        executedCommandsLogs += logs[i] + '\n';
    }
    chalkAnimation.rainbow(executedCommandsLogs)
}