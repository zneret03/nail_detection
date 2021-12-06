import { motion } from 'framer-motion'
import "./tooltip.scss"

export default function Tooltip() {

    return (
        <div className="tooltip-wrapper">
            <motion.div
                className="tooltip-card"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 5 }}
                exit={{ opacity: 0, y: 0 }}
            >
                <div className="content">
                    <p>
                        The detection reach 95% for <strong>nail clubbing</strong>, and
                        these are the following disease detection such as (Inflammatory
                        bowel disease, Chronic Bronchitis, Cirrhosis, Congenital heart
                        disease, Atrioventricular malformations)
                    </p>
                </div>
                <img src="./images/illustrations/Sad.svg" alt="" />
            </motion.div>
        </div>
    );
}