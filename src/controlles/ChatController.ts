import { ChatAPI } from "../api/ChatAPI";
import HTTPTransport from "../utils/HTTPTransport";
import Store from "../utils/Store";
import { request } from "../utils/helpers";
import MessageController from "./MessageController";

class ChatController {
  constructor(private api: ChatAPI) {};

  async create(title: string) {
    await request("createChat", async() => {
      await this.api.create(title);
      await this.fetchChats();
    });
  }

  async fetchChats() {
    await request("chatsError", async() => {
      const chats = await this.api.read();

      chats.forEach(chat => {
        if (chat.avatar) {
          chat.photo = `${HTTPTransport.API_URL}/resources${chat.avatar}`;
        }
      });

      const promises = chats.map(chat => {
        return MessageController.connect(chat.id);
      });

      await Promise.all(promises);

      Store.set("chats", chats);
    });
  }

  async addUserToChat(id: number, userId: number) {
    await request("errorModalChat", async() => {
      this.api.addUsers(id, [userId]);
    });
  }

  async removeUserFromChat(id: number, userId: number) {
    await request("errorModalChat", async() => {
      this.api.removeUsers(id, [userId]);
    });
  }

  async delete(id: number) {
    await request("errorModalChat", async() => {
      await this.api.delete(id);
      this.fetchChats();
    });
  }

  async changeChatAvatar(avatar: FormData) {
    await request("chatAvatar", async() => {
      await this.api.changeChatAvatar(avatar);
      this.fetchChats();
    });
  }

  selectChat(id: number, photo: string) {
    Store.set("selectedChat", id);
    Store.set("selectedChatPhoto", photo);
  }

  getToken(id: number){
    return this.api.getToken(id);
  }

}

export default new ChatController(new ChatAPI());
