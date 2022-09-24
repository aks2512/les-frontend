import { useEffect, useState } from "react";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminClientes() {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState();

    useEffect(() => {
        async function loadClients() {
            const response = await api.get('/users/index');
            console.log(response);
            if(response.status === 200) {
                setClients(response.data);
                setLoading(false);
            }
        }

        loadClients();

    }, [])
    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem 
                        title="Clientes"
                        registerLink="/register-cliente"
                    >
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Celular</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading === false && clients.map((client) => 
                                (
                                    <tr key={client.id}>
                                        <td>{client.person.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.person.cellphone}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </AdminListagem>
                </div>
            </div>
        </main>
    );
}