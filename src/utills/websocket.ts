import { message } from "antd";

export class WebSocketClient {
  private socket: WebSocket;
  private readonly url: string;
  private handlEvent: (e: MessageEvent) => void;
  private reconnectTimer: any;
  private pingCheckInterval: any;
  private reconnectInterval = 5000;
  private lastMessageTimestamp: any;
  private shouldReconnect: boolean;
  private timer: any;
  constructor(
    url: string,
    handlEvent: (e: MessageEvent) => void,
    shouldReconnect: boolean
  ) {
    this.url = url;
    this.handlEvent = handlEvent;
    this.shouldReconnect = shouldReconnect;
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }
  public open() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }
  public onOpen(event: Event): void {
    console.log(`WebSocket connection opened `, event);
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
  }

  public onClose(event: CloseEvent): void {
    console.log(event, "close");
    if (this.timer) clearTimeout(this.timer);
    if (this.shouldReconnect) {
      console.log("GUARD WS CLOSE");
      this.timer = setTimeout(() => {
        this.open();
      }, 5000);
    }
  }

  public onError(event: Event): void {
    console.log("WebSocket error:", event);
    if (this.timer) clearTimeout(this.timer);
    if (this.shouldReconnect) {
      console.log("GUARD WS CLOSE");
      this.timer = setTimeout(() => {
        this.open();
      }, 5000);
    }
  }

  private onMessage(event: MessageEvent): void {
    this.handlEvent(event);
    if (typeof event.data === "string") {
      let data = JSON.parse(event.data);
      if (data.type === "PING") {
      } else if (data.type === "ERROR") {
      }
    }
  }

  public send(data: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      message.info("WebSocket is not open. Unable to send data.");
    }
  }

  public close(): void {
    if (this.socket) this.socket.close();
  }
}
