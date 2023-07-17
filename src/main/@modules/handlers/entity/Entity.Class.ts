import { Entity } from "@minecraft/server";
import { ErrorClass } from "../message/Error.Class";

class EntityClass {
  private entityObject: Entity;
  private error: ErrorClass;

  /**
   * Entity class
   * @param entityObject - Entity object
   */
  constructor(entityObject: Entity) {
    this.entityObject = entityObject;
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
   * @example getTags();
   */
  getTags(): string[] {
    return this.entityObject.getTags();
  }

  /**
   * Check player if had tag
   * @param tag - Tag
   * @example hasTag("tag");
   */
  hasTag(tag: string): boolean {
    if (!tag)
      this.error.CustomError("EntityClass", "hasTag", "tag cannot be empty");

    return this.entityObject.hasTag(tag);
  }

  /**
   * Get player specific tag
   * @example getSpecificTag("tag:");
   */
  getTagStartsWith(startswith: string): string {
    if (!startswith)
      this.error.CustomError(
        "EntityClass",
        "getTagStartsWith",
        "startswith cannot be empty"
      );

    const check: string = this.getTags()?.find((tag) =>
      tag.startsWith(startswith)
    );
    return check;
  }
}

export { EntityClass };
