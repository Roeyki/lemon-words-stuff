export enum ServerStatusCode {
    "SUCCESS" = 200,
    "INVALID_INPUT" = 400,
    "SERVER_UNINITIALIZED" = 503
}

export enum TextOriginTypes {
    url = "url",
    file = "file",
    text = "text"
}

export enum ServerStatus {
    uninitialized = "uninitialized",
    upAndRunning = "upAndRunning",
}
