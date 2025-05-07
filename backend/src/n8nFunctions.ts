import axios from "axios";

interface newWorkflow {
    name: string;
    nodes: node[];
    connections: {
        Webhook: { //technically it doesn't have to be webhook, but we'll always want webhook to be starting
            main: {node: string, type: string, index: number}[]
        },
        //Stripe: { main: {node: "Respond to Webhook", type: "main", index: 0}[] }
    };
    settings: { //let's assume settings will not change at all
        "saveExecutionProgress": true;
        "saveManualExecutions": true;
        "saveDataErrorExecution": "all";
        "saveDataSuccessExecution": "all";
        "executionTimeout": 3600;
        "errorWorkflow": "VzqKEW0ShTXA5vPj";
        "timezone": "America/New_York";
        "executionOrder": "v1";
    }
}
interface node {
    id: string; //missing some, but they don't seem necessary to implement rn
    name: string;
    webhookId: string;
    type: string;
    typeVersion: string;
    position: number[];
}


export const createWorkflow = async (name: string, integrationType: string, integrationName: string) => {
    const workflowPayload = {
        "name": name,
            "nodes": [
            {
                "parameters": {
                    "path": "6b530c27-045b-4d93-86d8-01f5c572ff97",
                    "responseMode": "responseNode",
                    "options": {}
                },
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2,
                "position": [
                    -200,
                    0
                ],
                "id": "de729a44-36d8-4f26-9c44-4e707ef7b05f",
                "name": "Webhook",
                "webhookId": "6b530c27-045b-4d93-86d8-01f5c572ff97",
                "notesInFlow": false
            },
            {
                "parameters": {
                    //here is where it determines which action of the app to use
                    //so far, the only way I could find to get the data is by creating it in the UI, then downloading the json
                    //it'll be cooked to try to do this for everything
                },
                "type": integrationType, //ex: "n8n-nodes-base.stripe"
                "typeVersion": 1,
                "position": [
                    240,
                    0
                ],
                //"id": 'integrationId', //ex: "4814c3c0-0b72-470b-af10-f7ee182432ba" //doesn't matter
                "name": integrationName, //ex: "Stripe"
                "alwaysOutputData": true,
                /*"credentials": {
                    "stripeApi": {
                        "id": "rGNs0dOhvLw4iIwN",
                        "name": "Stripe account"
                    }
                }*/
            },
            {
                "parameters": {
                    "options": {}
                },
                "type": "n8n-nodes-base.respondToWebhook",
                "typeVersion": 1.2,
                "position": [
                    -500,
                    0
                ],
                "id": "ed386bea-8c12-4eaf-b555-16e468622c1d",
                "name": "Respond to Webhook",
                "alwaysOutputData": true
            }
        ],
            "connections": {
            "Webhook": {
                "main": [
                    [
                        {
                            "node": integrationName,
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            [integrationName]: {
                "main": [
                    [
                        {
                            "node": "Respond to Webhook",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            }
        },
        "settings": {
            "saveExecutionProgress": true,
                "saveManualExecutions": true,
                "saveDataErrorExecution": "all",
                "saveDataSuccessExecution": "all",
                "executionTimeout": 3600,
                "errorWorkflow": "VzqKEW0ShTXA5vPj",
                "timezone": "America/New_York",
                "executionOrder": "v1"
        }
    }
    const data = await axios.post(`${process.env.N8N_URL}/workflows`, workflowPayload,
        {headers: {
            "Content-Type": "application/json",
            "X-N8N-API-KEY": process.env.N8N_API_KEY,
        }}
    );

    console.log(data.data);
    return data.data;
}