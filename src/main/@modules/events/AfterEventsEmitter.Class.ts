import {
  AfterEventCallback,
  AfterEventsList,
} from "../@types/events/AfterEventsType";

class AfterEventsEmitter {
  private _eventsListener: {
    [key: string]: {
      callback: Function;
      once: boolean;
    }[];
  };

  /**
   * Event emitter
   */
  constructor() {
    this._eventsListener = {};
  }

  private _addListener(
    name: string,
    callback: Function,
    once: boolean = false
  ) {
    if (!this._eventsListener[name]) {
      this._eventsListener[name] = [];
    }
    this._eventsListener[name].push({ callback, once });
  }

  /**
   * Event trigger
   * @param name - Trigger name
   * @param args - Event insert callback
   */
  emit(name: string, ...args: any) {
    const listener = this._eventsListener[name];
    if (listener) {
      listener.forEach((value, index) => {
        value.callback(...args);
        if (value.once) listener.splice(index, 1);
      });
    }
  }

  /**
   * On event call
   * @param name - Event name
   * @param callback - Callback
   */
  on<T extends AfterEventsList>(
    name: T,
    callback: (arg: AfterEventCallback<T>) => void
  ) {
    this._addListener(name, callback);
  }

  /**
   * Once event call
   * @param name - Event name
   * @param callback - Callback
   */
  once<T extends AfterEventsList>(
    name: T,
    callback: (arg: AfterEventCallback<T>) => void
  ) {
    this._addListener(name, callback, true);
  }
}

const AfterEvents = new AfterEventsEmitter();
export { AfterEvents };
