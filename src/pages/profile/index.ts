import Block from "../../utils/Block";
import template from "./profile.hbs";
import Navbar from "../../components/navbar";
import EditProfile from "./components/editProfile";
import ChangePassword from "./components/changePassword";
import Info from "./components/info";
import { Content, state } from "../../types/types";

import {default as styles} from "./profile.module.scss";

import defPhoto from "../../../static/img/Photo.png";
import withStore from "../../hocs/withStore";
import UploadFile from "../../components/uploadFile";
import ProfileController from "../../controlles/ProfileController";
import AuthController from "../../controlles/AuthController";

interface ProfileProps {
  data?: Record<string, string>;
  content: Content;
}

class Profile extends Block {

  constructor(props?: ProfileProps) {
    super(props);
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

  getPhoto(photo: string | undefined) {
    return photo || defPhoto;
  }

  protected componentDidUpdate(_oldProps: ProfileProps, newProps: ProfileProps): boolean {
    const photo = this.getPhoto(newProps.data?.photo);

    (this.children.avatar as Block).setProps({photo});

    return false;
  }

  init() {
    const photo = this.getPhoto(this.props.data.photo);

    this.children.navbar = new Navbar({});
    this.children.avatar = new UploadFile({
      photo,
      events: {
        req: async (data: FormData) => {
          await ProfileController.changeAvatar(data);
          await AuthController.fetchUser();  
        }
      }
    });
  }

  render() {   
    this.children.content = this.createContent();
    return this.compile(template, {...this.props, styles, name: this.displayName()});
  }
}

const withUser = withStore((state: state) => (state.user));

export default withUser(Profile);
