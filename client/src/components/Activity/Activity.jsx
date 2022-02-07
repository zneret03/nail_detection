import {useContext} from 'react';
import { NailContext } from '../../context/NailProvider';
import { ErrorContext } from '../../context/ErrorProvider';
import { Months } from "../../utils/month";
import "./activity.scss";

export default function Activity() {
    const date = new Date();
    const month = Months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const dateToday = `${month} ${day}, ${year}`;

    const {nailSegmentation} = useContext(NailContext)
    const { handler } = useContext(ErrorContext);

    return (
      <div className="activity-wrapper">
        <div className="title">Activity area</div>
        <span>{dateToday}</span>
        
        {handler.status ? (
          <div className="error-message">
            <span>{handler.message}</span>
          </div>
        ) : (
          nailSegmentation.data?.segmented.map((images, index) => (
            <div className="image-segmentation" key={index}>
              <img src={`data:image/jpeg;base64,${images}`} alt="" />
            </div>
          ))
        )}
      </div>
    );
}
