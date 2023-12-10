figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'modify-component') {
        // Step 1: Retrieve the selected component
        const selectedNodes = figma.currentPage.selection;
        if (selectedNodes.length === 0) {
            figma.notify('Please select a component');
            return;
        }
        
        const component = selectedNodes[0];

        // Step 2: Modify the component
        // const modifiedComponentData = await modifyComponentWithAI(component);


        // Step 3: Place the modified component back into the Figma file
        const newComponent = figma.createRectangle();
        newComponent.x = component.x;
        newComponent.y = component.y;
        newComponent.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];

        figma.currentPage.appendChild(newComponent);
        figma.notify('Component modified');
    }

    if (msg.type === 'modify-square') {
        const selection = figma.currentPage.selection;

        // Check if something is selected
        if (selection.length === 0) {
            figma.notify("No object selected");
            return;
        }

        const selectedNode = selection[0];

        // Check if the selected object is a rectangle (square)
        if (selectedNode.type === 'RECTANGLE') {
            // Change the position
            selectedNode.x += 100; // Move 100 units to the right
            selectedNode.y += 100; // Move 100 units down

            // Change the color
            selectedNode.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }]; // Red color

            figma.notify("Square modified");
        } else {
            figma.notify("Selected object is not a square");
        }
    }
};

