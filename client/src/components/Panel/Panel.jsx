import { Sidebar, Activity, Analysis } from "../";
import "./panel.scss";

export default function Panel() {
  return (
    <div className="panel-wrapper">
      <Sidebar />
      <div class="sub-wrapper">
        <Activity />
        <Analysis />
      </div>
    </div>
  );
}
