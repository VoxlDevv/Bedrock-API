import { world } from "@minecraft/server";
import { Command, CommandRegistration, Validation } from "../../../@modules";
import { HomeDB } from "./sethome";

const registration: CommandRegistration = new CommandRegistration()
  .setName("home")
  .setDescription("Teleport to home")
  .setInputs({ 0: ["string"] })
  .setUsage(["<homeName>"])
  .setExample(["home myHome"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const homeName = inputs.getInput(0) as any;

  if (Validation.isUndefined(homeName))
    return sender.sendMessage("§cHome name cannot be empty");

  const homeDBFrmt = `${sender.name}_${homeName}`;
  if (!HomeDB.hasKey(homeDBFrmt))
    return sender.sendMessage(`§cHome with name ${homeName} doesn't exist`);

  const parsedHome = HomeDB.get(homeDBFrmt);
  sender.teleport(
    {
      x: parsedHome.coordinate[0],
      y: parsedHome.coordinate[1],
      z: parsedHome.coordinate[2],
    },
    { dimension: world.getDimension(parsedHome.dimension) }
  );
  return sender.sendMessage(`§aSuccessfully teleported to home with name §e${homeName}`)
});
