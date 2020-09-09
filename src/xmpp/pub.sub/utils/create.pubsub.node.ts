import * as XMPP from 'stanza'
export async function createNode(ag: XMPP.Agent, pubsub: string, nodename: string) {
    await ag.createNode(pubsub, nodename,)
}
