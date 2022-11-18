type Element = HTMLElement | null;

import EventBus from './EventBus';
export default abstract class Block<Props extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: Props;
  private eventBus: () => EventBus;
  private _element: Element = null;
  private _meta: {
    tagName: string,
    props: Props
  };

  constructor(tagName: string = 'div', props: Props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount(oldProps?: Props) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }

    this._render();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  dispatchComponentDidUpdate() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  setProps = (nextProps: Props) => {
    console.log(nextProps);
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    const element = this.getContent();
    
    if (element) {
      element.innerHTML = block;
    }
  }

  protected render(): HTMLElement {}

  getContent(): Element {
    return this.element;
  }

  _makePropsProxy(props: Props): Props  {
    const self = this;

    const proxy = new Proxy(props, {
      get(target, prop) {
        const value = target[prop];

        if (typeof value === 'function') {
          return value.bind(target);
        }

        return value;
      },

      set(target, prop, value) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
    return proxy;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show(): void {
    const element = this.getContent();

    if (element) {
      element.style.display = 'block';
    }
  }

  hide(): void {
    const element = this.getContent();

    if (element) {
      element.style.display = 'none';
    }
  }
}
