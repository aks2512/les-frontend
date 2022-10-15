import { useEffect, useState } from "react";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

export function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadSales();
    }, [])

    async function loadSales() {
        const response = await api.get(`/purchases?search=${search}`);
        if(response.status === 201) {
            setSales(response.data);
            setLoading(false);
        }
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">    
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu/>
                </div>
                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem 
                        title="Vendas"
                        registerLink="/register-venda"
                        search={search}
                        setSearch={setSearch}
                        onClick={loadSales}
                    />
                </div>
            </div>
        </main>
    );
}