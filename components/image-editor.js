import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
const FileSaver = require('file-saver');

const CustomImageEditor = () => {
    return (
      <ImageEditor
        includeUI={{
          loadImage: {
            path: "img/sampleImage.jpg",
            name: "SampleImage",
          },
          menu: ["shape", "filter", "text", 'mask', 'icon', 'draw', 'crop', 'flip', 'rotate'],
          initMenu: "filter",
          uiSize: {
            width: "90%",
            height: "800px",
          },
          menuBarPosition: "bottom",
        }}
        cssMaxHeight={2000}
        cssMaxWidth={1000}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={true}
      />
    );
  };
  
  export default CustomImageEditor;