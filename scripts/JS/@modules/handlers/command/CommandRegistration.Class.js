import { Validation } from "../../export.modules.js";

class CommandRegistration {
  /**
   * Command registration
   */
  constructor() {
    this.name = "";
    this.description = "No Description";
    this.private = false;
    this.category = "";
    this.requireTags = [];
    this.aliases = [];
    this.usage = [];
    this.example = [];
  }
  /**
   * Set command name
   * @param {String} string
   */
  setName(string) {
    if (Validation.isString(string)) this.name = string;
    return this;
  }

  /**
   * Set command description
   * @param {String} string
   */
  setDescription(string) {
    if (Validation.isString(string)) this.description = string;
    return this;
  }

  /**
   * Set command private
   * @param {Boolean} boolean
   */
  setPrivate(boolean) {
    if (Validation.isBoolean(boolean)) this.private = boolean;
    return this;
  }

  /**
   * Set command category
   * @param {String} string
   */
  setCategory(string) {
    if (Validation.isString(string)) this.category = string;
    return this;
  }

  /**
   * Set command require tags
   * @param {Array<String>} array
   */
  setRequireTags(array) {
    if (Validation.isArray(array)) this.requireTags = array;
    return this;
  }

  /**
   * Ser t command aliases
   * @param {Array<String>} array
   */
  setAliases(array) {
    if (Validation.isArray(array)) this.aliases = array;
    return this;
  }
  /**
   * Set command usage
   * @param {Array<String>} array
   */
  setUsage(array) {
    if (Validation.isArray(array)) this.usage = array;
    return this;
  }

  /**
   * Set command example
   * @param {Array<String>} array
   */
  setExample(array) {
    if (Validation.isArray(array)) this.example = array;
    return this;
  }

  /**
   * Extract to JSON
   * @private
   */
  extractJSON() {
    return {
      name: this.name,
      description: this.description,
      private: this.private,
      category: this.category,
      requireTags: this.requireTags,
      aliases: this.aliases,
      usage: this.usage,
      example: this.example,
    };
  }
}

export { CommandRegistration };
