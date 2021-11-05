import { motion } from 'framer-motion'
import "./tooltip.scss"

export default function Tooltip() {
    return (
        <div className="tooltip-wrapper">
            <motion.div className="tooltip-card" initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 0 }}>
                <div className="content">
                    <p>The detection reach 95% for <strong>Cancer</strong>,
                        you might need to consider visiting the doctor for further check up</p>
                    <img src="./images/illustrations/Sad.svg" alt="" />
                </div>
            </motion.div>
        </div>
    )
}