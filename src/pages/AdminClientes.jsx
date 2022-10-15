import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminClientes() {
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState();
    const [search, setSearch] = useState("");

    async function loadClients() {
        const response = await api.get(`/users?search=${search}`, {
            role: "usuario"
        });

        if(response.status === 201) {
            setClients(response.data);
            setLoading(false);
        }
    }

    async function updateClient(e, client) {
        e.preventDefault();
        try{
            const response = await api.put(`/users/${client.id}`, {
                user: client
            });
            toast(response.data.message);
            loadClients();
        }catch(err){
            toast.error(err.response.data.message);
        }
    }

    useEffect(() => {
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
                        search={search}
                        setSearch={setSearch}
                        onClick={loadClients}
                    >
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading === false && clients.map((client) => 
                                (
                                    <tr key={client.id}>
                                        <td>{client.person?.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.person?.cellphone}</td>
                                        <td>
                                            <button onClick={(e)=>{
                                                const active = !client.isActive;
                                                updateClient(e, { 
                                                    id: client.id,
                                                    isActive: active 
                                                });
                                            }}>
                                            {client.isActive ? 'Inativar' : 'Ativar'}
                                            </button>
                                        </td>
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