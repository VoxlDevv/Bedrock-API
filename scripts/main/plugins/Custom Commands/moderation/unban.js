import {
  Command,
  CommandRegistration,
  Validation,
} from "../../class.chain";
import { banDB } from "./ban";

const registration = new CommandRegistration()
  .setName("unban")
  .setDescription("Unbanned player")
  .setCategory("Moderation")
  .setRequireTags(["mod.ban"])
  .setInputs({ 0: ["playername"] })
  .setUsage(["<playerName>"])
  .setExample(["unban @JustSky001"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const playerName = inputs.getInput(0);

  if (Validation.isUndefined(playerName))
    return sender.sendMessage("§cInvalid player names");
  if (playerName === sender.name)
    return sender.sendMessage(
      "§eAre you joking rn bruh ? You aren't even banned..."
    );
  if (!banDB.hasKey(playerName))
    return sender.sendMessage(
      `§cNo players with the name §f${playerName} §care banned`
    );
  banDB.delete(playerName);
  return sender.sendMessage(`${playerName} §ehas been unbanned`);
});
