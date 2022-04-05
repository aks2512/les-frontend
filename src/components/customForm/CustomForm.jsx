import './style.scss';

export function CustomForm(props) {
    return (
        <form className="custom-form" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}