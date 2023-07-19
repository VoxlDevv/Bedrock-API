import {
  Command,
  CommandRegistration,
  Database,
  Validation,
} from "../../../@modules";

const registration: CommandRegistration = new CommandRegistration()
  .setName("sethome")
  .setDescription("Sethome home")
  .setAliases(["shome"])
  .setInputs({ 0: ["string"] })
  .setUsage(["<homeName>"])
  .setExample(["sethome myHome", "shome myHome"]);

const HomeDB = new Database("HomeDB");

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const homeName = inputs.getInput(0) as any;

  if (Validation.isUndefined(homeName))
    return sender.sendMessage("§cHome name cannot be empty");

  const homeDBFrmt = `${sender.name}_${homeName}`;
  if (HomeDB.hasKey(homeDBFrmt))
    return sender.sendMessage(`§eHome with name ${homeName} already exist`);

  HomeDB.set(homeDBFrmt, {
    name: homeName,
    creator: sender.name,
    coordinate: [
      Math.floor(sender.location.x),
      Math.floor(sender.location.y),
      Math.floor(sender.location.z),
    ],
    dimension: sender.dimension.id,
  });
  return sender.sendMessage(
    `§aSuccessfully set home with name §e${homeName} §aat coordinates §eX: ${Math.floor(
      sender.location.x
    )} Y: ${Math.floor(sender.location.x)} Z: ${Math.floor(sender.location.z)}`
  );
});

export { HomeDB };
