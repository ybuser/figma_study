export type Quote = {
    author: string | null;
    text: string;
};

export type PluginAction = "generateRandomQuote" | "importAndCreateComponentInstance";

export type PluginMessagePayload = {
    type: PluginAction;
    randomQuote?: Quote;
    componentKey?: string;
};

export type PluginCallbackFunction<T = void> = (
    payload: PluginMessagePayload
) => T;