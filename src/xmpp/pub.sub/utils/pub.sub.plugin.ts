import { Agent } from 'stanza'
import { JXT } from 'stanza'
import { environment } from '../../env'

// References: https://github.com/legastero/stanza/blob/master/docs/Using_PubSub.md
export const NS_MY_PUBSUB = environment.pubSubService
export interface MyPubSubContent {
    // The itemType field is what is used to distinguish pubsub
    // item content types. It MUST be present when exporting,
    // but we're going to mark it as optional to be easier to
    // work with.
    itemType?: typeof NS_MY_PUBSUB
    value: string
}

export function plugin(client: Agent, stanzas: JXT.Registry) {
    stanzas.define({
        // Inject our definition into all pubsub item content slots.
        // These slots are already registered with `itemType` as the
        // type field.
        aliases: JXT.pubsubItemContentAliases(),
        element: 'stuff',

        fields: {
            value: JXT.text()
        },
        namespace: NS_MY_PUBSUB,
        // Specify the `itemType` value for our content.
        type: NS_MY_PUBSUB
    })
}
