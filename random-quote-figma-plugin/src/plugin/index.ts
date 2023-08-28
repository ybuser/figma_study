import { PluginMessagePayload, PluginCallbackFunction, PluginAction } from "../shared";

figma.showUI(__html__);

function isPayload(payload: unknown): payload is PluginMessagePayload {
    return (
        typeof payload === "object" && 
        Object.prototype.hasOwnProperty.call(payload, "type") 
        // && Object.prototype.hasOwnProperty.call(payload, "randomQuote")
    );
}

async function loadFonts() {
    await figma.loadFontAsync({
        family: "Roboto",
        style: "Regular",
    });
}

function generateRandomQuote({ randomQuote }: PluginMessagePayload) {
    const currentSelectionNode = figma.currentPage.selection[0];
    // 텍스트 노드라면 인용문으로 대체
    console.log("HI");
    console.log(figma.currentPage.selection);
    if (currentSelectionNode?.type === "TEXT") {
        currentSelectionNode.fontName = {
            family: "Roboto",
            style: "Regular",
        };
        currentSelectionNode.characters = `${randomQuote.text} - ${randomQuote.author || "Unknown"}`;
    } else {
        throw new Error("No text node is selected");
    }
}

async function fetchFromTeamLibrary() {
    console.log("in fetchfromteamlibrary");
    try {
        const libraryCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
        console.log(figma.teamLibrary);
        console.log("library colleciton is ", libraryCollections);
        const allVariables = [];
        for (const collection of libraryCollections) {
            console.log("In for loop");
            const variables = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(collection.key);
            allVariables.push({
                collectionName: collection.name,
                variables
            });
        }
        figma.ui.postMessage({ type: 'collections-list', data: allVariables });
    } catch (error) {
        console.error("Error fetching library collections:", error);
    }
}

loadFonts().then(() => {
    figma.ui.onmessage = (payload: unknown) => {
        const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
            generateRandomQuote,
            fetchFromTeamLibrary
        };
    
        if (isPayload(payload) && callbackMap[payload.type]) {
            callbackMap[payload.type](payload);
        }
    }
});
