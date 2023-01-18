import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';
import getUserId from "../utils/roblox/getUserid.js"

import cheerio from "cheerio";
import axios from "axios";
import puppeteer from 'puppeteer';

  export default {
      name: 'user',
      description: 'A description of the command',
  async execute(d, args) {
    const message = d.content.split(" ");
    const username = message.splice(1);
    const user_id = await getUserId(username)
    const imgUrl = await getRobloxAvatar(user_id)
    await sendMessage(imgUrl, d.channel_id)
      }
    };

  async function getRobloxAvatar(userId){

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.roblox.com/users/${userId}/profile`, { waitUntil: 'networkidle2' });
    
    const imgSrcs = await page.$$eval('img', imgs => imgs.map(img => img.src))
    await browser.close();
    for ( var x = 0; x < imgSrcs.length; x++ ){
      if(imgSrcs[x].includes("Avatar/Png")){
        return imgSrcs[x];
      }
    }
    
    }