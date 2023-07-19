class CommandRegistration {
  private name: string;
  private description: string;
  private private: boolean;
  private category: string;
  private requireTags: string[];
  private aliases: string[];
  private usage: string[];
  private example: string[];
  private inputs: {
    [key: number]: string[];
  };

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
  setName(name: string) {
    this.name = name;
    return this;
  }

  /**
   * Set command description
   */
  setDescription(desc: string) {
    this.description = desc;
    return this;
  }

  /**
   * Set command private
   */
  setPrivate(value: boolean) {
    this.private = value;
    return this;
  }

  /**
   * Set command category
   */
  setCategory(cname: string) {
    this.category = cname;
    return this;
  }

  /**
   * Set command require tags
   */
  setRequireTags(tags: string[]) {
    this.requireTags = tags;
    return this;
  }

  /**
   * Ser t command aliases
   */
  setAliases(als: string[]) {
    this.aliases = als;
    return this;
  }

  /**
   * Set command usage
   */
  setUsage(usage: string[]) {
    this.usage = usage;
    return this;
  }

  /**
   * Set command example
   */
  setExample(eg: string[]) {
    this.example = eg;
    return this;
  }

  /**
   * Set command input
   */
  setInputs(inputs: { [key: number]: SupportedInputs }) {
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
