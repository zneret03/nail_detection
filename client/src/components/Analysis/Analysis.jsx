import { useContext } from "react";
import { Tooltip } from "../";
import { Piechart, Badge } from "../";
import UseToggle from "../../hook/UseToggle";
import { BounceLoader, PulseLoader } from "react-spinners";
import Icon from "../icons/Icon";
import "./analysis.scss";

import { DiseaseContext } from "../../context/DiseaseProvider";

export default function Analysis() {
  const [IsToggle, setIsToggle] = UseToggle();
  const { detection } = useContext(DiseaseContext);

  return (
    <div className="analysis-wrapper">
      {/* <span>Detected Disease</span>
            <div className="input-element">
                <Icon name="Bacteria" width="18" height="18" fill="rgb(185, 154, 154)" />
                <input type="text" placeholder="Detected Disease" />
            </div> */}
      <header>
        <h1 className="title">Chart Analysis</h1>
        <div>
          <Badge count={detection.data}>
            <div
              className="tooltip"
              style={{
                background: IsToggle ? "#2c3855" : "rgba(177, 161, 161, 0.5)",
              }}
              onClick={setIsToggle}
            >
              <Icon name="Notification" widht="22" height="22" fill="#fff" />
            </div>
          </Badge>
          {IsToggle && <Tooltip messages={detection.data} />}
        </div>
      </header>

      {detection.loading ? (
        <div className="loading-bar">
          <PulseLoader color={"#02152f"} loading={true} size={15} margin={5} />
        </div>
      ) : (
        <div className="chart-wrapper">
          {/* <Barchart threshold={detection.data}/> */}
          <div className="piechart">
            {detection.data?.accuracy !== 0 &&
            Object.keys(detection).length > 0 ? (
              <Piechart threshold={detection.data} />
            ) : (
              <img
                src={`/images/illustrations/analytics.svg`}
                alt=""
                width={450}
                height={450}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
