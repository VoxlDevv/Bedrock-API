import * as API from "../../class.chain.js";

const registration = new API.CommandRegistration()
  .setName("example")
  .setDescription("Example command");

API.Command.BuildCommand(registration, (data) => {
  data.sender.sendMessage("Example!");
});
