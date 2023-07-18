import { world } from "@minecraft/server";
import { BeforeEvents, PlayerClass } from "../@modules";
import { RankConfig } from "./config";

BeforeEvents.on("chat", (rawdata) => {
  const { sender, message } = rawdata;
  const player = new PlayerClass(sender);
  const getRank =
    player.getTagStartsWith("rank:")?.slice(5) ?? RankConfig.defaultRank;
  world.sendMessage(
    getRank?.replaceAll("@NAME", sender.name)?.replaceAll("@CHAT", message)
  );
});
