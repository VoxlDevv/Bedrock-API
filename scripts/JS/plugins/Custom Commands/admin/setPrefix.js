import { world } from "@minecraft/server";
import {
  ChatClass,
  Command,
  CommandRegistration,
  Timer,
  Validation,
} from "../../class.chain";

const registration = new CommandRegistration()
  .setName("setprefix")
  .setDescription("Set command prefix")
  .setCategory("Admin")
  .setPrivate(true)
  .setUsage(["<prefix>"])
  .setExample(["setprefix +", "setprefix ?", "setprefix !"])
  .setInputs({ 0: ["string"] });

Command.BuildCommand(registration, async (interaction) => {
  const { sender, inputs } = interaction;
  const whatPrefix = inputs.getInput(0);
  if (Validation.isUndefined(whatPrefix))
    return sender.sendMessage("§cPrefix cannot be empty");
  Command.setPrefix(whatPrefix);
  world.sendMessage(`${sender.name} updated prefix to: §f${whatPrefix}`);

  await Timer.sleep(5);
  world.sendMessage("§eReloading API with /reload command");
  await Timer.sleep(2);
  new ChatClass().runCommand("reload");
  await Timer.sleep(40);
  world.sendMessage("§aFinished...");
});
