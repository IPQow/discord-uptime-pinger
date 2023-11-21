module.exports = {
  TOKEN: 'BOT_TOKEN',
  URL_TO_PING: 'URL_TO_PING',
  STATUS_CHANNEL_ID: 'MAIN_STATUS_CHANNEL_ID', // channel to send the status messages to (public)
  LOG_CHANNEL_ID: 'LOG_CHANNEL_ID', // channel to send log messages to (private)
  MAINTENANCE_USER_ID: 'USER_ID', // user that can activate / deactivate maintenance mode
  SERVICENAME: 'Example',
  STATUSPAGE: 'https://status.example.com/',
  PINGTIME: '300000', // time in ms. default: 300000 - 5 minutes
  ORANGETRIES: 3, // how many times in a row until orange is sent
  DOWNTRIES: 10, // how many times in a row until service is confirmed down and red is sent
  GREEN: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/online.png?raw=true',
  RED: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/offline.png?raw=true',
  BLUE: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/maintenance.png?raw=true',
  ORANGE: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/maybe. png?raw=true',
  };