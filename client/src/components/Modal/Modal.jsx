//import { useState } from 'react';
import { motion } from 'framer-motion'
import { objectAssign } from '../../utils/ReusableSyntax'
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import HttpRequest from 'axios';
import "./modal.scss";

const initialState = {
    lastModified: 0,
    lastModifiedDate: "",
    name: "",
    path: "",
    preview: "",
    size: 0,
    type: "",
    webkitRelativePath: "",
}

function Modal({ setMyFile, files }) {

    //const [message, setMessage] = useState({ status: false, message: "" })


    const history = useHistory();
    const location = useLocation();

    files.length > 0 && objectAssign(files, initialState)

    const isClose = () => {
        const specific_file = [...files]
        specific_file.length > 0 && specific_file.splice(files, 1);
        setMyFile(specific_file)
    }

    const onSubmit = () => {
        try {
            // if (files[0].size > 2000000) {
            //     return setMessage({ status: true, message: "Image should be greater than 2mb in size" })
            // }

            // const data = new FormData();
            // data.append("file", files[0].path)
            // data.append("filename", files[0].name)

            const config = {
                name: files[0].name,
                path: files[0].path,
                preview: files[0].preview,
                size: files[0].size,
                type: files[0].type,
            }

            HttpRequest.post("/images", config).then((response) => {
                if (response.status === 404) {
                    return console.log("Error 404, please try again later")
                }

                if (response.status === 400) {
                    return console.log("Error 400, Bad Request")
                }

                console.log(response.data)
            });

            //setMessage({ status: false, message: "" })

            if(location.pathname === "/dashboard"){
                return isClose()
            }
            
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
                        {/* {message.status && (
                            <div className="error-message">
                                <span>{message}</span>
                            </div>
                        )} */}
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