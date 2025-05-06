import express from 'express';
import dotenv from "dotenv";
import { Request, Response } from 'express';
import checkForIntegration from "./googleAiGen";
import {getAppComponents, getAppData, getApps, searchApp} from "./pipedreamFunctions";
import {mainFlow} from "./mainFlow";
var cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || '3000';

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
})

app.get("/getPipedreamApps", async (req: Request, res: Response) => {
    const data = await getApps();
    res.status(200).send(data);
})

app.post("/checkIntegrationOld", async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.prompt) {
        res.status(400).send("missing prompt");
        return;
    }
    const llmResponse = await checkForIntegration(data.prompt);
    res.status(200).send(llmResponse);
});

app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    throw new Error (error.message);
});

app.get("/searchPipedreamApp", async (req: Request, res: Response) => {
    const data = await searchApp("Slack");
    res.status(200).send(data); //maybe useful
})

app.get("/getAppData", async (req: Request, res: Response) => {
    const data = await getAppData("app_OkrhR1");
    res.status(200).send(data); //useful in feature, this endpoint gets the auth type, description, and image link
})

app.get("/getAppComponents", async (req: Request, res: Response) => {
    const data = await getAppComponents("slack", "message"); //https://pipedream.com/docs/rest-api/#create-a-component pipedream docs say they use AI to match message to components
    res.status(200).send(data);
})

app.post("/checkIntegration", async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.prompt) {
        res.status(400).send("missing prompt");
        return;
    }
    const llmResponse = await mainFlow(data.prompt);
    res.status(200).send(llmResponse);
});