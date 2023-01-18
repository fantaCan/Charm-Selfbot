const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
export default async function (username){

        try {
            const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
            const data = await response.json();
            const { Id } = data;
            return Id;
        } catch (err) {
            console.error(err);
        }
    
}