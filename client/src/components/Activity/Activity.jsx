import {useContext} from 'react';
import { NailContext } from '../../context/NailProvider';
import { Months } from "../../utils/month";
import "./activity.scss";

export default function Activity() {
    const date = new Date();
    const month = Months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateToday = `${month} ${day}, ${year}`;

    const {nailSegmentation} = useContext(NailContext)

    //const imageSegmentation = ["sample1.png", "sample2.png", "sample3.png", "sample4.png"]

    return (
        <div className="activity-wrapper">
            <div className="title">
                Activity area
            </div>
            <span>{dateToday}</span>
            {nailSegmentation.data?.segmented.map((images, index) => (
                <div className="image-segmentation" key={index}>
                    <img src={`data:image/jpeg;base64,${images}`} alt="" />
                </div>
            ))}
        </div>
    );
}
