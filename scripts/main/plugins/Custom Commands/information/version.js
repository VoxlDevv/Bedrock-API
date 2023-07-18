import { Config } from "../../../config";
import { Command, CommandRegistration } from "../../@modules";
const registration = new CommandRegistration()
    .setName("version")
    .setDescription("Get API version")
    .setCategory("Information")
    .setAliases(["ver", "versi"]);
Command.BuildCommand(registration, (interaction) => interaction.sender.sendMessage(`§aAPI Version: §e${Config.version}`));
