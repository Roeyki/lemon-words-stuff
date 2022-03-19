import {ServerStatus, ServerStatusCode, TextOriginTypes} from "../shared/Enums";
import config from "../config/config";
import externalSourcer from "../model/ExternalSourcer";
import {Statistics} from "../model/Statistics";

const serverStatus = ServerStatus.uninitialized;

const serverBootUp = async () => {
    console.log(`Server initializing`)
    await Statistics.loadPrevSessionsFromLocalStorage();
    console.log(`Server initiated successfully`)
    Facade.status = ServerStatus.upAndRunning;
}

const parseAndCount = async (req: any, res: any) => {
    try {
        const {origin, content} = req.body;
        const ProcessTimeLabel : string = `Request originated in ${new Date().toISOString()} (ISO format) has done processing, the time taken `;
        console.time(ProcessTimeLabel);
        switch (origin) {
            case TextOriginTypes.text:
                console.log(`Received plain text, processing...`)
                Statistics.processTextChunkAndCountWords(content)
                break;
            case TextOriginTypes.file:
                console.log(`Received a file request, processing...`)
                const isReadOk : boolean = await externalSourcer.performActionOnLargeFile(content, Statistics.processTextChunkAndCountWords);
                if(!isReadOk){
                    res.status(ServerStatusCode.INVALID_INPUT).json("Invalid input");
                    return;
                }
                break;
            case TextOriginTypes.url:
                console.log(`Received a url request, processing...`)
                const urlText = await externalSourcer.retrieveTextFromUrl(content);
                Statistics.processTextChunkAndCountWords(urlText);
                break;
            default :
                Statistics.processTextChunkAndCountWords(content);
        }
        console.timeEnd(ProcessTimeLabel);


        console.log(`Saving data to local storage`);
        if (config.ENSURE_IMMEDIATE_SAVING) {
            await Statistics.saveSessionToLocalStorage();
        } else {
            // will happen async to the server's process. not a crucial task, and this is time & resources saving
            Statistics.saveSessionToLocalStorage();
        }
        res.status(ServerStatusCode.SUCCESS).json("Done");
    } catch (e) {
        res.status(ServerStatusCode.INVALID_INPUT).json("Invalid input");
    }
}

const queryWordCount = (req: any, res: any) => {
    const count = Statistics.getWordAppearanceCount(req?.query?.word?.toLowerCase());
    res.status(ServerStatusCode.SUCCESS).json(count);
}

export const Facade = {
    boot: serverBootUp,
    parseAndCount,
    query: queryWordCount,
    status: serverStatus
}
