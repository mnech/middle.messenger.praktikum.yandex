import { ChatAPI } from "../api/ChatAPI";
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

      const promises = chats.map(chat => {
        return MessageController.connect(chat.id);
      });

      await Promise.all(promises);

      Store.set("chats", chats);
    });
  }

  async addUserToChat(id: number, userId: number) {
    await request("addUserToChat", async() => {
      this.api.addUsers(id, [userId]);
    });
  }

  async delete(id: number) {
    await request("deleteChat", async() => {
      await this.api.delete(id);
      this.fetchChats();
    });
  }

  selectChat(id: number) {
    Store.set("selectedChat", id);
  }

  getToken(id: number){
    return this.api.getToken(id);
  }

}

export default new ChatController(new ChatAPI());
