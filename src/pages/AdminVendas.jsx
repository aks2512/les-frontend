import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";

const PurchaseStatusEnum = [
    "EM ANÁLISE",
    "PAGAMENTO REALIZADO",
    "EM TRANSPORTE",
    "ENTREGA REALIZADA",
    "FINALIZADO"
]

export function AdminVendas() {
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadPurchases();
    }, [])

    async function loadPurchases() {
        const response = await api.get(`/purchases?search=${search}`);
        if(response.status === 201) {
            setPurchases(response.data);
            setLoading(false);
        }
    }

    async function updatePurchase(purchase) {
        try{
            const response = await api.put(`/purchases/${purchase.id}`, purchase);
            toast(response.data.message);
            loadPurchases();
        } catch (err) {
            toast.error(err.response.data.message);
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
                        onClick={loadPurchases}
                    >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Status</th>
                                <th>Valor</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {loading === false && purchases.map((purchase, index) => 
                                (
                                    <tr key={purchase.id}>
                                        <td>{purchase.id}</td>
                                        <td>{purchase.status}</td>
                                        <td>R$ {purchase.total_price}</td>
                                        <td>
                                            <select name="status" value={purchase.status} onChange={(e) => {
                                                setPurchases(purchases.map((p, i) => {
                                                    if(i === index) {
                                                        p.status = e.target.value;
                                                    }
                                                    return p;
                                                }))
                                            }} id="">
                                                {
                                                    Object.values(PurchaseStatusEnum).map((status) => (
                                                        <option value={status}>{status}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                        <td className="btn"><button onClick={(e) => updatePurchase(purchase)}>Atualizar</button></td>
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