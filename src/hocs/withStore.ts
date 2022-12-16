import { state } from "../types/types";
import Block from "../utils/Block";
import { isEqual } from "../utils/helpers";
import Store from "../utils/Store";

type obj = Record<string, any>;

export default function withStore(mapStateToProps: (state: state) => obj) {

  return function wrap(Component: typeof Block) {

    let currentState: obj = {};

    return class WithStore extends Component {

      constructor(props: obj) {
        const state = Store.getState();
        currentState = mapStateToProps(state);

        super({...props, ...currentState});
        Store.on(Store.EVENTS.UPDATED, () => {
          console.log("upd");
          const state = Store.getState();
          const propsFromState = mapStateToProps(state);
          console.log(currentState, propsFromState);
          if (!isEqual(currentState, propsFromState)) {
            this.setProps({...propsFromState});
          }
        });
      }

    }

  }
}
