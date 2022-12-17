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
}

class Profile extends Block {
  private content: Content = Content.Info;

  constructor(props?: ProfileProps) {
    super(props);
  }

  private changeContent() {
    return (content: Content) => {
      this.content = content;
      this.setProps({content: this.content});
    }
  }

  private getAvatar() {
    if (this.props.data.avatar) {
      return this.props.data.avatar;
    } else {
      return defPhoto;
    }
  }

  private createContent() {
    this.changeContent.bind(this);

    if (this.content === Content.EditProfile) {
      return new EditProfile({
          changeContent: this.changeContent(),
          ...this.props.data
        });
    } else if (this.content === Content.ChangePassword) {
      return new ChangePassword({
        changeContent: this.changeContent(),
      });
    } else {
      return new Info({
        changeContent: this.changeContent(),
        ...this.props.data
      });
    }
  }

  init() {
    this.children.navbar = new Navbar();
  }

  render() {
    this.children.content = this.createContent();
    return this.compile(template, {...this.props, styles, avatar: this.getAvatar()});
  }
}

const withUser = withStore((state: state) => (state.user || {isLoading: true}));

export default withUser(Profile);
