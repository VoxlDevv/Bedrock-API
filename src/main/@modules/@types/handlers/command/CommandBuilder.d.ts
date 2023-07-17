import { ChatSendBeforeEvent, Player } from "@minecraft/server";
import { Config } from "../../../../config";

interface CommandBuild {
  DB?: {
    used: number;
  };
  sender?: Player;
  inputs?: {
    getInput: (inputNumber: number) => number | string | boolean | undefined;
  };
  config?: typeof Config;
  raw: ChatSendBeforeEvent;
}
