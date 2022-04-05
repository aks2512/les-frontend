import admin from '../../../assets/imgs/admin.svg';

export function AdminInformacao() {
    return (
        <div className="admin-informacao">
            <div className="image">
                <img src={admin} alt="" />
            </div>
            <div className="content">
                <p>Olá Admin</p>
                <button>Logout</button>
            </div>
        </div>
    );
}