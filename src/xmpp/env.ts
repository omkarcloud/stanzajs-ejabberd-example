export const transports = {
    bosh: false,
    // use wss in production 
    websocket: 'ws://localhost:5443/ws'
}

export const environment = {
    base: "http://localhost:5443/api/",
    host: "localhost",
    pubSubService: 'pubsub.localhost',
    pubUrl: 'http://localhost:5443/protocol/pubsub'
}