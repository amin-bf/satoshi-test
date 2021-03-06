import nats, { Stan } from "node-nats-streaming"

class NatsWrapper {
  private _client?: Stan

  get client() {
    if (!this._client)
      throw new Error("Can not access client before connecting.")

    return this._client
  }

  connect(clusterId: string, clientId: string, url: string): Promise<boolean> {
    this._client = nats.connect(clusterId, clientId, { url })

    return new Promise((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to Nats!")
        resolve(true)
      })

      this.client.on("error", err => {
        console.log(err)

        reject(false)
      })
    })
  }
}

export const natsWrapper = new NatsWrapper()
