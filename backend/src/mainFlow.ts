import checkForIntegration, {integrationResponseObject} from "./googleAiGen";

export const mainFlow = async (prompt: string)=> {
    const integrations: integrationResponseObject[] = await checkForIntegration(prompt);
    console.log(integrations);
    //check for empty obj


}