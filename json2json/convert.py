def convert_ui_json_to_figma(ui_json):
    # Define colors for each component
    colors = {
        "Advertisement": {"r": 1, "g": 0.65, "b": 0, "a": 1},  # Orange
        "Icon": {"r": 0.5, "g": 0.5, "b": 0.5, "a": 1},  # Grey
        "Image": {"r": 1, "g": 0.2, "b": 0.6, "a": 1},  # Pink
        "Text_Button": {"r": 0, "g": 0, "b": 1, "a": 1},  # Blue
        "Toolbar": {"r": 0.1, "g": 0.1, "b": 0.1, "a": 1},  # Dark
        "Web_View": {"r": 0.4, "g": 0.8, "b": 0.4, "a": 1},  # Green
        "Background_Image": {"r": 0.8, "g": 0.8, "b": 0.8, "a": 1},  # Light grey
        "List_Item": {"r": 0.8, "g": 0.5, "b": 0.2, "a": 1},  # Brown
        "Text": {"r": 0, "g": 0.5, "b": 0.5, "a": 1},  # Teal
    }

    # Splitting the input string and processing each component
    components = ui_json[0].split(" | ")
    figma_nodes = []

    for component in components:
        if component.startswith("START") or component.startswith("END"):
            continue  # Skip start and end markers

        parts = component.split(" ")
        component_type, x, y, width, height = parts[0], int(parts[1]), int(parts[2]), int(parts[3]), int(parts[4])

        # Create a Figma node for each component
        figma_node = {
            "type": "RECTANGLE",
            "name": component_type,
            "blendMode": "PASS_THROUGH",
            "absoluteBoundingBox": {
                "x": x,
                "y": y,
                "width": width,
                "height": height
            },
            "fills": [
                {
                    "type": "SOLID",
                    "color": colors.get(component_type, {"r": 1, "g": 1, "b": 1, "a": 1})  # Default to white if not found
                }
            ],
            "strokes": [],
            "strokeWeight": 1,
            "strokeAlign": "INSIDE",
            "effects": []
        }

        figma_nodes.append(figma_node)

    # Constructing the final Figma JSON
    figma_json = {
        "document": {
            "children": figma_nodes
        },
        "components": {},
        "schemaVersion": 0,
        "styles": {}
    }

    return figma_json

# Example UI JSON
ui_json_example = ["START Background_Image 0 13 127 109 | Icon 0 4 17 13 | Icon 74 109 84 115 | Image 112 4 127 13 | Image 42 109 52 115 | List_Item 0 13 127 109 | Text 22 6 112 11 | Text 44 115 50 118 | Text 75 115 83 118 | Text_Button 0 109 31 118 | Text_Button 95 109 127 118 | Toolbar 0 4 127 13 END PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD"]

# Convert UI JSON to Figma JSON
convert_ui_json_to_figma(ui_json_example)
