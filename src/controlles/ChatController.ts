import { ChatAPI } from "../api/ChatAPI";
import Store from "../utils/Store";
import MessageController from "./MessageController";

class ChatController {
  constructor(private api: ChatAPI) {};

  private async request(req: () => void) {
    try {
      this.setError(undefined);
      await req();
    } catch(e) {
      this.setError(e);
      throw new Error();
    }
  }

  private setError(e: unknown) {
    if (e instanceof Error) {
      Store.set("chats", e.message);
    } else if (e){
      Store.set("chats", e);
    }
  }

  async create(title: string) {
    await this.api.create(title);
    await this.fetchChats();
  }

  async fetchChats() {
    await this.request(async() => {
      const chats = await this.api.read();

      const promises = chats.map(chat => {
        return MessageController.connect(chat.id);
      });

      await Promise.all(promises);

      Store.set("chats", chats);
    });
  }

  async addUserToChat(id: number, userId: number) {
    await this.request(async() => {
      this.api.addUsers(id, [userId]);
    });
  }

  async delete(id: number) {
    await this.request(async() => {
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
