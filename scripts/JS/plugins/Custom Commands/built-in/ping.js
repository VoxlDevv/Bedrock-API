import { Command, CommandRegistration } from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("ping")
  .setDescription("Ping command")
  .setCategory("Built-in")
  .setAliases(["p"]);

Command.BuildCommand(registration, (interaction) => {
  interaction.sender.sendMessage("Pong!");
});
