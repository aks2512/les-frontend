import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";
import { Modal } from "../components/modal/Modal";

const RefundStatusEnum = [
    "EM ANÁLISE",
    "ACEITO",
    "RECUSADO",
    "CANCELADO",
    "EM TRANSPORTE",
    "ENTREGA REALIZADA",
    "FINALIZADO"
]
export function AdminTrocas() {
    const [loading, setLoading] = useState(true);
    const [refunds, setRefunds] = useState([]);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [refund, setRefund] = useState();

    useEffect(() => {
        loadRefunds();
    }, [])

    async function loadRefunds() {
        try {
            const response = await api.get('/refunds', {
                params: {
                    search
                }
            });
            console.log(response.data);
            if (response.status === 201) {
                setRefunds(response.data);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }

    async function updateRefund(refund) {
        try {
            const response = await api.put(`/refunds/${refund.id}`, refund);
            toast(response.data.message);
        } catch (err) {
            toast.error(err.response.data.message);
        }
        loadRefunds();
    }

    return (
        <main className="admin">
            <div className="row w-100 px-0 m-0">
                <div className="col-12 col-xl-3 px-0">
                    <AdminSideMenu />
                </div>

                <div className="col-12 col-xl-9 px-0">
                    <AdminListagem
                        title="Trocas"
                        registerLink="/register-troca"
                        search={search}
                        setSearch={setSearch}
                        onClick={loadRefunds}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imagem</th>
                                <th>Valor</th>
                                <th>Nome</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading === false && refunds.map((refund, index) =>
                            (
                                <tr key={refund.id}>
                                    <td>{refund.id}</td>
                                    <td>{refund.status}</td>
                                    <td>{refund.cart_item.price}</td>
                                    <td>{refund?.cart_item?.product?.name}</td>
                                    <td>
                                        <select name="status" value={refund.newStatus} onChange={(e) => {
                                            setRefunds(refunds.map((r, i) => {
                                                if (i === index) {
                                                    r.newStatus = e.target.value;
                                                }
                                                return r;
                                            }))
                                        }} id="">
                                            {
                                                Object.values(RefundStatusEnum).map((status) => (
                                                    <option value={status}>{status}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td className="btn"><button onClick={(e) => {
                                        e.preventDefault();
                                        setRefund(refund);
                                        setModal(!modal)
                                    }}>Motivo</button></td>
                                    <td className="btn"><button onClick={(e) => {
                                        refund.status = refund.newStatus || refund.status;
                                        updateRefund(refund);
                                    }}>Atualizar</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </AdminListagem>
                </div>
            </div>
            <Modal
                isOpen={modal}
                onClose={() => setModal(!modal)}

            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Motivo</h5>
                    </div>
                    <div className="modal-body">
                        <p>{refund?.reason}</p>
                    </div>
                </div>
            </Modal>
        </main>
    );
}