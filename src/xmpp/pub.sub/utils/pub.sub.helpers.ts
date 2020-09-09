import { Agent } from 'stanza'
import { beautify } from '../../../utils/log'
import { NS_MY_PUBSUB } from './pub.sub.plugin'

export function listenForPublishEvents(ag: Agent) {
    ag.on('pubsub:published', (item) => {
        const jid = ag.config.jid as string
        console.log(`${jid} recieved ${beautify(item.pubsub)}`)
    })
}


export async function subscribe(ag: Agent, nodename: string, pubsub: string) {
    await ag.subscribeToNode(pubsub, {
        jid: ag.config!.jid,
        node: nodename
    })
}


export async function publishToNode(ag: Agent, nodename: string, pubsub: string, item: string) {
    return await ag.publish(pubsub, nodename, {
        itemType: NS_MY_PUBSUB,
        value: item
    })
}