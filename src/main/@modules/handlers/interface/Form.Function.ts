import { Player } from "@minecraft/server";
import { FormCancelationReason } from "@minecraft/server-ui";
import { ErrorClass } from "../message/Error.Class";
import {
  ActiveForm,
  ActiveFormResponse,
} from "../../@types/handlers/interface/ActiveForm";

/**
 * Forced send form to player
 * @param formId - Form id
 * @param player - Player object
 */
async function SendActiveForm<T extends ActiveForm>(
  formId: T,
  player: Player
): Promise<ActiveFormResponse<T>> {
  try {
    while (true) {
      const response = await (formId as T).show(player);
      if (response.cancelationReason !== FormCancelationReason.UserBusy)
        return response as ActiveFormResponse<T>;
    }
  } catch (error) {
    new ErrorClass().CustomError("SendActiveForm", "typeFunction", error);
  }
}

export { SendActiveForm };
