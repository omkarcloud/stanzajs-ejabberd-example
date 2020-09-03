import { environment } from '../env'
import * as _ from "lodash"
import { plugin } from './utils/pub.sub.plugin'
import { createNode } from './utils/create.pubsub.node'
import { subscribe, listenForPublishEvents, publishToNode, getNodeSubscribers } from './utils/pub.sub.helpers'
import { onStartedSession, createClientAndConnect } from "../xmpp.helper"
import { wait, timer600 } from '../../utils/async.utils'


export async function pubsubExample() {
    onStartedSession(async (ag) => {
        // Use Pubsub Plugin necessary
        ag.use(plugin)
        const nodename = _.random(1000000).toString()
        const pubsub = environment.pubSubService

        await createNode(ag, pubsub, nodename)

        //  Let publisher subscribe to his node too
        await subscribe(ag, nodename)
        listenForPublishEvents(ag)

        listenMultipleForPublishEvents(nodename)
        // Wait for listenMultipleForPublishEvents to intialize clients
        await timer600()

        await publishToNode(ag, pubsub, nodename, 'I am very happy.')

        // Get the settings applied to node when it is created
        const defaultNodeConfig = await ag.getDefaultNodeConfig(pubsub)

        console.log({
            defaultPublisherModel: defaultNodeConfig.fields![13],
            currentPublisherModel: (await ag.getNodeConfig(pubsub, nodename)).fields![13]
        })
        console.log({
            nodename,
            // Configuration of a particular Node
            nodeConfig: await ag.getNodeConfig(pubsub, nodename),
            subs: await
                getNodeSubscribers(ag, nodename),
            disco: await ag.getDiscoItems(),
            defaultConfig: defaultNodeConfig,
        })

    }, createClientAndConnect('hari'))
}


function listenMultipleForPublishEvents(nodename: string) {
    ['albus', 'hermione'].map(a => {
        onStartedSession(async (ag) => {
            await subscribe(ag, nodename)
            listenForPublishEvents(ag)
        }, createClientAndConnect(a, false))
    })
}