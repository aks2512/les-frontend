import './style.scss';

export function WhiteBox(props) {
    return (
        <div className="white-box">
            <div className="row">
                {props.children}
            </div>
        </div>
    );
}