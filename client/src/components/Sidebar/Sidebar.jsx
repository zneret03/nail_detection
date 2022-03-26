import { useState, useEffect, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence } from "framer-motion";
import { useHistory, withRouter } from "react-router-dom";
import { types } from "../../formats";
import HttpRequest from "../../api";
import { Modal } from "../";
import Icon from "../icons/Icon";
import "./sidebar.scss";

/**Context APIS */
import { NailContext } from "../../context/NailProvider";
import { UploadedContext } from "../../context/UploadedProvider";
import { ErrorContext } from "../../context/ErrorProvider";
import { DiseaseContext } from "../../context/DiseaseProvider";

const colorStyle = {
  black: "#000",
  white: "#ffffff",
  lightNavy: "#A6ADD1",
  slightNavy: "#2c3855",
};

function Sidebar() {
  const [click, isClick] = useState({ status: false, currentIndex: 0 });
  const [clickUpload, setClickUpload] = useState(false);
  const [isFiles, setIsFiles] = useState(false);
  const [myFile, setMyFile] = useState([]);

  const { dispatch, isCheck } = useContext(NailContext);
  const { handler, handlerDispatch } = useContext(ErrorContext);
  const { uploaded } = useContext(UploadedContext);
  const { detectionDispatch } = useContext(DiseaseContext);

  console.log(uploaded.path ? true : false);

  const ACTIONS = [
    "imageUpload",
    "imageDetection",
    "imageExtraction",
    "classification",
    "reset",
  ];

  const history = useHistory();

  /**
   * Reset all the images uploaded in the server
   */
  const resetImage = () => {
    HttpRequest.post("/destroyWindows", { message: "Successfully Reset" }).then(
      (response) => {
        if (response.status === 404) {
          return console.log("Error 404, please try again later");
        }

        if (response.status === 400) {
          return console.log("Error 400, Bad Request");
        }

        if (response.status === 200) {
          dispatch({ type: "segmentNail", config: { ...response } });
          detectionDispatch({ type: "classify", config: { ...response } });
          handlerDispatch({
            type: "errorHandler",
            config: { status: false, message: "" },
          });
          //setBase({...response})
        }
      }
    );
  };

  /**
   * uploading base64 images for efficiency and avoiding saving images for bloated files
   * decoding base64 opencv output for visualitation output
   */
  const segmentImage = async () => {
    try {
      await HttpRequest.post("/images", { file: uploaded.croppedImage }).then(
        (response) => {
          if (response.status === 404) {
            return handlerDispatch({
              type: "errorHandler",
              config: {
                status: true,
                message: "Error 404, please try again later",
              },
            });
          }

          if (response.status === 400) {
            return handlerDispatch({
              type: "errorHandler",
              config: { status: true, message: "Error 400, Bad Request" },
            });
          }

          if (response.status === 200) {
            dispatch({ type: "segmentNail", config: { ...response } });
            handlerDispatch({
              type: "errorHandler",
              config: { status: false, message: "" },
            });
          }
        }
      );
    } catch (error) {
      handlerDispatch({
        type: "errorHandler",
        config: {
          status: true,
          type: "errorHandler",
          message: "image is not clear :( ",
        },
      });
    }
  };

  const classification = async () => {
    try {
      await HttpRequest.post("/classify", { path: uploaded.path }).then(
        (response) => {
          //return error 404 if page not found

          if (handler.type === "errorHandler") {
            return handlerDispatch({
              type: "errorHandler",
              config: {
                status: true,
                type: "errorHandler",
                message: "Error 404, please try again later",
              },
            });
          }

          if (response.status === 404) {
            return handlerDispatch({
              type: "errorHandler",
              config: {
                status: true,
                type: "errorHandler",
                message: "Error 404, please try again later",
              },
            });
          }

          //return error 400 if there is something bad happen in http request
          if (response.status === 400) {
            return handlerDispatch({
              type: "errorHandler",
              config: { status: true, message: "Error 400, Bad Request" },
            });
          }

          if (response.status === 200) {
            detectionDispatch({ type: "classify", config: { ...response } });
            //Catch server response
            handlerDispatch({
              type: "errorHandler",
              config: { status: false, message: "" },
            });
          }
        }
      );
    } catch (error) {
      //return error 500 if there is something happened in the server
      handlerDispatch({
        type: "errorHandler",
        config: { status: true, message: "image is not clear :( " },
      });
    }
  };

  const isNotClickUpload = () => setClickUpload(false);

  const onMouseClick = (event, index) => {
    event.preventDefault();
    isClick({ status: true, currentIndex: index });
    isNotClickUpload();

    if (ACTIONS[index] === ACTIONS[0]) {
      return segmentImage();
    }

    // if (ACTIONS[index] === ACTIONS[1]) {
    //   return featureExtraction()
    // }

    if (ACTIONS[index] === ACTIONS[1]) {
      return classification();
    }

    if (ACTIONS[index] === ACTIONS[2]) {
      return resetImage();
    }

    if (ACTIONS[index] === ACTIONS[3]) {
      return history.push("/");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setMyFile([]);
    } else {
      setMyFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: types,
    onDrop,
  });

  useEffect(() => {
    if (myFile.length > 0) {
      setIsFiles(true);
    } else {
      setIsFiles(false);
    }
  }, [myFile]);

  const items = [
    {
      id: 1,
      title: "Image Detection",
      icon: "ImageDetection",
    },
    // {
    //   id: 2,
    //   title: "Feature Extraction",
    //   icon: "Extraction",
    // },
    {
      id: 2,
      title: "Classification",
      icon: "Classification",
    },
    {
      id: 3,
      title: "Reset",
      icon: "Reset",
    },
    {
      id: 4,
      title: "Exit",
      icon: "Exit",
    },
  ];

  return (
    <>
      {isFiles && (
        <AnimatePresence>
          <Modal setMyFile={setMyFile} files={[myFile[0]]} />
        </AnimatePresence>
      )}
      <div className="sidebar-wrapper">
        <img src="/images/logo.png" alt="" />
        <section>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <button
              disabled={isCheck}
              className="items"
              onClick={open}
              style={{
                background: clickUpload
                  ? colorStyle.slightNavy
                  : colorStyle.white,
                boxShadow: clickUpload
                  ? `0 4px 14px 1px ${colorStyle.lightNavy}`
                  : null,
              }}
            >
              <Icon
                name={"ImageUpload"}
                width="16"
                height="16"
                fill={colorStyle.lightNavy}
              />
              <span
                style={{
                  color: clickUpload ? colorStyle.white : colorStyle.lightNavy,
                }}
              >
                Image upload
              </span>
            </button>
          </div>
          {items.map((item, index) => {
            const isCheck = click.status && click.currentIndex === index;
            return (
              <div
                className="items"
                style={{
                  background: isCheck
                    ? colorStyle.slightNavy
                    : colorStyle.white,
                  boxShadow: isCheck
                    ? `0 4px 14px 1px ${colorStyle.lightNavy}`
                    : null,
                }}
                key={item.id}
                onClick={(event) => onMouseClick(event, index)}
              >
                <Icon
                  name={item.icon}
                  width="16"
                  height="16"
                  fill={isCheck ? colorStyle.white : colorStyle.lightNavy}
                />
                <span
                  style={{
                    color: isCheck ? colorStyle.white : colorStyle.lightNavy,
                  }}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default withRouter(Sidebar);
