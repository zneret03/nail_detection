import { useState, useContext } from 'react';
import { motion } from 'framer-motion'
import { objectAssign} from '../../utils/ReusableSyntax'
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { CroppedImage } from '../';
import "./modal.scss";

//**Context APIS */
import { UploadedContext } from '../../context/UploadedProvider';
import {ErrorContext} from "../../context/ErrorProvider"

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
    const [croppedImage, setCroppedImage] = useState(undefined);
    const {dispatch} = useContext(UploadedContext)
    const {handlerDispatch} = useContext(ErrorContext)

    const history = useHistory();
    const location = useLocation();

    files.length > 0 && objectAssign(files, initialState)

    const isClose = () => {
        const specific_file = [...files]
        specific_file.length > 0 && specific_file.splice(files, 1);
        setMyFile(specific_file)
    }

    const onSubmit = () => {

            const config = {
              croppedImage,
              path : files[0].path
            }

            if (files[0].size < 2000) {
               return handlerDispatch({type : "errorHandler", config : {status : true, message : "Image minimum size is 2mb"}})
            }

            if(croppedImage){
              dispatch({type : "uploadedImage", config : config  })
            }

            if(location.pathname === "/dashboard"){
                return isClose()
            }
            
            history.push('/dashboard');
    }

    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 0 }}
          >
            <section>
              <CroppedImage
                imageToCrop={files[0]?.preview}
                onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
              />
              <div className="button-wrapper">
                <button type="button" className="cancel-btn" onClick={isClose}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="proceed-btn"
                  onClick={onSubmit}
                >
                  Proceed
                </button>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    );
}

export default withRouter(Modal)