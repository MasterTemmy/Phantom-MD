const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ01VVzdwQjREOGZXajdDekxRbkgrSHBwK0dqcUVwdlBzb2svdkwwQ2Fucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWd6NFkwcEthS3dMNms1NW1oYnA4SXVpTVN4NmZxOEEyaGYwSkF2Rmp4ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRE5xN1NPbG0vWm9QZ2FKeElsT21iS2VrUnpibU11eE11L05mU0lLSjI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwWkYyV0kweG1nWVkvSGozbnk1ajEwd0daejNsTHJ4bWJSUEJwUHhaaHg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFJSUFxb0pSV2puL1FzVnJzTlJIeHJlN0s0K0lRUVJnbU0vbWJpQ3c5SEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFWZ1BEZFBHbFlONXNSUUE3ZzhGSFZObzZydUdDWVJFZHZnbWNTTzd2M1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFvMzRhYjhIWk1tRDVBWm1TcEk4bmJuVE0vd2Nqc2JyNTN5d01WbWNXST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamR3R2t3QW9KQWRObDAwVHZpTDQzaEpoaFVLc01jbG0xRUVTWS8yRVZTbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imo2U0dUd0ZnVHl5TVBKTzRJV1lxVG9mT3duODlOSnhnOEZFejFNdlZGdlI4cVd4MjBLNXM1bXBTVDhWVUFoeWxCS1drcjk1ZDBJNkZ1bjU3RWZweERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJ6akdGc0F4OFRNMkR1SXFLam5zWFhVL0YybzdsZlRxalExVlVsQ3RKWkZjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXcXdtVmhNWlNHNmtvMWFWeFZHVnZRIiwicGhvbmVJZCI6IjE0NWYzMmRjLTUzMmUtNDllMS05MGM1LTFhZDZhODMxZmUzMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqV2hFb3pPcTliZHFUVGZjZjFObmxOYjVDdVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREt2YXE2NURlQnNKTkJoQm8xODl6TzhpS1lBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Iko4VkZOU0E1IiwibWUiOnsiaWQiOiIyMzQ4MTE5MDgxMDQxOjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BQaGdZb0NFT204M2JvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhEbmx3Y3pGUTNGNWIvWnF6dnZ1dnh0NStaQWNvR2RsWk93YS9PRXY3Q1E9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjF4em81OU5maHdIOU1XTkRRQVhhR2VXbkt4bFlZZFFYRkRqVnlvaWtLQkswMVc5TjVIdmpxTG1aaFlid1h3S01nOVk1TGpvbC9rMXNhZnVmODltcER3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkelZyNEl4MmV5dFIrSEtmdHZFNFB1SlZsQ0JBOW5OanpHVXhoZ1J5UTBFaVo1NXdXcUhyWUFzT09IZVBsY3BoLzRZSmh3SnZ5YjR2M01Dd0xQZUhDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMTkwODEwNDE6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjUTU1Y0hNeFVOeGVXLzJhczc3N3I4YmVmbVFIS0JuWldUc0d2emhMK3drIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNzc5MDYyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURRMyJ9=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Phantom",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348119081041",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Phantom-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uuye39.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
