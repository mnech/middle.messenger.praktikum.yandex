import Block from '../utils/Block';
import Router from '../utils/Router';

export function withRouter(Component: typeof Block) {

  return class WithRouter extends Component {
    constructor(props: Record<string, any>) {
      super({ ...props, router: Router });
    }
  }
}
