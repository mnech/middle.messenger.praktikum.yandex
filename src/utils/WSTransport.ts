import { Message } from "../types/interfaces";
import { EventBus } from "./EventBus";

type SocketEvents = {
  "connected": [],
  "error": [Event],
  "message": [Message | Message[]],
  "close": [],
}

 export default class WSTransport extends EventBus<SocketEvents> {
  private socket: WebSocket | null = null;

  private pingInterval: number = 0;

  public EVENTS: Record<string, keyof SocketEvents> = {
    CONNECTED: "connected",
    ERROR: "error",
    MESSAGE: "message",
    CLOSE: "close",
  };

  constructor(private url: string) {
    super();
  }

  connect(): Promise<void> {
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);

    return new Promise<void>((res, rej) => {
      this.socket!.addEventListener("open", () => {
        this.setupPingPong();
        res();
      });
      this.socket!.addEventListener("close", rej );
    });
  }

  send(data: unknown) {
    if (!this.socket) {
      throw new Error("Websocket connection is not established yet");
    }

    this.socket.send(JSON.stringify(data));
  }

  private setupPingPong() {
    this.pingInterval = window.setInterval(() => {
      this.send({type: "ping"});
    }, 5000); 
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data?.type === "pong") {
          return;
        }

        this.emit(this.EVENTS.MESSAGE, data);
      } catch(e) {
        throw new Error("Invalid message");
      }
    });

    socket.addEventListener("open", () => {
      this.emit(this.EVENTS.CONNECTED)
    });

    socket.addEventListener("close", () => {
      this.emit(this.EVENTS.CLOSE);
    });

    socket.addEventListener('error', (e) => {
      this.emit(this.EVENTS.ERROR, e)
    });
  }

  public close() {
    clearInterval(this.pingInterval);
    this.pingInterval = 0;
    
    this.socket?.close();
  }
}
