import { message } from "antd";

export class WebSocketClient {
  private socket: WebSocket;
  private readonly url: string;
  private handlEvent: (e: MessageEvent) => void;
  private reconnectTimer: any;
  private pingCheckInterval: any;
  private reconnectInterval = 5000;
  private lastMessageTimestamp: any;
  constructor(url: string, handlEvent: (e: MessageEvent) => void) {
    this.url = url;
    this.handlEvent = handlEvent;
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }
  private open() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }
  private onOpen(event: Event): void {
    console.log(`WebSocket connection opened `, event);
    this.startPingCheck();
    this.resetPingCheck();
    if (this.reconnectTimer) {
      clearInterval(this.reconnectTimer);
    }
  }

  private onClose(event: CloseEvent): void {
    this.clearPingCheckInterval();
    if (event.code !== 1000) {
      clearInterval(this.reconnectTimer);
      console.log("WebSocket connection closed", event.code);
      message.info("WebSocket connection lost. Reconnecting...");
      this.reconnectTimer = setInterval(() => {
        this.open();
      }, this.reconnectInterval);
    }
  }

  private onError(event: Event): void {
    console.log("WebSocket error:", event);
  }

  private onMessage(event: MessageEvent): void {
    this.handlEvent(event);
    if (typeof event.data === "string") {
      let data = JSON.parse(event.data);
      if (data.type === "PING") {
        this.resetPingCheck();
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
    this.socket.close();
  }
  private startPingCheck() {
    this.pingCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastMessageTimestamp;

      if (elapsedTime > 15000) {
        message.error(
          "No message received in the last 12 seconds. Reconnecting..."
        );
        this.clearPingCheckInterval();
        this.socket.close(3001);
      }
    }, 2000);
  }

  private resetPingCheck() {
    this.lastMessageTimestamp = Date.now();
  }

  private clearPingCheckInterval() {
    if (this.pingCheckInterval) clearInterval(this.pingCheckInterval);
  }
}
