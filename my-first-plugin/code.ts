// Define interfaces for the JSON structure
interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Fill {
  type: string;
  color: Color;
}

interface AbsoluteBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface FigmaNode {
  type: string;
  name: string;
  absoluteBoundingBox: AbsoluteBoundingBox;
  fills: Fill[];
}

interface FigmaJSON {
  document: {
    children: FigmaNode[];
  };
}

// This function transforms JSON fills to Figma Paints
function transformFillsToFigmaPaints(fills: Fill[]): Paint[] {
  return fills.map(fill => {
    if (fill.type === 'SOLID') {
      const figmaFill: SolidPaint = {
        type: 'SOLID',
        color: {
          r: fill.color.r,
          g: fill.color.g,
          b: fill.color.b
        },
        opacity: fill.color.a
      };
      return figmaFill;
    } else {
      // Handle other fill types if necessary
      return { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }; // Default fill
    }
  });
}


// This function creates Figma nodes from JSON data
function createFigmaNodesFromJSON(json: FigmaJSON) {
  console.log("in createFigmaNodes");
  const nodes: SceneNode[] = [];
  json.document.children.forEach(item => {
    let node: RectangleNode | TextNode | null = null;

    if (item.type === 'RECTANGLE') {
      node = figma.createRectangle();
      node.x = item.absoluteBoundingBox.x;
      node.y = item.absoluteBoundingBox.y;
      node.resize(item.absoluteBoundingBox.width, item.absoluteBoundingBox.height);
      node.fills = transformFillsToFigmaPaints(item.fills); // Transform fills
    }
    // Handle other node types here...

    if (node) {
      figma.currentPage.appendChild(node);
      nodes.push(node);
    }
  });
  return nodes;
}

// Handle messages from the UI
figma.ui.onmessage = msg => {
  console.log("Received message:", msg.type);

  if (msg.type === 'create-from-json') {
    console.log("Creating from JSON");

    // jsonData is already a JavaScript object, no need to parse
    const jsonData: FigmaJSON = msg.jsonData;

    // Create Figma nodes from JSON data
    const nodes = createFigmaNodesFromJSON(jsonData);

    // Select and focus on the created nodes
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Close the plugin
  figma.closePlugin();
};

// Show the UI
figma.showUI(__html__, { width: 240, height: 180 });
