import * as XMPP from 'stanza'
export async function createNode(ag: XMPP.Agent, pubsub: string, nodename: string) {
    try {
        await ag.createNode(pubsub, nodename,
            // This configuration instructs that subscribes can also publish to nodes by default 
            // it is allowed to publishers only to learn more about is visit https://xmpp.org/extensions/xep-0060.html 
            // It is quite a big document but after reading it you will be an expert in pubsub.  
            {
                fields: [
                    {
                        type: 'list-single',
                        name: 'pubsub#publish_model',
                        // Available options subscribers, open, publishers
                        value: 'subscribers'
                    },
                ],
                type: 'form'
            })
    }
    catch (error) {
        // Supress Node already exists error
        if (error.error.text === 'Node already exists') {
        }
        else
            throw error
    }

}
