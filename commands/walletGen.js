import { sendContent as sendMessage, 
    deleteContent as deleteMessage, 
    editContent as editMessage} 
  from '../utils/client/manageContent.js';

import crypto from "crypto";

  export default {
      name: 'genWallet',
      description: 'A description of the command',
  async execute(d, args) {
    const address = genBtcWallet().address
    const privkey = genBtcWallet().privateKey
    const pkey = genBtcWallet().publicKey
    const editedMessage = "```JSON\n" + `
    address: "${address}"\n
    private Key: "${privkey}"\n
    public Key: "${pkey}"` 
    +"\n```"
    await editMessage(editedMessage, d.id, d.channel_id);
      }
    };

    function genBtcWallet() {
    const ecdh = crypto.createECDH('secp256k1');
    ecdh.generateKeys();
    const privateKey = ecdh.getPrivateKey();
    const publicKey = ecdh.getPublicKey();
    const hash = crypto.createHash('sha256');
    hash.update(publicKey);
    const digest = hash.digest();
    const walletAddress = digest.slice(-20).toString('hex');
    return { privateKey: privateKey.toString('hex'), publicKey: publicKey.toString('hex'), address: walletAddress };
    }