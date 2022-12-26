import withStore from "../../hocs/withStore";
import Block from "../../utils/Block";
import ButtonIcon from "../buttonIcon";
import Message from "../message";
import template from "./chatWindow.hbs";
import FormInput from "../FormInput";

import validateInput, {validate} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

import * as styles from "./chatWindow.module.scss";

import searchIcon from "../../../static/icons/search.svg";
import optionsIcon from "../../../static/icons/options.svg";
import arrowRigth from "../../../static/icons/arrow_right.svg";
import MessageController from "../../controlles/MessageController";
import DropDown from "../dropDown";
import Button from "../button";
import Modal from "../modal";
import ChatController from "../../controlles/ChatController";
import ProfileController from "../../controlles/ProfileController";
import Store from "../../utils/Store";
import UploadFile from "../uploadFile";

interface ChatWindowProps {
  selectedChat: number | undefined;
  messages: any[],
  userId: number,
  errorModalChat: string,
  selectedChatPhoto: string,
}

class ChatWindow extends Block {
  private activeOptions: boolean = false;
  private message!: validate;
  private user_login!: validate;
  private onSubmit = validationForm(this.message);
  private onSubmitModal = validationForm(this.user_login);

  constructor(props: ChatWindowProps) {
    super(props);
  }

  createMessages(props: ChatWindowProps) {
    if (!props.messages) {
      return props.messages;
    }

    return props.messages.map(data => {
      return new Message({
        ...data, 
        send: props.userId === data.user_id,
      });
    });
  }

  closeDropDown = (e: Event) => {
    const target = (e.target as HTMLInputElement);
    if (!(target.parentNode  as HTMLInputElement).matches(".dropbtn")) {
      if (this.activeOptions) {
        this.activeOptions = !this.activeOptions;
        (this.children.options as Block).setProps({active: this.activeOptions});
        window.removeEventListener("click", this.closeDropDown);
      }
    }
  }

  onDropDown() {
    window.addEventListener("click", this.closeDropDown);
  }

  async addRemoveUser(e: Event, add: boolean) {
    e.preventDefault();
    const data = this.onSubmitModal(e);

    if (data) {
      await ProfileController.searchByLogin(this.user_login.value);
      const friend = Store.getState().friend;

      if (Array.isArray(friend) && friend.length) {
        const id = Store.getState().friend[0].id;

        if (add) {
          await ChatController.addUserToChat(this.props.selectedChat, id);
        } else {
          await ChatController.removeUserFromChat(this.props.selectedChat, id);
        }
      }

      if (!this.props.errorModalChat) {
        if (add) {
          (this.children.modalAddUser as Block).setProps({active: false});
        } else {
          (this.children.modalRemoveUser as Block).setProps({active: false});
        }
      } else {
        if (add) {
          (this.children.modalAddUser as Block).setProps({error: this.props.errorModalChat});
        } else {
          (this.children.modalRemoveUser as Block).setProps({error: this.props.errorModalChat});
        }
      }
    }
  }

  async deleteChat(e: Event) {
    e.preventDefault();

    await ChatController.delete(this.props.selectedChat);

    if (!this.props.errorModalChat) {
      (this.children.modalDeleteChat as Block).setProps({active: false});
    } else {
      (this.children.modalDeleteChat as Block).setProps({error: this.props.errorModalChat});
    }
  }

