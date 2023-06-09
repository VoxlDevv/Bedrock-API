# JustSkyAPI - Minecraft Bedrock Scripting API

[![Discord](https://img.shields.io/discord/898202806052347984?color=blue&label=Discord&style=for-the-badge)](https://discord.gg/g4EJ38HZ7R)
[![YouTube](https://img.shields.io/youtube/channel/subscribers/UC9gjEs8-syrZcgftpm3gsyQ?label=YouTube&style=for-the-badge)](https://youtube.com/@JustSkyDev)
[![GitHub Releases (by Asset)](https://img.shields.io/github/downloads/JustSkyDev/JustSky-API/latest/total?style=for-the-badge)
](https://github.com/JustSkyDev/JustSky-API/releases/latest)

<br>

![JustSky-API](https://socialify.git.ci/JustSkyDev/JustSky-API/image?description=1&descriptionEditable=Minecraft%20Bedrock%20Custom%20Scripting%20API&font=Source%20Code%20Pro&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FJustSkyDev%2FJustSky-API%2Fmain%2Fpack_icon.png&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)

`JustSky-API` is an API based on the Scripting API in Minecraft bedrock, this API is very easy to use

`Support Version: Minecraft Bedrock 1.20 official`


<br/>

## 🧾 Experimental toggle 
- Turn on the "Beta Api's" toggle in Experiments menu

#### ⚙️ Creating custom command example 

```javascript
import * as API from "../class.chain.js";

const registration = new API.CommandRegistration()
  .setName("example") // Set command name (required)
  .setDescription("Example description") // Set command description (optional)
  .setCategory("Example") // Set command category (optional)
  .setAliases(["ex"]) // Set command aliases (optional)
  .setPrivate(true) // Set command to Operator only (optional)
  .setRequireTags(["example"]) // If player had "example" tag, player can run the command (optional)
  .setExample(["example"]) // Set command example use (optional)
  .setUsage(["example"]); // Set command usage (optional)
  
API.Command.BuildCommand(registration, (context) => {
  // Code here
});
```

#### 📁 Database usage example 

```javascript
import * as API from "../class.chain.js";

const DB = new API.Database("DBNAME"); // Create database
DB.set("foo", "bar"); // Set data to database "foo" is key, and "bar" is value
DB.get("foo"); // Get data from database, "foo" is key, return "bar"
```

<br/>

## ⭐Star History

[![Star History Chart](https://api.star-history.com/svg?repos=JustSkyDev/JustSky-API&type=Date)](https://star-history.com/#JustSkyDev/JustSky-API&Date) 