import * as API from "../../class.chain.js";

const registration = new API.CommandRegistration()
  .setName("help")
  .setDescription("Help command")
  .setCategory("Built-in")
  .setAliases(["?", "h"])
  .setUsage(["<number|string|null>"])
  .setExample(["help ping", "help 1", "help"]);

const PAGE_LIMIT = 12;

API.Command.BuildCommand(registration, (interaction) => {
  const { sender, args, allCommandRegistration } = interaction;

  if (isNaN(args[0]) && args[0] !== undefined) {
    const item = API.Command.getCommand(args[0]);

    if (!item)
      return sender.sendMessage(
        `§cCommands with name or alias §f${args[0]} §cnot found.`
      );

    return sender.sendMessage(
      `§bName: §f${item.name}\n§bDescription: §f${
        item.description
      }\n§bCategory: §f${item.category ?? "No category"}\n§bAliases: §f${
        item.aliases ?? "No aliases"
      }\n§bUsage: ${item.usage || "No usage"}`
    );
  } else {
    const startIndex = ((args[0] ?? 1) - 1) * PAGE_LIMIT;
    const endIndex = (args[0] ?? 1) * PAGE_LIMIT;
    const items = Array.from(allCommandRegistration.values()).slice(
      startIndex,
      endIndex
    );

    let messages = "";
    let currentCategory = "";

    messages += items
      .map((item) => {
        let categoryLine = "";
        if (item.category !== currentCategory) {
          categoryLine = `§e${item.category}:\n`;
          currentCategory = item.category;
        }
        return `§a${categoryLine} §a${API.Command.getPrefix()}${item.name}: ${
          item.description
        }`;
      })
      .join("\n");

    if (args[0] === 1) {
      const remainingItems = Array.from(allCommandRegistration.values()).slice(
        PAGE_LIMIT
      );
      if (remainingItems.length > 0) {
        messages +=
          "\n§eTo view the next page, use §fhelp 2 §eor §fhelp 3§e, and so on";
      }
    } else {
      const remainingItems = Array.from(allCommandRegistration.values()).slice(
        endIndex
      );
      if (remainingItems.length > 0) {
        messages += `\n§eTo view the next page, use §fhelp ${
          (args[0] ?? 1) + 1
        }`;
      }
    }

    return sender.sendMessage(messages);
  }
});
