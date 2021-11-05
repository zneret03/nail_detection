import { motion } from 'framer-motion'
import "./tooltip.scss"

export default function Tooltip() {
    return (
        <div className="tooltip-wrapper">
            <motion.div className="content" initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 0 }}>
                Tooltip
            </motion.div>
        </div>
    )
}