import {
  ActionFormData,
  ActionFormResponse,
  MessageFormData,
  MessageFormResponse,
  ModalFormData,
  ModalFormResponse,
} from "@minecraft/server-ui";
import { ErrorClass } from "../message/Error.Class.js";
import * as Validation from "../../utils/Validation.Function.js";
import { Player } from "@minecraft/server";

class FormClass {
  /**
   * Form class
   * @param {ModalFormData|MessageFormData|MessageFormData} type
   */
  constructor(type) {
    /**@private */
    this.typeMap = {
      action: ActionFormData,
      message: MessageFormData,
      modal: ModalFormData,
    };
    /**@private */
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

    /**@private */
    this.formType = new this.typeMap[type]();
  }

  /**
   * AllForm: form title
   * @param {String|import("@minecraft/server").RawMessage} text - Title text
   */
  setTitle(text) {
    this.formType.title(text);
  }

  /**
   * Action and Message: form body
   * @param {String|import("@minecraft/server").RawMessage} text - Body text
   */
  setBody(text) {
    this.formType.body(text);
  }

  /**
   * Action: form button
   * @param {String} text - Button text
   * @param {String|undefined} iconPath - Button icon (optional)
   */
  addButton(text, iconPath = undefined) {
    this.formType.button(text, iconPath);
  }

  /**
   * Message: form button 1
   * @param {String|import("@minecraft/server").RawMessageScore} text - Button text
   */
  setButton1(text) {
    this.formType.button1(text);
  }

  /**
   * Message: form button 2
   * @param {String|import("@minecraft/server").RawMessage} text - Button text
   */
  setButton2(text) {
    this.formType.button2(text);
  }

  /**
   * Modal: form dropdown
   * @param {String|import("@minecraft/server").RawMessage} label - Label text
   * @param {Array<String|import("@minecraft/server").RawMessage>} options - Array options
   * @param {Number|undefined} defaultValue - Default value array number (optional)
   */
  addDropdown(label, options, defaultValue = undefined) {
    this.formType.dropdown(label, options, defaultValue);
  }

  /**
   * Modal: form slider
   * @param {String|import("@minecraft/server").RawMessage} label - Label text
   * @param {Number} minValue - Minimal slider value
   * @param {Number} maxValue - Maximal slider value
   * @param {Number} valueStep - Value step
   * @param {Number|undefined} defaultValue - Default slider value (optional)
   */
  addSlider(label, minValue, maxValue, valueStep, defaultValue = undefined) {
    this.formType.slider(label, minValue, maxValue, valueStep, defaultValue);
  }

  /**
   * Modal: form text field
   * @param {String|import("@minecraft/server").RawText} label - Label text
   * @param {String|import("@minecraft/server").RawText} placeholder - Placeholder text
   * @param {String|undefined} defaultValue - Default text value (optional)
   */
  addTextField(label, placeholder, defaultValue = undefined) {
    this.formType.textField(label, placeholder, defaultValue);
  }

  /**
   * Modal: form toggle
   * @param {String|import("@minecraft/server").RawMessage} label - Label text
   * @param {Boolean|undefined} defaultValue - Default toggle value (optional)
   */
  addToggle(label, defaultValue = undefined) {
    this.formType.toggle(label, defaultValue);
  }

  /**
   * Show message to player
   * @param {Player} player - Player object
   * @returns {Promise<ActionFormResponse|MessageFormResponse|ModalFormResponse>}
   */
  async sendForm(player) {
    try {
      const response = await this.formType.show(player);
      return response;
    } catch (error) {
      this.error.CustomError("FormClass", "sendForm", error);
    }
  }
}

export { FormClass };
