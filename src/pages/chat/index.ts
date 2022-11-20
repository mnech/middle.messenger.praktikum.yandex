import Block from "../../utils/Block";

interface ChatProps {
  title: string,
}

export default class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      onClick: () => {
        console.log("click on chat 2");
      }
    });
  }

  onButtonClick = () => {
    console.log("click on chat 2");
  }

  render() {
    return `
     <div>
        <h1>{{title}}</h1>
        {{#Button onClick=onClick}}
          click mewe
        {{/Button}}
      </div>
    `
  };
}
