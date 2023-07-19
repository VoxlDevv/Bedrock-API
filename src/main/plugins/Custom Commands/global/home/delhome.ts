import { Command, CommandRegistration, Validation } from "../../../@modules";
import { HomeDB } from "./sethome";

const registration: CommandRegistration = new CommandRegistration()
  .setName("delhome")
  .setDescription("Delete home")
  .setAliases(["deletehome", "dhome"])
  .setInputs({ 0: ["string"] })
  .setUsage(["<homeName>"])
  .setExample(["home myHome", "deletehome myHome", "dhome myHome"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const homeName = inputs.getInput(0) as any;

  if (Validation.isUndefined(homeName))
    return sender.sendMessage("§cHome name cannot be empty");

  const homeDBFrmt = `${sender.name}_${homeName}`;
  if (!HomeDB.hasKey(homeDBFrmt))
    return sender.sendMessage(`§cHome with name §e${homeName} §cdoesn't exist`);

  HomeDB.delete(homeDBFrmt);
  return sender.sendMessage(
    `§aSuccessfully deleted home with name §e${homeName}`
  );
});
