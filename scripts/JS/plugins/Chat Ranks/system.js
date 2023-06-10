import { world, system } from "@minecraft/server";
import { RankConfig } from "./config.js";
import * as API from "../class.chain.js";

world.beforeEvents.chatSend.subscribe(async (data) => {
  const { message, sender } = data;
  if (message.startsWith(API.Command.getPrefix())) return;
  data.cancel = true;
  const getRankTag =
    sender
      .getTags()
      .find((tag) => tag.startsWith("rank:"))
      ?.slice(5) ?? RankConfig.defaultRank;

  // Privilege kont
  await API.Timer.sleep(2);
  new API.ChatClass().broadcast({
    text: getRankTag
      ?.replaceAll("{name}", sender.nameTag)
      ?.replaceAll("{msg}", message),
  });
});
