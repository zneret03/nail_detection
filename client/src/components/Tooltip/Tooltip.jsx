//import UseToggle from '../../hook/UseToggle'
import { motion } from 'framer-motion'
import "./tooltip.scss"

export default function Tooltip({messages}) {

    //const [onChangeStatus, setOnChangeStatus] = UseToggle()

    //const textChange = messages.accuracy > 50 ? "disease detected" : "Healthy"


    const isCheck = messages?.accuracy < 50 && messages !== undefined
    const message = isCheck ? (
        <p>
            The software does not detect any symptoms for nail disease. Therefore,
            your fingernails are healthy
        </p>
    ) : (
        <p>
            The detection reach {(Math.round(messages?.accuracy * 100) / 100).toFixed(1)}% for <strong>{messages?.prediction_name}</strong>, and these
            are the following disease detection such as {messages?.associate_diseases}
        </p>
    );

    const imageDisplay = isCheck ? `Happy.svg` : `Sad.svg`
    const errorImage = 'feeling-sorry.svg'
    const errorMessage = "Sorry no there is no output to display, please try again :("

    return (
        <div className="tooltip-wrapper">
            <motion.div
                className="tooltip-card"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 5 }}
                exit={{ opacity: 0, y: 0 }}
            >
                <div className="content">
                    {messages === undefined ? errorMessage : message}
                </div>
                <img className="svg-image" src={messages?.accuracy === 0 ? `./images/illustrations/${errorImage}` :`./images/illustrations/${imageDisplay}`} alt="" />

                {/** to show what success looks like for demo presentation only */}
                {/* <div style={{ textAlign: "right" }}>
                    <button type="button" onClick={setOnChangeStatus} className="show-result">{textChange}</button>
                </div> */}
            </motion.div>
        </div>
    );
}