import externalSourcer from './ExternalSourcer';
import config from '../config/config';

/*
* - - - - - - - - - - - - - - - - - - - - - - - - -
*  A class meant for keep tracking on the
*  statistic data, The class is merely a wrap for
*  a logical encapsulation of the statistic's
*  logic, as the main DM 'wordCounter' is static.
* - - - - - - - - - - - - - - - - - - - - - - - - -
* */
export class Statistics {
    static readonly pathToSessionStorageFile = `./${config.PATH_TO_STORAGE_FOLDER}/${config.SESSION_STORAGE_FILE_NAME}`;

    private static wordCounter: Map<string, number> = new Map<string, number>();

    constructor() {
    }

    static getWordAppearanceCount(word: string): number {
        const wordCount = Statistics.wordCounter.get(word);
        console.log(`Retrieved The count for the word ${word}, The count is  ${wordCount ? wordCount : 0 } `)
        return wordCount ? wordCount : 0;
    }

    private static incrementWordCount(word: string) {
        const currentWordCount: number | undefined = Statistics.wordCounter.get(word);
        Statistics.wordCounter.set(word, currentWordCount ? currentWordCount + 1 : 1);
    }

    static processTextChunkAndCountWords(chunk: string) {
        const increment = Statistics.incrementWordCount;
        const cleanedText: string = chunk.trim().replace(/[^a-zA-Z ]/g, "");
        cleanedText.split(" ").forEach((word) => {
            if (word?.length > 0) {
                increment(word.toLowerCase())
            }
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    *  Functions responsible for maintaining a
    *  - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    * */
    static async saveSessionToLocalStorage(): Promise<void> {
        try {
            const counterAsString: string = JSON.stringify([...Statistics.wordCounter]);
            await externalSourcer.WriteTextToFile(Statistics.pathToSessionStorageFile, counterAsString);
            console.log("Completed Saving the session to local storage")
        } catch (e) {
            console.error(`There has been an error processing the session's saving to local storage, error ${e.message}`);
        }
    }

    static async loadPrevSessionsFromLocalStorage(): Promise<void> {
        try {
            const counterAsString: string | undefined = await externalSourcer.retrieveTextFromFile(Statistics.pathToSessionStorageFile);
            if (counterAsString?.length > 0) {
                Statistics.wordCounter = new Map<string, number>(JSON.parse(counterAsString));
                console.info("Word counter was initialized with previews sessions' data");
            }
        } catch (e) {
            console.error("Corrupt or missing previews session file, initializing the word counter as blank", e.message);
        }
    }
}
