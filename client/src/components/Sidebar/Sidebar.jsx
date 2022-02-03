import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence } from "framer-motion";
import { useHistory, withRouter } from "react-router-dom";
import { Modal } from "../";
import Icon from "../icons/Icon";
import "./sidebar.scss";

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

  const ACTIONS = ["imageUpload", "imageDetection", "classification", "reset"];

  const history = useHistory();

//   const isClickUpload = () => {
//     isClick({ status: false, currentIndex: 0 });
//     setClickUpload(true);
//   };

  const isNotClickUpload = () => setClickUpload(false);

  const onMouseClick = (event, index) => {
    event.preventDefault();
    isClick({ status: true, currentIndex: index });
    isNotClickUpload();

    if (ACTIONS[index] === ACTIONS[0]) {
      //return alert("image upload");
    }

    if (ACTIONS[index] === ACTIONS[1]) {
      //return alert("Segmentation");
    }

    if (ACTIONS[index] === ACTIONS[2]) {
      //return alert("Classification");
    }

    // if (ACTIONS[index] === ACTIONS[3]) {
    //   //return alert("Reset");
    // }

    if (ACTIONS[index] === ACTIONS[3]) {
      return history.push("/");
    }
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
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
    },
    []
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
      setIsFiles(false);
    }
  }, [myFile]);


  const items = [
    {
      id: 1,
      title: "Image Detection",
      icon: "ImageDetection",
    },
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
            <div
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
            </div>
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
