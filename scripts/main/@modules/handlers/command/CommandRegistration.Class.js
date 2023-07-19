class CommandRegistration {
    name;
    description;
    private;
    category;
    requireTags;
    aliases;
    usage;
    example;
    inputs;
    /**
     * Command registration
     */
    constructor() {
        this.name = "";
        this.description = "No Description";
        this.private = false;
        this.category = "Global";
        this.requireTags = [];
        this.aliases = [];
        this.usage = [];
        this.example = [];
        this.inputs = {};
    }
    /**
     * Set command name
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * Set command description
     */
    setDescription(desc) {
        this.description = desc;
        return this;
    }
    /**
     * Set command private
     */
    setPrivate(value) {
        this.private = value;
        return this;
    }
    /**
     * Set command category
     */
    setCategory(cname) {
        this.category = cname;
        return this;
    }
    /**
     * Set command require tags
     */
    setRequireTags(tags) {
        this.requireTags = tags;
        return this;
    }
    /**
     * Ser t command aliases
     */
    setAliases(als) {
        this.aliases = als;
        return this;
    }
    /**
     * Set command usage
     */
    setUsage(usage) {
        this.usage = usage;
        return this;
    }
    /**
     * Set command example
     */
    setExample(eg) {
        this.example = eg;
        return this;
    }
    /**
     * Set command input
     */
    setInputs(inputs) {
        Object.assign(this.inputs, inputs);
        return this;
    }
    /**
     * Extract to JSON - You don't need this for creating custom command
     */
    _ToJSON() {
        return {
            name: this.name,
            description: this.description,
            private: this.private,
            category: this.category,
            requireTags: this.requireTags,
            aliases: this.aliases,
            usage: this.usage,
            example: this.example,
            inputs: this.inputs,
        };
    }
}
export { CommandRegistration };
