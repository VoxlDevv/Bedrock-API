import { CommandRegistration } from "../../class.chain.js";

new CommandRegistration()
  .setName("example") // Set command name (required)
  .setDescription("Example description") // Set command description (optional)
  .setCategory("Example") // Set command category (optional)
  .setAliases(["ex"]) // Set command aliases (optional)
  .setPrivate(true) // Set command to Operator only (optional)
  .setRequireTags(["example"]) // If player had "example" tag, player can run the command (optional)
  .setExample(["example"]) // Set command example use (optional)
  .setUsage(["example"]) // Set command usage (optional)
  .setInputs({
    0: ["string"],
    1: ["boolean"],
    2: ["number"],
    3: ["playername"],
  }); // Set command input (args) (optional)
