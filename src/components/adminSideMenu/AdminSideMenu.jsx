import { AdminInformacao } from './partials/AdminInformacao';
import { AdminMenu } from './partials/AdminMenu';

import './style.scss';

export function AdminSideMenu() {
    return (
        <div className="admin-side-menu">
            <AdminInformacao/>
            <AdminMenu/>
        </div>
    );
}