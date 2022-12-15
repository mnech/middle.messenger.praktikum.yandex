import EventBus from "./EventBus";
import { set } from "./helpers";

type StoreEvents = {
  "updated": [object],
}

class Store extends EventBus<StoreEvents> {
  private state: any = {};

  static EVENTS: Record<string, keyof StoreEvents> = {
    UPDATED: "updated",
  };

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(Store.EVENTS.Updated, this.getState());
  };

  public getState() {
    return this.state;
  }
}

export default new Store(); 
