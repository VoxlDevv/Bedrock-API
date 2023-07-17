import {
  ActionFormData,
  ActionFormResponse,
  MessageFormData,
  MessageFormResponse,
  ModalFormData,
  ModalFormResponse,
} from "@minecraft/server-ui";

type FormTypeList = "action" | "message" | "modal";

type FormTypes<T extends FormTypeList> = T extends "action"
  ? ActionFormData
  : T extends "message"
  ? MessageFormData
  : T extends "modal"
  ? ModalFormData
  : undefined;

type FormResponse<T> = T extends "action"
  ? ActionFormResponse
  : T extends "message"
  ? MessageFormResponse
  : T extends "modal"
  ? ModalFormResponse
  : undefined;
