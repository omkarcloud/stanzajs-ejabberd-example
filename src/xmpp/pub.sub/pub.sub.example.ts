import { environment } from '../env'
import * as _ from "lodash"
import { createClientAndConnect, onStartedSession } from '../xmpp.helper'
import { createNode } from './utils/create.pubsub.node'
import { subscribe, listenForPublishEvents, publishToNode } from './utils/pub.sub.helpers'
import { timer600, wait } from '../../utils/async.utils'


export async function pubsubExample() {
    console.log('Hellos')
    const pubsub = environment.pubSubService

    // create a publisher albus 
    onStartedSession(async (ag) => {
        // create a node 
        const nodename = _.random(100000).toString()
        await createNode(ag, pubsub, nodename)
        // create some subscribers
        listenMultipleUsersForPublishEvents(nodename)
        await wait(1000)
        // albus publishes to the node
        await publishToNode(ag, nodename, pubsub, 'Albus is really happinrss.')
    }, createClientAndConnect('albus'))

}

function listenMultipleUsersForPublishEvents(nodename: string) {
    ['harry', 'hermione'].map(a => {
        onStartedSession(async (ag) => {
            await subscribe(ag, nodename, environment.pubSubService)
            listenForPublishEvents(ag)
        }, createClientAndConnect(a))
    })
}