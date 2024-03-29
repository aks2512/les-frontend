import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";
import { Pagination } from "../components/pagination/Pagination";

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
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadPurchases();
    }, [])

    async function loadPurchases(page = 1, limit = 6) {
        const response = await api.get(`/purchases?search=${search}&page=${page}&limit=${limit}`);
        if (response.status === 201) {
            setPurchases(() => {
                return response.data.results.map(purchase => {
                    return {
                        newStatus: purchase.status,
                        ...purchase
                    };
                })
            });
            setTotalPages(Math.ceil(response.data.total / response.data.limit));
            setLoading(false);
        }
    }

    async function updatePurchase(purchase) {
        try {
            purchase.status = purchase.newStatus
            const response = await api.put(`/purchases/${purchase.id}`, purchase);
            toast(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
        loadPurchases();
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu />
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
                                        <select name="status" value={purchase.newStatus} onChange={(e) => {
                                            setPurchases(purchases.map((p, i) => {
                                                if (i === index) {
                                                    p.newStatus = e.target.value;
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
                    <Pagination
                        totalPages={totalPages}
                        func={loadPurchases}
                    />
                </div>
            </div>
        </main>
    );
}