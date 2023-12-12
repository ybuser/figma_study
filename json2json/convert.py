import json
import os

def load_legends():
    with open('./legends/component_legend.json', 'r') as file:
        component_legend = json.load(file)
    with open('./legends/icon_legend.json', 'r') as file:
        icon_legend = json.load(file)
    with open('./legends/textButton_legend.json', 'r') as file:
        textbutton_legend = json.load(file)
    return component_legend, icon_legend, textbutton_legend

def convert_ui_json_to_figma(ui_json, component_legend, icon_legend, textbutton_legend):
    figma_nodes = []

    for component in ui_json[0].split(" | "):
        if component.startswith("START") or component.startswith("END"):
            continue

        parts = component.split(" ")
        component_type, x, y, width, height = parts[0], int(parts[1]), int(parts[2]), int(parts[3]), int(parts[4])

        # Selecting the right color legend based on component type
        if component_type in component_legend:
            color = component_legend[component_type]["rgb"]
        elif component_type in icon_legend:
            color = icon_legend[component_type]["rgb"]
        elif component_type in textbutton_legend:
            color = textbutton_legend[component_type]["rgb"]
        else:
            color = [255, 255, 255]  # Default to white if not found

        # Normalize RGB values
        color = [c / 255 for c in color]

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
                    "color": {"r": color[0], "g": color[1], "b": color[2], "a": 1}
                }
            ],
            "strokes": [],
            "strokeWeight": 1,
            "strokeAlign": "INSIDE",
            "effects": []
        }

        figma_nodes.append(figma_node)

    return {
        "document": {"children": figma_nodes},
        "components": {},
        "schemaVersion": 0,
        "styles": {}
    }


def read_ui_json_from_file(file_path):
    with open(file_path, 'r') as file:
        ui_json = json.load(file)
    return ui_json

def write_figma_json_to_file(figma_json, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w') as file:
        json.dump(figma_json, file, indent=4)
        
        
def main():
    input_file_path = 'test_uijson.json'
    output_file_path = './figmajson_output/converted_figma_json.json'

    component_legend, icon_legend, textbutton_legend = load_legends()

    ui_json = read_ui_json_from_file(input_file_path)
    figma_json = convert_ui_json_to_figma(ui_json, component_legend, icon_legend, textbutton_legend)

    write_figma_json_to_file(figma_json, output_file_path)

if __name__ == "__main__":
    main()

# # Example UI JSON
# ui_json_example = ["START Background_Image 0 13 127 109 | Icon 0 4 17 13 | Icon 74 109 84 115 | Image 112 4 127 13 | Image 42 109 52 115 | List_Item 0 13 127 109 | Text 22 6 112 11 | Text 44 115 50 118 | Text 75 115 83 118 | Text_Button 0 109 31 118 | Text_Button 95 109 127 118 | Toolbar 0 4 127 13 END PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD PAD"]

# # Convert UI JSON to Figma JSON
# convert_ui_json_to_figma(ui_json_example)
