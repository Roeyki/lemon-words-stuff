import axios, {AxiosResponse} from "axios";
import fs, {createReadStream} from "fs";
import {promisify} from "util";
import es from "event-stream";
import * as Buffer from "buffer";

/*
* - - - - - - - - - - - - - - - - - - - - - -
*  An helper class meant for dealing with
*  external sources such as files and urls.
* - - - - - - - - - - - - - - - - - - - - - -
* */
class ExternalSourcer {

    // Promisifications of the async read/write methods
    private fileReadPromise = promisify(fs.readFile);
    private fileWritePromise = promisify(fs.writeFile);
    private longFileReadPromise = async (filePath: string, lineCallback: (words: string) => void): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try{
                createReadStream(filePath)
                    .on('error', (e)=>{
                        console.log(`File path : ${filePath} produced an error - ${e.message}`)
                        reject(e)}
                    )
                    .pipe(es.split())
                    .on('data', lineCallback)
                    .on('end', (e) => {
                        if (e) {
                            reject(e)
                        } else {
                            resolve(true);
                        }
                    })
            } catch (e){
                reject(e);
            }
        })
    }

    constructor() {
    }

    async retrieveTextFromUrl(url: string): Promise<string | undefined> {
        try {
            const response: AxiosResponse<string> = await axios.get(url);
            return response.data;
        } catch (e) {
            console.log(`Url text retrieval has returned unsuccessfully, error - ${e.message}`);
            return undefined;
        }
    }

    private readFile(filePath: string): Promise<Buffer> {
        return this.fileReadPromise(filePath)
    }

    async retrieveTextFromFile(filePath: string): Promise<string | undefined> {
        try {
            const textFromFileAsBuffer: Buffer = await this.readFile(filePath);
            return textFromFileAsBuffer.toString();
        } catch (e) {
            console.error(e.message);
            return undefined;
        }
    }

    async performActionOnLargeFile(filePath: string, lineCallback: (word: string) => void): Promise<boolean> {
        try {
            await this.longFileReadPromise(filePath, lineCallback);
            return true;
        } catch (e) {
            return false;
        }
    }

    async WriteTextToFile(filePath: string, text: string): Promise<void> {
        try {
            await this.fileWritePromise(filePath, text);
        } catch (e) {
            console.error(e.message);
            return undefined;
        }
    }
}

export default new ExternalSourcer();
