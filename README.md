![Website Monitoring Bot](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/githubbanner.png?raw=true)

# Pinger, a website pinger discord bot

## Overview

The Website Monitoring Bot is a simple yet powerful tool designed to keep track of the availability of a specified website. It periodically sends requests to the target URL and reacts accordingly by sending colour-coded messages to indicate the status: green for up, orange for potential issues, red for confirmed downtime, and blue for maintenance mode.

## Built with

- The bot is built with Discord.js v14 using JavaScript
- Uses Axios to ping the site

## Features

- **Request Monitoring**: Regularly checks the specified website's availability.
- **Color-Coded Messages**: Responds with different color-coded messages based on the website's status.
- **Automatic Reaction**: Takes action based on the website's status after a series of consecutive requests.
- **Maintenance Mode**: Allows you to manually set the bot to maintenance mode, temporarily stopping the requests.
- **Config file**: Easy to edit config file

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/IPQow/discord-uptime-pinger
    cd website-monitoring-bot
    ```

2. **Install dependencies:**

    Since this bot is written in JavaScript, ensure you have Node.js installed. You can install the required dependencies using:

    ```bash
    npm install
    ```

3. **Configure the bot:**

    Open the `config.js` file and update the following parameters:

## How to Edit the Config File

To customize the bot's configuration, follow these steps:

1. Open the `config.js` file in a text editor.

2. Modify the following parameters:

    -  `TOKEN: 'BOT_TOKEN',` // Your Discord bot token
    -  `URL_TO_PING: 'URL_TO_PING',` // The URL of the website you want to monitor
    -  `STATUS_CHANNEL_ID: 'MAIN_STATUS_CHANNEL_ID',` // Discord channel ID to send the status messages to (public)
    -  `LOG_CHANNEL_ID: 'LOG_CHANNEL_ID',` // Discord channel ID to send log messages to (private)
    -  `MAINTENANCE_USER_ID: 'USER_ID',` // Discord user ID that can activate/deactivate maintenance mode
    -  `SERVICENAME: 'Example',` // Name of the service being monitored
    -  `STATUSPAGE: 'https://status.example.com/',` // URL to the service's status page
    -  `PINGTIME: '300000',` // Time in milliseconds between each ping (default: 300000 - 5 minutes)
    -  `ORANGETRIES: 3,` // Number of consecutive pings triggering an orange status message
    -  `DOWNTRIES: 10,` // Number of consecutive pings confirming service downtime and triggering a red status message
    -  `GREEN: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/online.png?raw=true',` // URL to the green status image
    -  `RED: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/offline.png?raw=true',` // URL to the red status image
    -  `BLUE: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/maintenance.png?raw=true',` // URL to the blue status image
    -  `ORANGE: 'https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/maybe.png?raw=true',` // URL to the orange status image


3. Save the changes.

## Screenshots

![Embed guide](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/embed%20customisation%20guide.png?raw=true)
Embed guide

![Online embed - Green](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/green.png?raw=true)
Online embed - Green

![Potential issues embed - Orange](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/orange.png?raw=true)
Potential issues embed - Orange

![Offline embed - Red](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/red.png?raw=true)
Offline embed - Red

![Maintenance mode enable - Blue](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/blue.png?raw=true)
Maintenance mode enable - Blue

![Maintenance mode disable - Blue](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/blueend.png?raw=true)
Maintenance mode disable - Blue

![Maintenance mode message showcase - Blue](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/blueexplained.png?raw=true)
Maintenance mode message showcase - Blue

![Logs when service initially stops responding](https://github.com/IPQow/discord-uptime-pinger/blob/main/assets/screenshots/statuslogsexample.png?raw=true)
Logs when service initially stops responding

## Usage

1. **Start the bot:**

    ```bash
    node uptime.js
    ```

2. **Interact with the bot:**

    - Type "maintenance" followed my a reason to activate maintenance mode. (e.g. "maintenance upgrading versions")
    - The bot will automatically respond with appropriate messages based on the website's status.

## Example Messages

- Green Message: "The website is up and running smoothly."
- Orange Message: "The website may be experiencing issues. Checking again..."
- Red Message: "The website is down. Confirming the issue..."
- Blue Message: "Maintenance mode activated. The service is currently undergoing maintenance."

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance the bot's functionality or fix any issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
