import { ErrorClass } from "../message/Error.Class";
class EntityClass {
    entityObject;
    error;
    /**
     * Entity class
     * @param entityObject - Entity object
     */
    constructor(entityObject) {
        this.entityObject = entityObject;
        this.error = new ErrorClass();
        if (!entityObject)
            this.error.CustomError("EntityClass", "constructor", "EntityObject cannot be empty");
    }
    /**
     * Get player all tag
     * @example getTags();
     */
    getTags() {
        return this.entityObject.getTags();
    }
    /**
     * Check player if had tag
     * @param tag - Tag
     * @example hasTag("tag");
     */
    hasTag(tag) {
        if (!tag)
            this.error.CustomError("EntityClass", "hasTag", "tag cannot be empty");
        return this.entityObject.hasTag(tag);
    }
    /**
     * Get player specific tag
     * @example getSpecificTag("tag:");
     */
    getTagStartsWith(startswith) {
        if (!startswith)
            this.error.CustomError("EntityClass", "getTagStartsWith", "startswith cannot be empty");
        const check = this.getTags()?.find((tag) => tag.startsWith(startswith));
        return check;
    }
}
export { EntityClass };
