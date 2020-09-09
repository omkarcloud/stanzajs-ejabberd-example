import { environment } from '../env'
import * as _ from "lodash"
import { plugin } from './utils/pub.sub.plugin'
import { createNode } from './utils/create.pubsub.node'
import { subscribe, listenForPublishEvents, publishToNode, } from './utils/pub.sub.helpers'
import { onStartedSession, createClientAndConnect } from "../xmpp.helper"
import { wait, timer600 } from '../../utils/async.utils'


export async function pubsubExample() {
    onStartedSession(async (ag) => {
        // Random node name 
        const nodename = _.random(1000000).toString()
        const pubsub = environment.pubSubService

        await createNode(ag, pubsub, nodename)

        listenMultipleForPublishEvents(nodename)
        // Wait for listenMultipleForPublishEvents to intialize pubslidhers and subscribers
        await timer600()

        await publishToNode(ag, pubsub, nodename, 'I am very happy.')

    }, createClientAndConnect('albus'))
}


function listenMultipleForPublishEvents(nodename: string) {
    ['harry', 'hermione'].map(a => {
        onStartedSession(async (ag) => {
            await subscribe(ag, nodename)
            listenForPublishEvents(ag)
        }, createClientAndConnect(a,))
    })
}