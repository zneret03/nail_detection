import { Months } from "../../utils/month";
import "./activity.scss";

export default function Activity() {
    const date = new Date();
    const month = Months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateToday = `${month} ${day}, ${year}`;

    const imageSegmentation = ["sample1.png", "sample2.png", "sample3.png", "sample4.png"]

    return (
        <div className="activity-wrapper">
            <div className="title">
                Activity area
            </div>
            <span>{dateToday}</span>
            {imageSegmentation.map((images) => (
                <div className="image-segmentation">
                    <img src={`images/${images}`} alt="" />
                </div>
            ))}
        </div>
    );
}
