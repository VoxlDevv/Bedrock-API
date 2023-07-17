import {
  BeforeEventsList,
  BeforeEventCallback,
} from "../@types/events/BeforeEventsType";

class BeforeEventsEmitter {
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
   * @param name - Event trigger
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
  on<T extends BeforeEventsList>(
    name: T,
    callback: (arg: BeforeEventCallback<T>) => void
  ) {
    this._addListener(name, callback);
  }

  /**
   * Once event call
   * @param name - Event name
   * @param callback - Callback
   */
  once<T extends BeforeEventsList>(
    name: T,
    callback: (arg: BeforeEventCallback<T>) => void
  ) {
    this._addListener(name, callback, true);
  }
}

const BeforeEvents = new BeforeEventsEmitter();
export { BeforeEvents };
