import { useContext } from 'react';
import admin from '../../../assets/imgs/admin.svg';
import { Context } from '../../../contexts/AuthContext';

export function AdminInformacao() {
    const { handleLogout } = useContext(Context);
    return (
        <div className="admin-informacao">
            <div className="image">
                <img src={admin} alt="" />
            </div>
            <div className="content">
                <p>Olá Admin</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}