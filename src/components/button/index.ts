import Block from "../../utils/Block";
interface ButtonProps {
  label: string,
  onClick: () => void
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      label: props.label,
      events: {
        click: props.onClick
      }
    });
    console.log(props);
  }

  render() {
    return `
      <button class="{{styles.btn}} onClick=click">{{label}}</button>
    `;
  }
}
