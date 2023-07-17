class SystemEventsEmitter {
    _eventsListener;
    /**
     * Event emitter
     */
    constructor() {
        this._eventsListener = {};
    }
    _addListener(name, callback, once = false) {
        if (!this._eventsListener[name]) {
            this._eventsListener[name] = [];
        }
        this._eventsListener[name].push({ callback, once });
    }
    /**
     * Event trigger
     * @param name - Event trigger
     * @param args - Event insert callback
     */
    emit(name, ...args) {
        const listener = this._eventsListener[name];
        if (listener) {
            listener.forEach((value, index) => {
                value.callback(...args);
                if (value.once)
                    listener.splice(index, 1);
            });
        }
    }
    /**
     * On event call
     * @param name - Event name
     * @param callback - Callback
     */
    on(name, callback) {
        this._addListener(name, callback);
    }
    /**
     * Once event call
     * @param name - Event name
     * @param callback - Callback
     */
    once(name, callback) {
        this._addListener(name, callback, true);
    }
}
const SystemEvents = new SystemEventsEmitter();
export { SystemEvents };
