import './style.scss';

export function Popup1(props) {
    return(
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-header">
                    <h3>{props.title}</h3>
                </div>
                <div className="popup-body">
                    <p>{props.text}</p>
                </div>
                <div className="popup-footer">
                    <button onClick={(e) => props.close(e)} >{props.button}</button>
                </div>
            </div>
        </div>
    )
}