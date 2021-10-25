import { motion } from 'framer-motion'
import { objectAssign } from '../../utils/ReusableSyntax'
import { withRouter, useHistory } from 'react-router-dom';
import HttpRequest from 'axios';
import "./modal.scss";

const initialState = {
    name: "",
    preview: ""
}

function Modal({ setMyFile, files }) {

    const history = useHistory();
    files.length > 0 && objectAssign(files, initialState)

    const isClose = () => {
        const specific_file = [...files]
        specific_file.length > 0 && specific_file.splice(files, 1);
        setMyFile(specific_file)
    }

    //console.log(initialState)

    const onSubmit = () => {
        try {
            HttpRequest.post("/images", initialState).then((response) => {
                if (response.status === 404) {
                    return console.log("Error 404, please try again later")
                }

                if (response.status === 400) {
                    return console.log("Error 400, Bad Request")
                }

                console.log(response)
            });

            history.push('/dashboard');
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <motion.div className="card" initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 10 }} exit={{ opacity: 0, y: 0 }}>
                    <section>
                        <img src={initialState.preview} alt={initialState.name} />
                        <div className="button-wrapper">
                            <button type="button" className="cancel-btn" onClick={isClose}>Cancel</button>
                            <button type="button" className="proceed-btn" onClick={onSubmit}>Proceed</button>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    )
}

export default withRouter(Modal)