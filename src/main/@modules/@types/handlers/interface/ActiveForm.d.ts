import {
  ActionFormData,
  ActionFormResponse,
  MessageFormData,
  MessageFormResponse,
  ModalFormData,
  ModalFormResponse,
} from "@minecraft/server-ui";

type ActiveForm = ActionFormData | MessageFormData | ModalFormData;

type ActiveFormResponse<T extends ActiveForm> = T extends ActionFormData
  ? ActionFormResponse
  : T extends MessageFormData
  ? MessageFormResponse
  : T extends ModalFormData
  ? ModalFormResponse
  : undefined;
