import { useState } from "react";
import { useHistory, withRouter } from 'react-router-dom'
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
    const ACTIONS = ["imageUpload", "imageDetection", "classification", "reset"]

    const history = useHistory();

    const onMouseClick = (event, index) => {
        event.preventDefault();
        isClick({ status: true, currentIndex: index });

        if (ACTIONS[index] === ACTIONS[0]) {
            return alert("image upload");
        }

        if (ACTIONS[index] === ACTIONS[1]) {
            return alert("Segmentation");
        }

        if (ACTIONS[index] === ACTIONS[2]) {
            return alert("Classification");
        }

        if (ACTIONS[index] === ACTIONS[3]) {
            return alert("Reset");
        }

        if (ACTIONS[index] === ACTIONS[4]) {
            return history.push("/");
        }
    };


    const items = [
        {
            id: 1,
            title: "Image upload",
            icon: "ImageUpload",
        },
        {
            id: 2,
            title: "Image Detection",
            icon: "ImageDetection",
        },
        {
            id: 3,
            title: "Classification",
            icon: "Classification",
        },
        {
            id: 4,
            title: "Reset",
            icon: "Reset",
        },
        {
            id: 5,
            title: "Exit",
            icon: "Exit",
        },
    ];

    return (
        <div className="sidebar-wrapper">
            <img src="/images/logo.png" alt="" />
            {items.map((item, index) => {
                const isCheck = click.status && click.currentIndex === index
                return (
                    <div
                        className="items"
                        style={{
                            background: isCheck ? colorStyle.slightNavy : colorStyle.white,
                            boxShadow: isCheck ? `0 4px 14px 1px ${colorStyle.lightNavy}` : null
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
        </div>
    );
}

export default withRouter(Sidebar);