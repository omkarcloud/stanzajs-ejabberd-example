import * as XMPP from 'stanza'
import { Agent } from 'stanza'
import { environment } from '../../env'
import { NS_MY_PUBSUB, MyPubSubContent } from './pub.sub.plugin'
import { beautify } from '../../../utils/log'
export async function subscribe(ag: Agent, nodename: string, pubsub = environment.pubSubService) {
    await ag.subscribeToNode(pubsub, {
        node: nodename,
        // Doing this disallows duplicate JID in subscribers
        jid: ag.config!.jid
    })
    return ag
}
/* 
 *   Called when a subscriber recieves a new item
*/
export function listenForPublishEvents(ag: XMPP.Agent) {

    ag.on('pubsub:published', async (msg,) => {
        const jid = ag.config.jid as string
        console.log(`${jid} recieved ${beautify(msg.pubsub)}`)
    })
}
export function publishToNode(ag: XMPP.Agent, pubsub: string, nodename: string, value: any) {
    return ag.publish(pubsub, nodename, {
        itemType: NS_MY_PUBSUB,

        value
    })
}