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
        return

        /**
         * It is really unfortunate that we only recieve the msg.id and not the content with the item although publisher recieves the content payload.
         * Attempts were made to get the content payload but in vain
         * In case you were succesfull with getting the content.
         * Please make a pull request with the code.
         * Due credit will be given to you 
         * BUT more than that you will help number of developers. :)
         *  
         * Helpful Notes:
         * For sure we are recieving the item in <stuff></stuff> (You could enable logging to see it (xmmp.helper.createClient)) 
         * Not sure but might be the problem is in pub.sub.plugin  
         */

        const { node, published } = msg.pubsub.items


        // Extract our content. Unfortunately, we have to assert the type here.
        const data = published[0]!.content as MyPubSubContent

        // Throws item not found for unknown reason
        console.log(data)
    })
}
export function publishToNode(ag: XMPP.Agent, pubsub: string, nodename: string, value: any) {
    return ag.publish(pubsub, nodename, {
        itemType: NS_MY_PUBSUB,

        value
    })
}
// Only publisher could access it 
export async function getNodeSubscribers(ag: Agent, nodename: string, pubsub = environment.pubSubService) {
    const subs = await ag.getNodeSubscribers(pubsub, nodename)
    return subs.pubsub!.subscriptions
}
