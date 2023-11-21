const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const config = require('./config.js');

const TOKEN = config.TOKEN;
const URL_TO_PING = config.URL_TO_PING;
const STATUS_CHANNEL_ID = config.STATUS_CHANNEL_ID;
const LOG_CHANNEL_ID = config.LOG_CHANNEL_ID;

const MAINTENANCE_USER_ID = config.MAINTENANCE_USER_ID;
//const SERVICENAME = config.SERVICENAME;
const STATUSPAGE = config.STATUSPAGE;

const PINGTIME = config.PINGTIME;

const ORANGETRIES = config.ORANGETRIES;
const DOWNTRIES = config.DOWNTRIES;

const RED = config.RED;
const GREEN = config.GREEN;
const BLUE = config.BLUE;
const ORANGE = config.ORANGE;

const client = new Client({ 
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

let websiteStatus = 2;
let pingInterval = PINGTIME;
let maintenanceMode = false;
let downcount = 0;
let OneBeforeOrange = 2;

let errormessage = "none";

client.once('ready', () => {
  pingInterval = pingInterval;
  OneBeforeOrange = ORANGETRIES - 1;
  setInterval(pingURL, pingInterval);
  console.log(`###################################`);
  console.log(`██████  ██ ███    ██  ██████  ███████ ██████  
██   ██ ██ ████   ██ ██       ██      ██   ██ 
██████  ██ ██ ██  ██ ██   ███ █████   ██████  
██      ██ ██  ██ ██ ██    ██ ██      ██   ██ 
██      ██ ██   ████  ██████  ███████ ██   ██ `);
  console.log(`Version: 1.0.1`)
  console.log(`##########################`);
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`Ping Interval: ${pingInterval}`);
  console.log(`Tries until down: ${DOWNTRIES}`);
  console.log(`##########################`);
  pingURL();
});

client.on('messageCreate', (message) => {
  if (message.author.id === MAINTENANCE_USER_ID) {
    const content = message.content.toLowerCase();
    if (content.startsWith('maintenance') && !maintenanceMode) {
      maintenanceMode = true;
      const maintenanceText = content.substring('maintenance'.length).trim();
      console.log("[O] Maintenance mode is enabled");
      /*sendStatusMessage('Maintenance mode activated. Pings temporarily stopped.');*/
      sendBlue(maintenanceText);
      clearInterval(pingIntervalId);
    } else if (content === 'resume' && maintenanceMode) {
      maintenanceMode = false;
      console.log("[O] Maintenance mode is disabled");
      sendStatusMessage('Maintenance mode deactivated. Pings resumed.');
      pingIntervalId = setInterval(pingURL, pingInterval);
      pingURL();
    } else if (content === 'up') {
      console.log("Manually set up");
      sendGreen('manualsend');
    } else if (content === 'down') {
      console.log("Manually set down");
      sendRed('manualsend');
    }
  }
});

let pingIntervalId;

function pingURL() {
  if (maintenanceMode) {
    return;
  }

  axios.get(URL_TO_PING)
    .then((response) => {
      if (response.status === 200) {
          console.log(`[|] Website is up: ${URL_TO_PING}`);
          downcount = 0;
        if (websiteStatus === 0 || websiteStatus === 2) {
          websiteStatus = 1;
          sendGreen('Website is up');
          pingInterval = PINGTIME;
        }
        else if (websiteStatus === 1) {
            pingInterval = PINGTIME;
        }
      } else {
        console.log(`[X] Website is down: ${URL_TO_PING} - downcount: ${downcount}/${DOWNTRIES}`);
        console.log(`[X] ${error}`)
        sendLogMessage(`${error} - Confirmation: ${downcount}/${DOWNTRIES}`);
        downcheck();
      }
    })
    .catch((error) => {
      console.log(`[X] Website is down: ${URL_TO_PING} - Confirmation: ${downcount}/${DOWNTRIES}`);
      console.error(`[X] ${error}`);
      sendLogMessage(`${error} - Confirmation: ${downcount}/${DOWNTRIES}`);
      errormessage = error;
      downcheck()
    });
}

function downcheck() {
  if (websiteStatus === 1) {
    websiteStatus = 2;
    downcount++
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount <= OneBeforeOrange) {
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount === ORANGETRIES) {
    console.log('[X] Sent Orange')
    sendLogMessage('Sent Orange')
    sendOrange(`${errormessage}`)
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount < DOWNTRIES) {
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount === DOWNTRIES) {
    websiteStatus = 0;
    sendRed(`${errormessage}`)
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount > DOWNTRIES) {
    downcount++
    pingInterval = PINGTIME;
  }
}

function sendStatusMessage(messageText) {
  const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle(messageText)
      .setColor('#2b2d31')
      .setTimestamp();
      channel.send({ embeds: [embed], flags: [ 4096 ] });
  }
}

function sendLogMessage(messageText) {
  const channel = client.channels.cache.get(LOG_CHANNEL_ID);
  if (channel) {
    const embed = new EmbedBuilder()
      .setTitle(messageText)
      .setColor('#2b2d31')
      .setTimestamp();
    channel.send({ embeds: [embed], flags: [ 4096 ] });
  }
}

function sendGreen(messageText) {
    const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
    if (channel) {
      const embed = new EmbedBuilder()
        .setAuthor({
        name: `${STATUSPAGE}`,
        url: `${STATUSPAGE}`,
        })
        .setImage(`${GREEN}`)
        .setColor("#78b159")
        .setFooter({text: `${messageText}`,})
        .setTimestamp();
      channel.send({ embeds: [embed], flags: [ 4096 ] });
    }
}

function sendRed(messageText) {
    const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
    if (channel) {
      const embed = new EmbedBuilder()
        .setAuthor({
        name: `${STATUSPAGE}`,
        url: `${STATUSPAGE}`,
        })
        .setImage(`${RED}`)
        .setColor("#dd2e44")
        .setFooter({text: `${messageText}`,})
        .setTimestamp();
      channel.send({ embeds: [embed], flags: [ 4096 ] });
    }
}

function sendBlue(messageText) {
    const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
    if (channel) {
      const embed = new EmbedBuilder()
        .setAuthor({
        name: `${STATUSPAGE}`,
        url: `${STATUSPAGE}`,
        })
        .setImage(`${BLUE}`)
        .setColor("#55acee")
        .setFooter({text: `${messageText}`,})
        .setTimestamp();
      channel.send({ embeds: [embed], flags: [ 4096 ] });
    }
}

function sendOrange(messageText) {
  const channel = client.channels.cache.get(STATUS_CHANNEL_ID);
  if (channel) {
    const embed = new EmbedBuilder()
      .setAuthor({
      name: `${STATUSPAGE}`,
      url: `${STATUSPAGE}`,
      })
      .setImage(`${ORANGE}`)
      .setColor("#f4900c")
      .setFooter({text: `${messageText}`,})
      .setTimestamp();
    channel.send({ embeds: [embed], flags: [ 4096 ] });
  }
}

client.login(TOKEN);
