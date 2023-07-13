import { Entity } from "@minecraft/server";
import { ErrorClass } from "../message/Error.Class";

class EntityClass {
  /**
   * Entity class
   * @param {Entity} entityObject - Entity object
   */
  constructor(entityObject) {
    /**@private */
    this.entityObject = entityObject;
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
    return this.entityObject.getTags();
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

    return this.entityObject.hasTag(tag);
  }

  /**
   * Get player specific tag
   * @returns {Boolean|String}
   * @example getSpecificTag("tag:");
   */
  getTagStartsWith(startswith) {
    if (!startswith)
      this.error.CustomError(
        "EntityClass",
        "getTagStartsWith",
        "startswith cannot be empty"
      );

    const check = this.getTags()?.find((tag) => tag.startsWith(startswith));
    return check;
  }
}

export { EntityClass };
