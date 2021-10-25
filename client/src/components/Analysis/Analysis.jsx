import Icon from '../icons/Icon'
import "./analysis.scss"

export default function Analysis() {
    return (
        <div className="analysis-wrapper">
            <span>Detected Disease</span>
            <div className="input-element">
                <Icon name="Bacteria" width="18" height="18" fill="rgb(185, 154, 154)" />
                <input type="text" placeholder="Detected Disease" />
            </div>
        </div>
    )
}