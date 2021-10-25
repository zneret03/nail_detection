import {
    Bacteria,
    Add,
    Close,
    ImageUpload,
    ImageDetection,
    Classification,
    Reset,
    Exit,
} from "./";

export default function Icon({ name, width, height, fill }) {
    switch (name) {
        case "Add":
            return <Add width={width} height={height} fill={fill} />;
        case "Close":
            return <Close width={width} height={height} fill={fill} />;
        case "ImageUpload":
            return <ImageUpload width={width} height={height} fill={fill} />;
        case "ImageDetection":
            return <ImageDetection width={width} height={height} fill={fill} />;
        case "Classification":
            return <Classification width={width} height={height} fill={fill} />;
        case "Reset":
            return <Reset width={width} height={height} fill={fill} />;
        case "Exit":
            return <Exit width={width} height={height} fill={fill} />;
        case "Bacteria":
            return <Bacteria width={width} height={height} fill={fill} />;
        default:
            return "Empty";
    }
}
