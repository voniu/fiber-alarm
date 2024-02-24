import { message } from "antd";

export class RtspStream {
  constructor(wsUrl, videoId) {
    this.wsUrl = wsUrl;
    this.videoId = videoId;
    this.reconnectInterval = 5000;
    console.log("videoId", videoId);
  }

  open() {
    this.close();
    this.websocket = new WebSocket(this.wsUrl);
    this.websocket.binaryType = "arraybuffer";
    this.websocket.onopen = this.onOpen.bind(this);
    this.websocket.onmessage = this.onMessage.bind(this);
    this.websocket.onclose = this.onClose.bind(this);
    this.websocket.onerror = this.onError.bind(this);

    this.media = new ChannelMedia(this.videoId);
  }

  close() {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.close();
    }
  }

  onError(evt) {
    console.log("连接错误");
  }

  onOpen(evt) {
    console.log("连接成功", this.wsUrl);
    if (this.timer) clearInterval(this.timer);
    if (this.pingCheckInterval) clearInterval(this.pingCheckInterval);
    this.startPingCheck();
    this.resetPingCheck();
  }

  onClose(evt) {
    console.log("连接关闭", this.wsUrl);
    this.clearPingCheckInterval();
    if (evt.code !== 1000) {
      message.info("WebSocket connection lost. Reconnecting...");
      // 尝试重连
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.open();
      }, 5000);
    } else {
      console.log("normal close");
    }
  }

  onMessage(evt) {
    if (typeof evt.data === "string") {
      let data = JSON.parse(evt.data);
      if (data.type === "CODEC") {
        this.media.init(data.content.codec);
      } else if (data.type === "ERROR") {
        console.error(`error: ${data.content.msg}`);
        message.error(`error: ${data.content.msg}`);
      } else if (data.type === "PING") {
      } else {
        console.log(data.content);
      }
    } else {
      this.resetPingCheck();
      this.media.pushData(new Uint8Array(evt.data));
    }
  }
  startPingCheck() {
    this.pingCheckInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.lastMessageTimestamp;
      if (elapsedTime > 10000) {
        message.error(
          "No message received in the last 10 seconds. Reconnecting..."
        );
        this.clearPingCheckInterval();
        this.websocket.close(3001);
      }
    }, 2000);
  }

  resetPingCheck() {
    this.lastMessageTimestamp = Date.now();
  }

  clearPingCheckInterval() {
    if (this.pingCheckInterval) clearInterval(this.pingCheckInterval);
  }
}

export class ChannelMedia {
  constructor(videoId) {
    this.videoId = videoId;
    this.queue = [];
    this.canFeed = false;
  }

  /**
   * 初始化
   * @param codecStr 视频编码
   */
  init(codecStr) {
    this.codec = 'video/mp4; codecs="' + codecStr + '"';
    console.log(`play [${this.codec}]`);
    if (MediaSource.isTypeSupported(this.codec)) {
      this.mediaSource = new MediaSource();
      this.mediaSource.addEventListener(
        "sourceopen",
        this.onMediaSourceOpen.bind(this)
      );
      this.mediaPlayer = document.getElementById(this.videoId);
      console.log(this.videoId);

      this.mediaPlayer.src = URL.createObjectURL(this.mediaSource);
    } else {
      console.log("Unsupported MIME type or codec: " + this.codec);
    }
  }

  /**
   * MediaSource已打开事件
   * @param e 事件
   */
  onMediaSourceOpen(e) {
    // URL.revokeObjectURL 主动释放引用
    URL.revokeObjectURL(this.mediaPlayer.src);
    this.mediaSource.removeEventListener(
      "sourceopen",
      this.onMediaSourceOpen.bind(this)
    );

    // console.log("MediaSource已打开")
    this.sourceBuffer = this.mediaSource.addSourceBuffer(this.codec);
    this.sourceBuffer.addEventListener("about", (e) =>
      console.log(`about `, e)
    );
    this.sourceBuffer.addEventListener("error", (e) =>
      console.log(`error `, e)
    );
    this.sourceBuffer.addEventListener("updateend", (e) => {
      if (this.canFeed) {
        this.removeBuffer();
        this.processDelay();
        this.feedNext();
      }
    });
    this.canFeed = true;
  }

  /**
   * 压入数据
   * @param data 数据
   */
  pushData(data) {
    this.queue.push(data);
    if (this.canFeed) this.feedNext();
  }

  /**
   * 喂数据
   * append的时候遇到The HTMLMediaElement.error attribute is not null就是数据时间戳有问题
   */
  feedNext() {
    if (!this.queue || !this.queue.length) return;
    if (!this.sourceBuffer || this.sourceBuffer.updating) return;

    this.canFeed = false;
    try {
      const data = this.queue.shift();
      this.sourceBuffer.appendBuffer(data);
      this.canFeed = true;
    } catch (e) {
      console.log(e);
      this.canFeed = false;
      this.queue = [];
    }
  }

  /**
   * 处理延时或画面卡主
   */
  processDelay() {
    if (
      !this.sourceBuffer ||
      !this.sourceBuffer.buffered.length ||
      this.sourceBuffer.updating
    )
      return;

    const end = this.sourceBuffer.buffered.end(
      this.sourceBuffer.buffered.length - 1
    );
    const current = this.mediaPlayer.currentTime;
    // 解决延迟并防止画面卡主
    if (Math.abs(end - current) >= 1.8) {
      this.mediaPlayer.currentTime = end - 0.01;
    }
  }

  /**
   * 移除缓存
   */
  removeBuffer() {
    if (
      !this.sourceBuffer ||
      !this.sourceBuffer.buffered.length ||
      this.sourceBuffer.updating
    )
      return;

    const length = this.sourceBuffer.buffered.length;
    const firstStart = this.sourceBuffer.buffered.start(0);
    const firstEnd = this.sourceBuffer.buffered.end(0);
    // const lastStart = this.sourceBuffer.buffered.start(length - 1);
    const lastEnd = this.sourceBuffer.buffered.end(length - 1);
    const currentTime = this.mediaPlayer.currentTime;

    if (Math.abs(firstStart - lastEnd) > 47000) {
      this.sourceBuffer.remove(firstEnd + 10, lastEnd);
    } else if (currentTime - firstStart > 120 && lastEnd > currentTime) {
      this.sourceBuffer.remove(firstStart, lastEnd - 10);
    }
  }
}
