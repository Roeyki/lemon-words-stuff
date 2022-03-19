import dotenv from "dotenv";


class Config {
    public readonly ENSURE_IMMEDIATE_SAVING: boolean;
    public readonly PATH_TO_STORAGE_FOLDER: string;
    public readonly SESSION_STORAGE_FILE_NAME: string;


    constructor() {
        dotenv.config();
        this.PATH_TO_STORAGE_FOLDER = process.env.PATH_TO_STORAGE_FOLDER ? process.env.PATH_TO_STORAGE_FOLDER : "src/serverStorage";
        this.SESSION_STORAGE_FILE_NAME = process.env.SESSION_STORAGE_FILE_NAME ? process.env.SESSION_STORAGE_FILE_NAME : "statisticSession.txt";
        this.ENSURE_IMMEDIATE_SAVING = process.env.ENSURE_SESSION_SAVING
            ? (process.env.ENSURE_SESSION_SAVING.trim().toLowerCase() === "true") : false;


    }
}

export default new Config();
