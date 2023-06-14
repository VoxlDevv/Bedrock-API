<!-- DOCUMENTATION MARKDOWN OF BEDROCK-API (https://JustSkyDev/Bedrock-API -->

<!-- LOGO -->
<div align="center">

  ![Bedrock-API](https://socialify.git.ci/JustSkyDev/Bedrock-API/image?description=1&descriptionEditable=Minecraft%20Bedrock%20Custom%20Scripting%20API&font=Source%20Code%20Pro&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FJustSkyDev%2FBedrock-API%2Fmain%2Fpack_icon.png&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

  <h3 align="center"><u>Bedrock API Documentation</u></h3>

  <p align="center">
    Bedrock API is a library built using Minecraft Bedrock Scripting API. This library will help you keep your code clean and make it easier to interact with the Scripting API, while including a lot of new classes/functions/methods for you to use! and some built-in custom command
    <br />
    <br />
    <a href="https://github.com/JustSkyDev/Bedrock-API">View</a>
    ·
    <a href="https://github.com/JustSkyDev/Bedrock-API/issues">Bug Report</a>
    ·
    <a href="https://github.com/JustSkyDev/Bedrock-API/issues">Feature Request</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  
  - [Information](#information)
  - [Classes](#classes)
    - [Command Class](#command-class)
      - [Command Types](#command-class)
      - [Custom Commands](#command-class)
    - [Player & Entity Class](#player-&-entity-class)
      - [Constructor](#player-&-entity-class)
      - [Player & Entity Types](#player-&-entity-class)
    - [Database & Collection Class](#database-&-collection-class)
      - [Database](#database-&-collection-class)
      - [Collection](#database-&-collection-class)
    - [Events Class](#events-class)
      - [After events](#events-class)
      - [Before events](#events-class)
      - [System events](#events-class)
    - [Cooldown Class](#cooldown-class)
    - [Form Class](#form-class)
      - [Constructor](#form-class)
      - [Form Types](#form-class)
    - [Message Class](#message-class)
      - [Error Class](#message-class)
      - [Chat Class](#message-class)
      - [Failed Class](#message-class)
  - [Functions](#functions)
    - [Formatter](#formatter-function)
    - [Validation](#validation-function)
    - [Timer](#timer-function)
    - [MS](#ms-function)
    - [World](#world-function)
    
</details>

## Information
- Default command prefix is `!`

<br />

## Classes
### Command Class
- Command types 
  ```
  [STRING] = something like "hellow World"
  [BOOLEAN] = only true or false, like on and off
  [ARRAY:STRING] = something like ["hello", "world"]
  [OBJECT:ARRAY:STRING] = something like { 0: ["hello"], 1: ["world"] }
  ```
  ```javascript
  new CommandRegistration()
    .setName("name") // [STRING] Command name (required)
    .setDescription("Command description") // [STRING] Command description (optional)
    .setPrivate(true) // [BOOLEAN] If true, only players with Op permission can access this command, and vice versa (optional) && DEFAULT = false
    .setAliases(["t"]) // [ARRAY:STRING] Command aliases. For example, if you register a command with the name "test" and an alias "t", you can run the command "test" by using the alias, such as "!test" or "!t" (optional)
    .setCategory("category") // [STRING] Command category. This will appear when you use the !help command (optional) && DEFAULT = Global 
    .setRequireTags(["some", "tags"]) // [ARRAY:STRING] If a player does not have any of these tags, they won't be able to access the command, and vice versa (optional)
    .setExample(["!test", "!t"]) // [ARRAY:STRING] Examples of how to use the command (optional)
    .setUsage(["<undefined>"]) // [ARRAY:STRING] Similar to .setExample(), but provides input rather than usage examples (optional)
    .setInputs({
        // Available input types: ["string", "number", "boolean", "playername"]
        0: ["string"]
    }); // [OBJECT:ARRAY:STRING] Defines the expected input types for the command. For example, for the command "!test inputType", if the input is not a string, it will return undefined. To specify a player's name, prefix it with an "@" sign, like "@playerName" (optional)
  ```
- Custom Commands
  ```javascript
  // Example Path: plugins/Custom Commands/yourCommand.js 
  
  import { Command, CommandRegistration } from "../class.chain.js";
  
  const registration = new CommandRegistration()
    .setName("example")
    .setDescription("This is command description")
    .setInputs({
      0: ["number"],
      1: ["playername"],
    });
  
  Command.BuildCommand(registration, (interaction) => {
    // Callback list 
    const {
      Config, // Get config.js file
      raw, // Get raw packet from chatSend events
      sender, // Get who send the command
      inputs, // Get .setInputs() value
      DB, // Get GlobalDB 
    } = interaction;
    
    // How to get inputs ?
    const getFirstInput = inputs.getInput(0); // This will take input number "0" from .setInputs(), this is will return undefined if input 0 is not a number
    const getSecondInput = inputs.getInput(1); // This will take input number "1" from .setInputs(), this is will return undefined if input 1 is not playerName, playerName should have "@" in front of string, like @playerName
    
    // How to get sender name ?, It's ez
    const getSenderName = sender.nameTag; // Wala 
    
    // Don't trust me ?, yeah whatever lol
    console.warn(getFirstInput);
    console.warn(getSecondInput);
    console.warn(getSenderName);
  });
  ```

<br />

### Player & Entity Class
- Constructor
  ```javascript
  // Entity 
  const entity = new EntityClass(entityObject);
  // Player 
  const player = bew PlayerClass(playerObject);
  ```
- Player & Entity Types 
  - Entity
    ```javascript
    entity.getTags(); // Get entity all tags
    entity.hasTag("tag"); // Test if entity had tag with name "tag" or nor
    entity.getTagStartsWith("rank:"); // Get specific tag
    ```
  - Player 
    ##### Extends with Entity Class
    ```javascript
    player.getScore("scoreboardName"); // Get scoreboard score
    player.getXpLevel(); // Get xp level
    player.isOnline("playerName"); // Check if player is online or not
    player.getEmptySlots(); // Check player inventory slots, empty count
    player.getRightItem(); // Get player right hands item
    player.getItems(); // Get all items in player inventory 
    ```