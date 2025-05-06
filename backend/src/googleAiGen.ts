import {
    GoogleGenAI,
    Type,
} from '@google/genai';



export interface integrationResponseObject {
    integrationType: string,
    descriptionOfIntegration: string | null,
}

export default async function checkForIntegration(prompt: string) : Promise<integrationResponseObject[]> {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const config = {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                requestedIntegrations: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        required: ["integrationType"],
                        properties: {
                            integrationType: {
                                type: Type.STRING,
                                enum: ["Stripe", "Hubspot", "Slack"],
                            },
                            descriptionOfIntegration: {
                                type: Type.STRING,
                            },
                        },
                    },
                },
            },
        },
        systemInstruction: [
            {
                text: `The user who's message you are seeing is currently on a website that generates code based on their input. You, the service, offer several integrations. There is a chance the user mentions an integration. You must respond with the integration they want. However, you must **NOT** pick a requested integration if it is not directly mentioned. If several are mentioned, create an object for each one.`,
            }
        ],
    };
    const model = 'gemini-2.5-flash-preview-04-17';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: prompt,
                },
            ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    /*for await (const chunk of response) {
        console.log("chunk",chunk.text);
    }*/
    //console.log('response.text', response.text);
    const parsedData = JSON.parse(response.text || "{requestedIntegrations: []}");
    console.log(parsedData);
    return parsedData;
}
