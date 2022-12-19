import BaseAPI from "./BaseAPI";
import { ChatInfo, User } from "../types/interfaces";


export class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  public create(title: string) {
    return this.hhtp.post("/", {data: title});
  }

  public delete(id: number): Promise<unknown> {
    return this.hhtp.delete("/", {data: {chatId: id}});
  }

  public read(): Promise<ChatInfo[]> {
    return this.hhtp.get("/");
  }

  public getUsers(id: number): Promise<Array<User & {role: string}>> {
    return this.hhtp.get(`/${id}/users`);
  }

  public addUsers(id: number, users: number[]): Promise<unknown> {
    return this.hhtp.put("/users", {data: {users, chatIf: id}});
  }

  async getToken(id: number): Promise<string> {
    const res = await this.hhtp.post<{token: string}>(`/token/${id}`);
    return res.token;
  }

  update = undefined;
}
