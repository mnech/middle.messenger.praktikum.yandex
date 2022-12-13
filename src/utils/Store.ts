import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: any = {};

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.getState());
  };

  public getState() {
    return this.state;
  }
}

export default new Store(); 
