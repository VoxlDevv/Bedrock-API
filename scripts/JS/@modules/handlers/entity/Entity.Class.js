import { Entity } from "@minecraft/server";
import { ErrorClass } from "../message/Error.Class.js";

class EntityClass {
  /**
   * Entity class
   * @param {Entity} entityObject - Entity object
   */
  constructor(entityObject) {
    /**@private */
    this.entity = entityObject;
    /**@private */
    this.error = new ErrorClass();

    if (!entityObject)
      this.error.CustomError(
        "EntityClass",
        "constructor",
        "EntityObject cannot be empty"
      );
  }

  /**
   * Get player all tag
   * @returns {Array<String>}
   * @example getTags();
   */
  getTags() {
    return this.entity.getTags();
  }

  /**
   * Check player if had tag
   * @param {String} tag - Tag
   * @returns {Boolean}
   * @example hasTag("tag");
   */
  hasTag(tag) {
    if (!tag)
      this.error.CustomError("EntityClass", "hasTag", "tag cannot be empty");

    return this.entity.hasTag(tag);
  }

  /**
   * Get player specific tag
   * @returns {Boolean|String}
   * @example getSpecificTag("tag:");
   */
  getSpecificTag(startswith) {
    if (!this.startswith)
      this.error.CustomError(
        "EntityClass",
        "getSpecificTagg",
        "startswith cannot be empty"
      );

    const check = this.getTags()?.find((tag) => tag.startsWith(startswith));
    return check ? check : false;
  }

  getEmptySlot() {
    const inventory  = this.entity
  }
}

export { EntityClass };
