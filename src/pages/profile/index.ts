import Block from "../../utils/Block";
import template from "./profile.hbs";
import Navbar from "../../components/navbar";
import EditProfile from "./components/editProfile";
import ChangePassword from "./components/changePassword";
import Info from "./components/info";
import { Content, state } from "../../types/types";

import * as styles from "./profile.module.scss";

import defPhoto from "../../../static/img/Photo.png";
import withStore from "../../hocs/withStore";

interface ProfileProps {
  data?: Record<string, string>;
  content: Content;
}

class Profile extends Block {

  constructor(props?: ProfileProps) {
    super(props);
  }

  private getAvatar() {
    if (this.props.data.avatar) {
      return this.props.data.avatar;
    } else {
      return defPhoto;
    }
  }

  private displayName() {
    const {display_name, first_name} = this.props.data;
    return display_name ? display_name : first_name;
  }

  private createContent() {

    if (this.props.content === Content.EditProfile) {
      return new EditProfile({
          ...this.props.data,
          display_name: this.displayName()
        });
    } else if (this.props.content === Content.ChangePassword) {
      return new ChangePassword();
    } else {
      return new Info({
        ...this.props.data,
        display_name: this.displayName()
      });
    }
  }

  init() {
    this.children.navbar = new Navbar();
  }

  render() {
    this.children.content = this.createContent();
    return this.compile(template, {...this.props, styles, avatar: this.getAvatar(), name: this.displayName()});
  }
}

const withUser = withStore((state: state) => (state.user || {isLoading: true}));

export default withUser(Profile);
