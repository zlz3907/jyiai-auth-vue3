interface BridgeMessage {
  type: string
  data?: any
}

interface BridgeCallback {
  (data: any): void
}

class Bridge {
  private callbacks: Map<string, BridgeCallback>
  private isReady: boolean

  constructor() {
    this.callbacks = new Map()
    this.isReady = false
    this.init()
  }

  private init(): void {
    // 初始化桥接
    window.addEventListener('message', this.handleMessage.bind(this))
    // 通知原生应用 Web 已准备就绪
    this.postMessage({ type: 'webReady' })
  }

  private handleMessage(event: MessageEvent): void {
    const { type, data } = event.data as BridgeMessage
    const callback = this.callbacks.get(type)
    if (callback) {
      callback(data)
    }
  }

  postMessage(message: BridgeMessage): void {
    // 发送消息到原生应用
    window.parent.postMessage(message, '*')
  }

  on(type: string, callback: BridgeCallback): void {
    this.callbacks.set(type, callback)
  }

  off(type: string): void {
    this.callbacks.delete(type)
  }
}

export default new Bridge() 