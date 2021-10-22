import { Add, Close } from './'

export default function Icon({ name, width, height, fill }) {
    switch (name) {
        case "Add":
            return <Add width={width} height={height} fill={fill} />
        case "Close":
            return <Close width={width} height={height} fill={fill} />
        default:
            return "Empty"
    }
}