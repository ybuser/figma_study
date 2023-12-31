import { PluginMessagePayload, Quote } from "../../shared";

export function requestToPlugin<T>(payload: T) {
    parent.postMessage({ pluginMessage: payload }, "*");
}

export function requestGenerateRandomQuoteToPlugin(randomQuote: Quote) {
    requestToPlugin<PluginMessagePayload>({
        type: "generateRandomQuote",
        randomQuote,
    });
}

export function requestImportAndCreateComponentInstance(componentKey: string) {
    requestToPlugin({
        type: "importAndCreateComponentInstance",
        componentKey
    });
}