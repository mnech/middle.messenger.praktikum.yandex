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
        const state = mapStateToProps(Store.getState());
        currentState = JSON.parse(JSON.stringify(state)) ;

        super({...props, ...currentState});

        Store.on(Store.EVENTS.UPDATED, () => {
          const stateToProps = mapStateToProps(Store.getState());
          
          if (isEqual(currentState, stateToProps)) {
            return;
          }
    
          currentState = JSON.parse(JSON.stringify(stateToProps));

          this.setProps({...stateToProps});
        });
      }

    }

  }
}

