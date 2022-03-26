import { useContext } from "react";
import { NailContext } from "../../context/NailProvider";
import { ErrorContext } from "../../context/ErrorProvider";
import { Months } from "../../utils/month";
import "./activity.scss";

export default function Activity() {
  const date = new Date();
  const month = Months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const dateToday = `${month} ${day}, ${year}`;

  const { nailSegmentation } = useContext(NailContext);
  const { handler } = useContext(ErrorContext);

  console.log(handler);

  const isHandler = handler.type === "successHandler";

  return (
    <div className="activity-wrapper">
      <div className="title">Activity area</div>
      <span>{dateToday}</span>

      {handler.status ? (
        <div
          className="error-message"
          style={{
            borderLeft: `3.5px solid ${isHandler ? "green" : "red"}`,
            background: isHandler ? "#059940" : "rgb(235, 120, 120)",
          }}
        >
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
