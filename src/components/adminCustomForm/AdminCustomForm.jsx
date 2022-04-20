import './style.scss';

export function AdminCustomForm(props) {
    return (
        <div className="admin-custom-form" onSubmit={(e) => props.onSubmit(e)}>
            <h4>Produtos</h4>
            <form >
                {props.children}
            </form>
        </div>
    );
}