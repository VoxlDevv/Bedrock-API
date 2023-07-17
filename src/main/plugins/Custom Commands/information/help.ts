import { Player } from "@minecraft/server";
import { Command, CommandRegistration, Validation } from "../../@modules";

const registration: CommandRegistration = new CommandRegistration()
  .setName("help")
  .setDescription("Help command")
  .setCategory("Information")
  .setAliases(["?", "h"])
  .setInputs({ 0: ["number", "string"] })
  .setUsage(["<pageNumber | CommandName>"])
  .setExample(["help ping", "help 1", "help"]);

const PAGE_LIMIT: number = 12;

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;

  if (
    isNaN(inputs.getInput(0) as any) &&
    !Validation.isUndefined(inputs.getInput(0) as any)
  ) {
    const item = Command.getCommand(inputs.getInput(0) as any);

    if (!item)
      return sender.sendMessage(
        `§cCommands with name or alias §f${
          inputs.getInput(0) as any
        } §cnot found.`
      );

    return sender.sendMessage(
      `§a--- Command information ---\n§7Name: §f${
        item.name
      }\n§7Description: §f${
        item.description.length === 0
          ? "No description found"
          : item.description
      }\n§7Category: §f${item.category}\n§7Aliases: §f${
        item.aliases.length === 0 ? "No aliases found" : item.aliases.join(", ")
      }\n§7Usage: §f\n - ${
        item.usage.length === 0 ? "No usage found" : item.usage.join("\n - ")
      }\n§7Example Usage: §f\n - ${
        item.example.length === 0
          ? "No example found"
          : item.example.join("\n - ")
      }\n§a--------------------------`
    );
  } else {
    const startIndex: number = (((inputs.getInput(0) as any) ?? 1) - 1) * PAGE_LIMIT;
    const endIndex: number = ((inputs.getInput(0) as any) ?? 1) * PAGE_LIMIT;
    const items = Array.from(Command.getAllCommands().values())
      .slice(startIndex, endIndex)
      .filter((command) => !command.private);
    const maxPages: number = Math.ceil(items.length / PAGE_LIMIT);

    let messages: string = "";
    let currentCategory: string = "";

    messages += `§a--- Showing help page ${
      inputs.getInput(0) ?? 1
    } of ${maxPages} [§e${Command.getPrefix()}help <page>§a] ---\n\n`;
    messages += items
      .map((item) => {
        let categoryLine = "";
        if (item.category !== currentCategory) {
          categoryLine = `§e${item.category}:\n`;
          currentCategory = item.category;
        }
        return `${categoryLine} §7${Command.getPrefix()}${item.name} §f${
          item.usage[0]
        }`;
      })
      .join("\n");

    if (inputs.getInput(0) === 1) {
      const remainingItems = Array.from(
        Command.getAllCommands().values()
      ).slice(PAGE_LIMIT);
      if (remainingItems.length > 0) {
        messages += `\n§eTo view the next page, use §f${Command.getPrefix()}help 2 §eor §f${Command.getPrefix()}help 3§e, and so on`;
      }
    } else {
      const remainingItems = Array.from(
        Command.getAllCommands().values()
      ).slice(endIndex);
      if (remainingItems.length > 0) {
        messages += `\n§eTo view the next page, use §f${Command.getPrefix()}help ${
          ((inputs.getInput(0) as any) ?? 1) + 1
        }`;
      }
    }

    return sender.sendMessage(messages);
  }
});
