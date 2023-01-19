export class Log {
    static #logEnabled: boolean

    static enableLog(): void {
        Log.#logEnabled = true
    }

    static disableLog(): void {
        Log.#logEnabled = false
    }

    static log(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.log(message, ...optionalParams)
        }
    }

    static logNamed(name: string, message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.log(name + " | " + message, ...optionalParams)
        }
    }

    static logError(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.error(message, ...optionalParams)
        }
    }

    static logWarning(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.warn(message, ...optionalParams)
        }
    }

    static logInfo(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.info(message,...optionalParams)
        }
    }

    static logDebug(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.debug(message, ...optionalParams)
        }
    }

    static logTrace(message: string, ...optionalParams: any[]): void {
        if(Log.#logEnabled) {
            console.trace(message)
        }
    }
}