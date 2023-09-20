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

async function importAndCreateComponentInstance(payload: PluginMessagePayload) {
    if (payload.componentKey) { 
        const component = await figma.importComponentByKeyAsync(payload.componentKey);
        const instance = component.createInstance();
        figma.currentPage.appendChild(instance);
        instance.x = figma.viewport.center.x;
        instance.y = figma.viewport.center.y;
    }
}

loadFonts().then(() => {
    figma.ui.onmessage = (payload: unknown) => {
        const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
            generateRandomQuote,
            importAndCreateComponentInstance
        };
    
        if (isPayload(payload) && callbackMap[payload.type]) {
            callbackMap[payload.type](payload);
        }
    }
});
