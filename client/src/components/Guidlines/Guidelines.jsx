import React from "react";
import "./guidelines.scss";

export default function Guidelines({ setStarter }) {
  const cardDetails = [
    {
      id: 1,
      title: "Snapshot",
      image: "snapshot",
      description:
        "take a photo of your fingernail that has a abnormalities that has a white background.",
    },
    {
      id: 2,
      title: "Upload",
      image: "upload",
      description:
        " upload your fingernail snapshot coming from your phone or any camera device",
    },
    {
      id: 3,
      title: "Classification",
      image: "classify",
      description:
        " classify your fingernail picture to know the disease associated with percentage result",
    },
  ];

  return (
    <>
      <div className="guidelinesBackground" />
      <section className="guidelinesWrapper">
        <div className="guidelines-title" />
        <div className="cardWrapper">
          {cardDetails.map((type) => {
            return (
              <div className="card" key={type.id}>
                <header className="card-illustration">
                  <img
                    src={`./images/illustrations/${type.image}.svg`}
                    alt=""
                  />
                </header>
                <div className="card-content">
                  <h1 className="title">{type.title}</h1>
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: type.description }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-next">
          <button type="button" onClick={() => setStarter(true)}>
            Get started
          </button>
        </div>
      </section>
    </>
  );
}
