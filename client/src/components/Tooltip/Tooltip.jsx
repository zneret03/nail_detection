import UseToggle from '../../hook/UseToggle'
import { motion } from 'framer-motion'
import "./tooltip.scss"

export default function Tooltip() {

    const [onChangeStatus, setOnChangeStatus] = UseToggle()

    const textChange = onChangeStatus ? "disease detected" : "Healthy"
    const message = onChangeStatus ? (
        <p>
            The software does not detect any symptoms for nail disease. Therefore,
            your fingernails are healthy
        </p>
    ) : (
        <p>
            The detection reach 95% for <strong>nail clubbing</strong>, and these
            are the following disease detection such as (Inflammatory bowel disease,
            Chronic Bronchitis, Cirrhosis, Congenital heart disease,
            Atrioventricular malformations)
        </p>
    );
    const imageDisplay = onChangeStatus ? `Happy.svg` : `Sad.svg`
    return (
        <div className="tooltip-wrapper">
            <motion.div
                className="tooltip-card"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 5 }}
                exit={{ opacity: 0, y: 0 }}
            >
                <div className="content">
                    {message}
                </div>
                <img className="svg-image" src={`./images/illustrations/${imageDisplay}`} alt="" />

                {/** to show what success looks like for demo presentation only */}
                <div style={{ textAlign: "right" }}>
                    <button type="button" onClick={setOnChangeStatus} className="show-result">{textChange}</button>
                </div>
            </motion.div>
        </div>
    );
}