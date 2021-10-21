import { useState, useEffect, useCallback } from 'react';
import { Modal } from '../'
import { Icon } from '../icons'
import { useDropzone } from "react-dropzone";
import "./frontpage.scss";

export default function Frontpage() {
    const [isFiles, setIsFiles] = useState(false);
    const [myFile, setMyFile] = useState([]);

    console.log("dawd")

    //*put file in a state so that we have access to remove it
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (myFile.length > 0) {
                console.log("invalid")
            } else {
                setMyFile(
                    acceptedFiles.map(file => Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    }))
                );
            }
        },
        [myFile]
    );

    const { getRootProps, getInputProps, open } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: "image/jpeg, image/png",
        onDrop
    });

    useEffect(() => {
        if (myFile.length > 0) {
            setIsFiles(true);
        } else {
            setIsFiles(false)
        }
    }, [myFile])


    return (
        <>
            {isFiles && <Modal setMyFile={setMyFile} files={myFile} />}
            <div className="wrapper">
                <div className="left-content">
                    <header className="title-header">
                        <span>Fingernail Disease Classifier</span>
                        <p>a machine learning that can detect diseases by </p>
                        <p>classifying human fingernails attributes</p>
                    </header>
                    <div className="circle">
                        <img src="./images/system-image.png" alt="system prototype" />
                    </div>
                </div>
                <div className="right-content">
                    <div className="title">Welcome!</div>
                    <div className="paragraph">
                        <p>you can drag & drop or directly upload </p>
                        <p>your image file.</p>
                    </div>
                    <div className="dropzone-wrapper">
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <div>
                                <p>Drag & Drop</p>
                                <span>or</span>
                            </div>
                            <button type="button" onClick={open}>
                                <Icon name="Add" width="20" height="20" fill="white" />
                                Add Files
                            </button>
                        </div>
                        {/* <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside> */}
                    </div>
                </div>
            </div>
        </>
    );
}
