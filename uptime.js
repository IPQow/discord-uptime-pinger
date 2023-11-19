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
const PINGTIMEDOWN = config.PINGTIMEDOWN;

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
let downcount = 0

let errormessage = "none";

client.once('ready', () => {
  console.log(`Version: 1.0.0`)
  console.log(`Logged in as ${client.user.tag}`);
  pingInterval = pingInterval;
  setInterval(pingURL, pingInterval);
  pingURL();
});

client.on('messageCreate', (message) => {
  if (message.author.id === MAINTENANCE_USER_ID) {
    const content = message.content.toLowerCase();
    if (content.startsWith('maintenance') && !maintenanceMode) {
      maintenanceMode = true;
      const maintenanceText = content.substring('maintenance'.length).trim();
      console.log("[O] Maintenance mode is enabled");
      sendStatusMessage('Maintenance mode activated. Pings temporarily stopped.');
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
        console.log(`[X] Website is down: ${URL_TO_PING} - downcount: ${downcount}/20`);
        console.log(`[X] ${error}`)
        downcheck();
      }
    })
    .catch((error) => {
      console.log(`[X] Website is down: ${URL_TO_PING} - Confirmation: ${downcount}/20`);
      console.error(`[X] ${error}`);
      sendLogMessage(`${error}`);
      errormessage = error;
      downcheck()
    });
}

function downcheck() {
  if (websiteStatus === 1) {
    websiteStatus = 2;
    downcount++
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount <= 4) {
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount === 5) {
    sendOrange(`${errormessage}`)
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount < 20) {
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount === 20) {
    websiteStatus = 0;
    sendRed(`${errormessage}`)
    downcount++;
    pingInterval = PINGTIME;
  } else if (websiteStatus === 2 && downcount > 20) {
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
    channel.send({ embeds: [embed] });
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