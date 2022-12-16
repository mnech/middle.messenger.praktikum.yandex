import { state } from "../types/types";
import EventBus from "./EventBus";
import { set } from "./helpers";

type StoreEvents = {
  "updated": [object],
}

class Store extends EventBus<StoreEvents> {
  private state: state = {};

  public EVENTS: Record<string, keyof StoreEvents> = {
    UPDATED: "updated",
  };

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(this.EVENTS.UPDATED, this.getState());
  };

  public getState() {
    return this.state;
  }
}

export default new Store(); 
