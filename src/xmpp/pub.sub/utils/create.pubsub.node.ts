import { Agent } from 'stanza'

export async function createNode(ag: Agent, pubsub: string, nodename: string) {
    await ag.createNode(pubsub, nodename)
}