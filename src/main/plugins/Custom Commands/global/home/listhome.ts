import { world } from "@minecraft/server";
import { Command, CommandRegistration, Validation } from "../../../@modules";
import { HomeDB } from "./sethome";

const registration: CommandRegistration = new CommandRegistration()
  .setName("listhome")
  .setDescription("Get all home")
  .setUsage(["<homeName>"])
  .setExample(["listhome myHome"]);

Command.BuildCommand(registration, (interaction) => {
  const { sender } = interaction;
  const homes = [];

  for (const [, home] of HomeDB) {
    if (home.creator === sender.name) homes.push(home);
  }

  return sender.sendMessage(
    `§b---- Home List ----\n\n${
      homes.length === 0
        ? "§f# §7You don't have any home"
        : homes
            .sort()
            .map(
              (home: { name: string; dimension: string }) =>
                `§f# §a${home.name} §7- ${home.dimension}`
            )
            .join("\n\n")
    }`
  );
});
