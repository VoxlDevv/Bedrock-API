import { FormCancelationReason } from "@minecraft/server-ui";
import { ErrorClass } from "../message/Error.Class";
/**
 * Forced send form to player
 * @param formId - Form id
 * @param player - Player object
 */
async function SendActiveForm(formId, player) {
    try {
        while (true) {
            const response = await formId.show(player);
            if (response.cancelationReason !== FormCancelationReason.UserBusy)
                return response;
        }
    }
    catch (error) {
        new ErrorClass().CustomError("SendActiveForm", "typeFunction", error);
    }
}
export { SendActiveForm };
