import { Player } from "@minecraft/server";
import {
  ActionFormData,
  ActionFormResponse,
  MessageFormData,
  MessageFormResponse,
  ModalFormData,
  ModalFormResponse,
} from "@minecraft/server-ui";
import { ErrorClass } from "../message/Error.Class";

/**
 * Forced send form to player
 * @param {ActionFormData|MessageFormData|ModalFormData} formId - Form id
 * @param {Player} player - Player object
 * @returns {Promise<ActionFormResponse|MessageFormResponse|ModalFormResponse>}
 */
async function SendActiveForm(formId, player) {
  try {
    while (true) {
      const response = await formId.show(player);
      if (response.cancelationReason !== "userBusy") return response;
    }
  } catch (error) {
    new ErrorClass().CustomError("ForcedSendForm", "typeFunction", error);
  }
}

export { SendActiveForm };