  init() {
    this.message = validateInput("", "");
    this.user_login = validateInput("", "required");

    this.children.messages = this.createMessages(this.props as ChatWindowProps);

    this.children.searchChat = new ButtonIcon({
      label: "Search message",
      icon: searchIcon,
      alt: "Search",
      events: {
        click: () => console.log("search")
      },
      propStyle: styles.transp
    });
    this.children.options = new DropDown({
      active: this.activeOptions,
      button: new ButtonIcon({
        label: "Options",
        icon: optionsIcon,
        alt: "Options",
        events: {
          click: () => {
            this.activeOptions = !this.activeOptions;
            (this.children.options as Block).setProps({active: this.activeOptions});
            this.onDropDown();
          }
        },
        propStyle: `${styles.transp} dropbtn`
      }),
      list: [
        new Button({
        label: "Add user",
        events: {
          click: () => {
            (this.children.modalAddUser as Block).setProps({active: true});
          }
        },
        }),
        new Button({
          label: "Remove user",
          events: {
            click: () => {
            (this.children.modalRemoveUser as Block).setProps({active: true});
            }
          },
        }),
        new Button({
          label: "Delete chat",
          events: {
            click: () => {
              (this.children.modalDeleteChat as Block).setProps({active: true});
            }
          },
        }),
        new Button({
          label: "Change avatar",
          events: {
            click: () => {
              (this.children.modalAvatar as Block).setProps({active: true });
            }
          },
        }),
        ],
    });
    this.children.message = new FormInput({
      type: "text",
      name: "message", 
      placeholder: "Type your message...",
      validation: this.message,
      propStyle: styles.message, 
    });
    this.children.send = new ButtonIcon({
      label: "Send",
      icon: arrowRigth,
      alt: "Send",
      type: "submit",
      events: {
        click: (e) => {
          this.onSubmit(e);
          
          if (this.message.value) {
            MessageController.sendMessage(this.props.selectedChat, this.message.value);

            this.message.value = "";
            (this.children.message as Block).setProps({validation: this.message});
          } 
        }
      },
    });

    this.children.modalAddUser = new Modal({
      active: false,
      title: "Add user to chat",
      content: new FormInput({
        label: "User login",
        type: "text",
        name: "user_login", 
        placeholder: "Enter user login...",
        validation: this.user_login,
      }),
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.addRemoveUser(e, true); 
          }
        },
        propStyle: styles.btn,
      }),
      events: {
        click: () => {
          (this.children.modalAddUser as Block).setProps({active: false});
        }
      },
    });

    this.children.modalRemoveUser = new Modal({
      active: false,
      title: "Remove user from chat",
      content: new FormInput({
        label: "User login",
        type: "text",
        name: "user_login", 
        placeholder: "Enter user login...",
        validation: this.user_login,
      }),
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.addRemoveUser(e, false); 
          }
        },
        propStyle: styles.btn,
      }),
      events: {
        click: () => {
          (this.children.modalRemoveUser as Block).setProps({active: false});
        }
      },
    });

    this.children.modalDeleteChat = new Modal({
      active: false,
      title: "Delete this chat?",
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.deleteChat(e); 
          }
        },
        propStyle: styles.btn,
      }),
      events: {
        click: () => {
          (this.children.modalDeleteChat as Block).setProps({active: false});
        }
      },
    });    

    this.children.upload = new UploadFile({
      photo: this.props.selectedChatPhoto,
      events: {
        req: async (data: FormData) => {
          data.append("chatId", this.props.selectedChat);

          await ChatController.changeChatAvatar(data);

          (this.children.modalAvatar as Block).setProps({active: false});
        }
      }
    }),
    this.children.modalAvatar = new Modal({
      active: false,
      title: "Choose an avatar for the chat",
      content: this.children.upload,
      events: {
        click: () => {
          (this.children.modalAvatar as Block).setProps({active: false});
        }
      },
    });
  }

  protected componentDidUpdate(_oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
    this.children.messages = this.createMessages(newProps);
    
    if (_oldProps.selectedChatPhoto !== newProps.selectedChatPhoto) {
      (this.children.upload as Block).setProps({photo: newProps.selectedChatPhoto});   
    }

    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withChatWindow = withStore(state => {
  const chatId = state.selectedChat;

  if (!chatId) {
    return {
      messages: [],
      selectedChat: undefined,
      selectedChatPhoto: undefined,
      userId: state.user.id,
      chatError: "",
    }
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChat: state.selectedChat,
    selectedChatPhoto: state.selectedChatPhoto,
    userId: state.user.data.id,
    errorModalChat: state.errorModalChat,
  }
});

export default withChatWindow(ChatWindow);
