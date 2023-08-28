figma.showUI(__html__);

const fontName = { family: 'Roboto', style: 'Regular' };

const 바꿔로바꿔 = () => {
    return '바꿔';
};

const 바꾸지마로바꿔 = () => {
    return '바꾸지마';
};
  
figma.ui.onmessage = async (payload: string) => {
    await figma.loadFontAsync(fontName);

    if (payload === '바꿔') {
        const { selection } = figma.currentPage;

        selection.forEach((node) => {
            if (node.type === 'TEXT') {
            const translateText = 바꿔로바꿔();
            node.characters = translateText;
            }
        });
    }

    if (payload === '바꾸지마') {
        const { selection } = figma.currentPage;

        selection.forEach((node) => {
            if (node.type === 'TEXT') {
            const translateText = 바꾸지마로바꿔();
            node.characters = translateText;
            }
        });
    }
};