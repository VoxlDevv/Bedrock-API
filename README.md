# JustSkyAPI - Minecraft Bedrock Scripting API

[![Discord](https://img.shields.io/discord/898202806052347984?color=blue&label=Discord&style=for-the-badge)](https://discord.gg/g4EJ38HZ7R)
[![YouTube](https://img.shields.io/youtube/channel/subscribers/UC9gjEs8-syrZcgftpm3gsyQ?label=YouTube&style=for-the-badge)](https://youtube.com/@JustSkyDev)
[![GitHub Releases](https://img.shields.io/github/downloads/JustSkyDev/JustSky-API/total?style=for-the-badge)
](https://github.com/JustSkyDev/JustSky-API/releases/latest)

<br>

![JustSky-API](https://socialify.git.ci/JustSkyDev/JustSky-API/image?description=1&descriptionEditable=Minecraft%20Bedrock%20Custom%20Scripting%20API&font=Source%20Code%20Pro&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FJustSkyDev%2FJustSky-API%2Fmain%2Fpack_icon.png&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)

`JustSky-API` is an API based on the Scripting API in Minecraft bedrock, this API is very easy to use

`Default Command Prefix`: **!**

## 💎 Features
- **Easy-to-use**
- **Fast**
- **Built-in plugins (Custom Commands and Chat Ranks)**
- **Include Database, Collection (Map Extension)**
- **Include Command Builder, PlayerClass, EntityClass, ChatClass**
- **Include Formatter, Validation, Timer, CooldownClass**
- **ETC**

## ⚙️ Experimental toggle 
- Turn on the **Beta Api's** toggle in Experiments menu

## 🔧 Installation
- **It is recommended to put API folder to** `development_behavior_pack`, **every time you reload the world or run the /reload command, the API will automatically reload**

## 🛠️ Example usage
- **Command Builder**
- **PATH** PATH/Custom Command/yourCommand.js

```javascript
// Import these two Class
import { Command, CommandRegistration } from "../class.chain.js";

// Create the registration information 
const registration = new CommandRegistration()
  .setName("yourcommandname") // Command name
  .setDescription("Command description")
  .setAliases(["y"]) // Command aliases
  .setCategory("Custom"); // Command category

// Build the command
Command.BuildCommand(registration, (interaction) => {
  // Interaction list
  const { DB, raw, sender, args, allCommandRegistration } = interaction;
  /**
    * DB is Database
    * raw is Raw packet from ChatSendEvent
    * sender is Who send the command
    * args is Arguments, like player send command !help 2, args[0] would be "2"
    * allCommandRegistration is Get all command registration from Command Builder
    */
});
```

- **Database**
```javascript
const DB = new Database("dbName"); // Create new database with name "dbName"
db.set("key", "value"); // Set data to database
db.get("key); // Get data from database, this would return "value"
```

- **Collection**
```javascript
const collect = new Collection(); // Create new collection
collect.set("key", "value"); // Set data to collection
collect.get("key"); // Get data from collection 
```

- **Entity & Player Class**
```javascript
// Entity coming soon 

// Player 
const player = new PlayerClass(playerObject);
const score = player.getScore("money");
const isOnline = player.isOnline("playerName");
```

## 📑 Note
- **If you found bug or need more features, you can create/open Issues or Pull Request**

<br/>

## ⭐ Star 

[![Star History Chart](https://api.star-history.com/svg?repos=JustSkyDev/JustSky-API&type=Date)](https://star-history.com/#JustSkyDev/JustSky-API&Date) 