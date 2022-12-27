import {v4 as uuidv4} from 'uuid';

import EventBus from './EventBus';
import {getStub, getStubSelector} from "../utils/stub";

type Element = HTMLElement | null;
type Children = Record<string, Block | Block[]>;
type Props = Record<string, any>;

type BlockEvents = {
  "init": [];
  "flow:component-did-mount": [];
  "flow:component-did-update": [object, object];
  "flow:render": [];
}

export default class Block {
  static EVENTS: Record<string, keyof BlockEvents> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public id = uuidv4();
  protected props: Props;
  protected children: Children;
  private eventBus: () => EventBus<BlockEvents>;
  private _element: Element = null;

  constructor(childrenAndProps: Props = {}) {
    const eventBus = new EventBus<BlockEvents>();
    const {props, children} = this._getChildrenAndProps(childrenAndProps);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<BlockEvents>): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init(): void {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(_oldProps?: Props): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }  
  }

  protected componentDidUpdate(_oldProps?: Props, _newProps?: Props): boolean {
    return true;
  }

  public setProps = (nextProps: Props): void => {
    if (nextProps) {
      Object.assign(this.props, nextProps);
    } 
  };

  get element(): Element {
    return this._element;
  }

  private _render(): void {
    const fragment = this.render();
    
    const newElement = fragment.firstElementChild as HTMLElement;
    this._removeEvents();
    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  protected compile(template: HandlebarsTemplateDelegate, context?: Props) {
    const contextAndStubs = {...context};

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map(child => getStub(child.id));
      } else {
        contextAndStubs[name] = getStub(component.id);
      }
    });

    const html = template(contextAndStubs);
    const temp = document.createElement("template");
    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(getStubSelector(component.id));

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    }

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });  
  
    return temp.content;
  }


  public getContent(): Element {
    return this.element;
  }

  private _getChildrenAndProps(childrenAndProps: Props) {
    const props: Record<string, any> = {};
    const children: Children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every(val => val instanceof Block)) {
        children[key] = value as Block[];
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {props, children};
  }

  private _removeEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(event => {
      this._element?.removeEventListener(event, events[event])
    })
  }

  private _addEvents(): void {
    const {events = {}} = this.props;

    Object.keys(events).forEach(event => {
      this._element?.addEventListener(event, events[event])
    })
  }

  private _makePropsProxy(props: Props): Props  {
    const self = this;

    const proxy = new Proxy(props, {
      get(target: Props, prop: string): undefined {
        const value = target[prop];

        if (typeof value === 'function') {
          return value.bind(target);
        }

        return value;
      },

      set(target: Props, prop: string, value: undefined): boolean {
        const oldTarget = {...target};
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('No access!');
      },
    });
    return proxy;
  }

  public show(): void {
    const element = this.getContent();

    if (element) {
      element.style.display = 'block';
    }
  }

  public hide(): void {
    const element = this.getContent();

    if (element) {
      element.style.display = 'none';
    }
  }
}
