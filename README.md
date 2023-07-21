<!-- LOGO -->
<div align="center">

  ![Bedrock-API](https://socialify.git.ci/JustSkyDev/Bedrock-API/image?description=1&descriptionEditable=Minecraft%20Bedrock%20Custom%20Scripting%20API&font=Source%20Code%20Pro&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FJustSkyDev%2FBedrock-API%2Fmain%2Fpack_icon.png&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

  <p align="center">
    Bedrock API is a library built using Minecraft Bedrock Scripting API. This library will help you keep your code clean and make it easier to interact with the Scripting API, while including a lot of new classes/functions/methods for you to use! and some built-in custom command
    <br />
    <br />
    <a href="https://github.com/JustSkyDev/Bedrock-API">Repository</a>
    ·
    <a href="https://github.com/JustSkyDev/Bedrock-API/issues">Bug Report</a>
    ·
    <a href="https://github.com/JustSkyDev/Bedrock-API/issues">Feature Request</a>
  </p>

  ---
  
  [![MIT License](https://img.shields.io/github/license/JustSkyDev/Bedrock-API?style=for-the-badge&color=yellow)](https://github.com/JustSkyDev/Bedrock-API/blob/main/LICENSE)
  [![Discord Server](https://img.shields.io/discord/1125432627382460498?color=blue&label=Discord&style=for-the-badge)](https://discord.gg/ffZHPHRBhY)
  [![GitHub Releases](https://img.shields.io/github/downloads/JustSkyDev/Bedrock-API/total?style=for-the-badge&color=orange)
  ](https://github.com/JustSkyDev/Bedrock-API/releases/latest)
  
  ---

</div>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#plugin-example">Plugin example</a></li>
    <li><a href="#Documentations">Documentations</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#supports">Supports</a></li>
  </ol>
</details>

<br />

## Installation

**Easy Method**

- Download this zip folder and name it to `.mcpack` and import it by double clicking on the folder. This method will only work if you have Minecraft Bedrock Edition on the same device you are doing this action on.

**Recommended Method**

- Another Method would be to take the zipped folder and unzip/extract it. Take your folder and move it to the folder 'development_behavior_packs', which can be found in a path like `PATH/TO/development_behavior_packs`. This will make your life way easier, while developing this pack. It will update the content inside your game everytime you make any changes to the script. For the changes to apply you must leave and rejoin your world where the pack is applied at or using command `/reload`.

<br />

## Usage

[![Experimental Toggle](https://i.postimg.cc/7P5zh2FT/IMG-20230612-184034.jpg)](https://postimg.cc/9zj0NrFW)

<strong>IMPORTANT: </strong>`If you are going to apply any Scripting related scripts to your world, please make a copy of your world before you do so! I'm not responsible if anything goes wrong-`

Create a new world, since Scripting API is still experimental. Make sure in your settings you have `Beta API's` in `Experiments` menu.
I have some examples on how you can use this library. Specifically on custom commands. Type in the game chat `!help` or `!help [page number]` for the list of custom commands or `!help [command name]` to get information on a specific command!

<br />

## Plugin example 
**Custom Command**
 - TypeScript
```javascript
//PATH/plugin/Custom Commands/myCommand.ts

import { Command, CommandRegistration } from "../@modules"

const registration: CommandRegistration = new CommandRegistration()
  .setName("ping")
  .setDescription("Ping command");

Command.BuildCommand(registration, (interaction) => {
  interaction.sender.sendMessage("Pong!");
});

```
 - JavaScript
```javascript
//PATH/plugin/Custom Commands/myCommand.js

import { Command, CommandRegistration } from "../@modules"

const registration = new CommandRegistration()
  .setName("ping")
  .setDescription("Ping command");

Command.BuildCommand(registration, (interaction) => {
  interaction.sender.sendMessage("Pong!");
});

```

<br />

## Documentations
- [Bedrock-API Docs](https://justskydev.github.io/docs/list/Bedrock-API-Docs)

<br />

## License

Distributed under the MIT License. See `LICENSE` for more information.

<br />

## Contact

[![Discord Profile](https://img.shields.io/badge/Discord-blue?style=for-the-badge&logoColor=white&logo=Discord)](https://discordapp.com/users/625970059503992843)

<br />

## Supports

[![Trakteer](https://tinyurl.com/JustSkyDev-Trakteer-Icon)](https://trakteer.id/justskydev)

<br/>

## Star

[![Star History Chart](https://api.star-history.com/svg?repos=JustSkyDev/Bedrock-API&type=Date)](https://star-history.com/#JustSkyDev/Bedrock-API&Date)
