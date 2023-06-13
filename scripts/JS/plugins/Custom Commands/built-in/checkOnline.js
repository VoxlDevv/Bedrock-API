import {
  Command,
  CommandRegistration,
  PlayerClass,
  Validation,
} from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("checkonline")
  .setDescription("Get player status, online or offline")
  .setAliases(["con", "checkon"])
  .setCategory("Built-in")
  .setInputs({ 0: ["playername"] })
  .setUsage(["<playername: Player.nameTag>"])
  .setExample(["con JustSky001"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const player = new PlayerClass(sender);

  if (Validation.isUndefined(inputs.getInput(0)))
    return sender.sendMessage("§cSeconds arguments cannot be empty");

  const checkPlayer = player.isOnline(inputs.getInput(0));
  return sender.sendMessage(
    checkPlayer
      ? `§aPlayer with names §f${inputs.getInput(0)} §ais online`
      : `§cPlayer with names §f${inputs.getInput(0)} §cnot found or offline`
  );
});
