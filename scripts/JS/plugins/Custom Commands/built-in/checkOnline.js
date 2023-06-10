import {
  Command,
  CommandRegistration,
  PlayerClass,
} from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("checkonline")
  .setDescription("Get player status, online or offline")
  .setAliases(["con", "checkon"])
  .setCategory("Built-in")
  .setUsage(["<playerName: Player.nameTag>"])
  .setExample(["checkonline JustSky001"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender } = interaction;
  const player = new PlayerClass(sender);

  if (!args[0])
    return sender.sendMessage("§cSeconds arguments cannot be empty");

  const checkPlayer = player.isOnline(args[0]);
  return sender.sendMessage(
    checkPlayer
      ? `§aPlayer with names §f${args[0]} §ais online`
      : `§cPlayer with names §f${args[0]} §cnot found or offline`
  );
});
