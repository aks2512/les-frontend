import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminEstoque() {
    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem 
                        title="Estoque"
                        registerLink="/register-estoque"
                    />
                </div>
            </div>
        </main>
    );
}