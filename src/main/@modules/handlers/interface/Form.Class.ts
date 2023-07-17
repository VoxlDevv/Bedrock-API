import { Player, RawMessage } from "@minecraft/server";
import {
  ActionFormData,
  MessageFormData,
  ModalFormData,
} from "@minecraft/server-ui";
import { ErrorClass } from "../message/Error.Class";
import * as Validation from "../../utils/Validation.Function";
import {
  FormTypeList,
  FormTypes,
  FormResponse,
} from "../../@types/handlers/interface/FormType";

class FormClass<T extends FormTypeList> {
  private type: string;
  private typeMap: { [key: string]: any };
  private error: ErrorClass;
  private formType: FormTypes<T>;

  /**
   * Form class
   * @param type - Form type (action, message, modal)
   */
  constructor(type: T) {
    this.type = type;
    this.typeMap = {
      action: ActionFormData,
      message: MessageFormData,
      modal: ModalFormData,
    };
    this.error = new ErrorClass();

    if (type.length === 0)
      this.error.CustomError(
        "FormClass",
        "constructor",
        "type cannot be empty"
      );
    if (Validation.isUndefined(this.typeMap[type]))
      this.error.CustomError(
        "FormClass",
        "constructor",
        "unsupported type, available type (action, message, modal)"
      );

    this.formType = new this.typeMap[type]();
  }

  /**
   * AllForm: form title
   * @param text - Title text
   */
  setTitle(text: string | RawMessage) {
    this.formType.title(text);
    return this;
  }

  /**
   * Action and Message: form body
   * @param text - Body text
   */
  setBody(text: string | RawMessage) {
    if (
      !(this.formType instanceof ActionFormData) ||
      !(this.formType instanceof MessageFormData)
    )
      this.error.CustomError(
        "FormClass",
        "setBody",
        "Modal form don't have setBody method"
      );
    (this.formType as ActionFormData | MessageFormData).body(text);
    return this;
  }

  /**
   * Action: form button
   * @param text - Button text
   * @param iconPath - Button icon (optional)
   */
  addButton(text: string | RawMessage, iconPath?: string) {
    if (!(this.formType instanceof ActionFormData))
      this.error.CustomError(
        "FormClass",
        "addButton",
        "Message and Modal form don't have addButton method"
      );
    (this.formType as ActionFormData).button(text, iconPath);
    return this;
  }

  /**
   * Message: form button 1
   * @param text - Button text
   */
  setButton1(text: string | RawMessage) {
    if (!(this.formType instanceof MessageFormData))
      this.error.CustomError(
        "FormClass",
        "setButton1",
        "Action and Modal form don't have setButton1 method"
      );
    (this.formType as MessageFormData).button1(text);
    return this;
  }

  /**
   * Message: form button 2
   * @param text - Button text
   */
  setButton2(text: string | RawMessage) {
    if (!(this.formType instanceof MessageFormData))
      this.error.CustomError(
        "FormClass",
        "setButton2",
        "Action and Modal form don't have setButton2 method"
      );
    (this.formType as MessageFormData).button2(text);
    return this;
  }

  /**
   * Modal: form dropdown
   * @param label - Label text
   * @param options - Array options
   * @param defaultValue - Default value array number (optional)
   */
  addDropdown(
    label: string | RawMessage,
    options: string[] | RawMessage[],
    defaultValue?: number
  ) {
    if (!(this.formType instanceof ModalFormData))
      this.error.CustomError(
        "FormClass",
        "addDropdown",
        "Action and Message form don't have addDropdown method"
      );
    (this.formType as ModalFormData).dropdown(label, options, defaultValue);
    return this;
  }

  /**
   * Modal: form slider
   * @param label - Label text
   * @param minValue - Minimal slider value
   * @param maxValue - Maximal slider value
   * @param valueStep - Value step
   * @param defaultValue - Default slider value (optional)
   */
  addSlider(
    label: string | RawMessage,
    minValue: number,
    maxValue: number,
    valueStep: number,
    defaultValue?: number
  ) {
    if (!(this.formType instanceof ModalFormData))
      this.error.CustomError(
        "FormClass",
        "addSlider",
        "Action and Message form don't have addSlider method"
      );
    (this.formType as ModalFormData).slider(
      label,
      minValue,
      maxValue,
      valueStep,
      defaultValue
    );
    return this;
  }

  /**
   * Modal: form text field
   * @param label - Label text
   * @param placeholder - Placeholder text
   * @param defaultValue - Default text value (optional)
   */
  addTextField(
    label: string | RawMessage,
    placeholder: string | RawMessage,
    defaultValue?: string
  ) {
    if (!(this.formType instanceof ModalFormData))
      this.error.CustomError(
        "FormClass",
        "addTextField",
        "Action and Message form don't have addTextField method"
      );
    (this.formType as ModalFormData).textField(
      label,
      placeholder,
      defaultValue
    );
    return this;
  }

  /**
   * Modal: form toggle
   * @param label - Label text
   * @param defaultValue - Default toggle value (optional)
   */
  addToggle(label: string | RawMessage, defaultValue?: boolean) {
    if (!(this.formType instanceof ModalFormData))
      this.error.CustomError(
        "FormClass",
        "addToggle",
        "Action and Message form don't have addToggle method"
      );
    (this.formType as ModalFormData).toggle(label, defaultValue);
    return this;
  }

  /**
   * Show message to player
   * @param player - Player object
   */
  async sendForm(player: Player): Promise<FormResponse<T>> {
    try {
      const response = await this.formType.show(player);
      return response as FormResponse<T>;
    } catch (error) {
      this.error.CustomError("FormClass", "sendForm", error);
    }
  }
}

export { FormClass };
