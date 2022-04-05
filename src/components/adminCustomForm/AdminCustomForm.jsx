import './style.scss';

export function AdminCustomForm(props) {
    return (
        <div className="admin-custom-form">
            <h4>Produtos</h4>
            <form >
                {props.children}
            </form>
        </div>
    );
}