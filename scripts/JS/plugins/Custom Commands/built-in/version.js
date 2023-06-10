import { Command, CommandRegistration } from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("version")
  .setDescription("Get API version")
  .setAliases(["v", "ver", "versi"])
  .setCategory("Built-in");

Command.BuildCommand(registration, (interaction) => {
  const { sender, config } = interaction;
  return sender.sendMessage(`§aAPI version: §f${config.version}`);
});
