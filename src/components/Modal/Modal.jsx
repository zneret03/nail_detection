import "./modal.scss";

export default function Modal({ setMyFile, files }) {

    const isClose = () => {
        const specific_file = [...files]
        specific_file.length > 0 && specific_file.splice(files, 1);
        setMyFile(specific_file)
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <div className="card">
                    <section>
                        {files.map((file) => (
                            <img src={file.preview} alt={file.name} />
                        ))}
                        <div className="button-wrapper">
                            <button type="button" className="cancel-btn" onClick={isClose}>Cancel</button>
                            <button type="button" className="proceed-btn">Proceed</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}