const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


export default async function (token){
    const url = "https://discord.com/api/v10/users/@me"
    const res = await fetch(url, { headers: {authorization: token} } );
    const data = await res.json();
    return data;
}