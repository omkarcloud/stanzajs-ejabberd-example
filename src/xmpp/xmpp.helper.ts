import * as XMPP from 'stanza'
import { Agent, } from 'stanza'
import { environment, transports } from './env'
import { plugin } from './pub.sub/utils/pub.sub.plugin'
export function createClientAndConnect(clientname: string) {
    const config = {
        jid: `${clientname}@${environment.host}`,
        password: clientname,
        transports: transports,
        allowResumption: false
    }

    const client = XMPP.createClient(config)

    client.connect()
    return client
}



export function onStartedSession(params: (ag: Agent) => any, ag: Agent) {
    ag.on('session:started', async () => {
        ag.sendPresence()
        // ONly is using pubsub
        ag.use(plugin)
        params(ag)
    })
    return ag
}