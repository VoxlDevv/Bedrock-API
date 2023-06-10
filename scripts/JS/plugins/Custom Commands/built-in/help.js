import { Command, CommandRegistration, Validation } from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("help")
  .setDescription("Help command")
  .setCategory("Built-in")
  .setAliases(["?", "h"])
  .setUsage(["<page: CommandName|number|null>"])
  .setExample(["help ping", "help 1", "help"]);

const PAGE_LIMIT = 12;

Command.BuildCommand(registration, (interaction) => {
  const { sender, args, allCommandRegistration } = interaction;

  if (isNaN(args[0]) && !Validation.isUndefined(args[0])) {
    const item = Command.getCommand(args[0]);

    if (!item)
      return sender.sendMessage(
        `§cCommands with name or alias §f${args[0]} §cnot found.`
      );

    return sender.sendMessage(
      `§bName: §f${item.name}\n§bDescription: §f${
        item.description
      }\n§bCategory: §f${item.category}\n§bAliases: §f${
        item.aliases?.join(", ") || "No aliases"
      }\n§bUsage: ${item.usage?.join(", ") || "No usage"}`
    );
  } else {
    const startIndex = ((args[0] ?? 1) - 1) * PAGE_LIMIT;
    const endIndex = (args[0] ?? 1) * PAGE_LIMIT;
    const items = Array.from(allCommandRegistration.values())
      .slice(startIndex, endIndex)
      .filter((command) => !command.private)
      .sort((a, b) => a.name.localeCompare(b.name));

    let messages = "";
    let currentCategory = "";

    messages += `§aShowing page\n\n`;
    messages += items
      .map((item) => {
        let categoryLine = "";
        if (item.category !== currentCategory) {
          categoryLine = `§e${item.category}:\n`;
          currentCategory = item.category;
        }
        return `§a${categoryLine} §a${Command.getPrefix()}${item.name}: ${
          item.description
        }`;
      })
      .join("\n");

    if (args[0] === 1) {
      const remainingItems = Array.from(allCommandRegistration.values()).slice(
        PAGE_LIMIT
      );
      if (remainingItems.length > 0) {
        messages += `\n§eTo view the next page, use §f${Command.getPrefix()}help 2 §eor §f${Command.getPrefix()}help 3§e, and so on`;
      }
    } else {
      const remainingItems = Array.from(allCommandRegistration.values()).slice(
        endIndex
      );
      if (remainingItems.length > 0) {
        messages += `\n§eTo view the next page, use §f${Command.getPrefix()}help ${
          (args[0] ?? 1) + 1
        }`;
      }
    }

    return sender.sendMessage(messages);
  }
});
