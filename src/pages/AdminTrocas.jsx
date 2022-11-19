import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { AdminListagem } from "../components/adminListagem/AdminListagem";
import { AdminSideMenu } from "../components/adminSideMenu/AdminSideMenu";
import { Modal } from "../components/modal/Modal";
import { Pagination } from "../components/pagination/Pagination";

const RefundStatusEnum = [
    "EM ANÁLISE",
    "ACEITO",
    "RECUSADO",
    "EM TRANSPORTE",
    "ENTREGA REALIZADA",
    "FINALIZADO"
]
export function AdminTrocas() {
    const [modalRestock, setModalRestock] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refunds, setRefunds] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedRefund, setSelectedRefund] = useState();

    useEffect(() => {
        loadRefunds();
    }, [])

    async function loadRefunds(page = 1, limit = 6) {
        try {
            const response = await api.get('/refunds', {
                params: {
                    search,
                    page,
                    limit
                }
            });

            if (response.status === 201) {
                setRefunds(response.data.results);
                setTotalPages(Math.ceil(response.data.total / response.data.limit));
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
                                <th>Estado</th>
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
                                        <select name="status" value={refund.selectedStatus} onChange={(e) => {
                                            setRefunds(refunds.map((r, i) => {
                                                if (i === index) {
                                                    r.selectedStatus = e.target.value;
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
                                        setSelectedRefund(refund);
                                        setModal(!modal)
                                    }}>Motivo</button></td>
                                    <td className="btn"><button onClick={(e) => {
                                        e.preventDefault();
                                        if (
                                            refund.selectedStatus === "FINALIZADO" &&
                                            refund.status === "ENTREGA REALIZADA"
                                        ) {
                                            setModalRestock(true);
                                            setSelectedRefund(refund);
                                            return;
                                        }

                                        refund.status = refund.selectedStatus || refund.status;
                                        updateRefund(refund);
                                    }}>Atualizar</button></td>
                                </tr>
                            )
                            )}
                        </tbody>
                    </AdminListagem>
                    <Pagination
                        totalPages={totalPages}
                        func={loadRefunds}
                    />
                </div>
            </div>
            <Modal
                isOpen={modalRestock}
                onClose={() => setModalRestock(!modalRestock)}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Finalizar Troca</h5>
                    </div>
                    <div className="modal-body">
                        <p>Deseja adicionar os itens da troca ao estoque?</p>
                        <hr />
                        <div className="row">
                            <p className="col-6">Produto:  {selectedRefund?.cart_item.product.name}</p>
                            <p className="col-6">Quantidade: {selectedRefund?.cart_item.quantity}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="btns">
                            <button
                                className="btn_accept"
                                onClick={(e) => {
                                    updateRefund({
                                        ...selectedRefund,
                                        status: "FINALIZADO",
                                        restock: true,
                                    });
                                    setModalRestock(false);
                                }}
                            >Sim</button>
                            <button
                                className="btn_reject"
                                onClick={(e) => {
                                    updateRefund({
                                        ...selectedRefund,
                                        status: "FINALIZADO",
                                        restock: false,
                                    });
                                    setModalRestock(false);
                                }}
                            >Não</button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modal}
                onClose={() => setModal(!modal)}

            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Motivo</h5>
                    </div>
                    <div className="modal-body">
                        <p>{selectedRefund?.reason}</p>
                    </div>
                    <div className="modal-footer">
                        <div className="btns">
                            <button
                                className="btn_accept"
                                onClick={(e) => {
                                    updateRefund({
                                        ...selectedRefund,
                                        status: "ACEITO"
                                    });
                                }}
                            >Aceitar</button>
                            <button
                                className="btn_reject"
                                onClick={(e) => {
                                    updateRefund({
                                        ...selectedRefund,
                                        status: "RECUSADO"
                                    });
                                }}
                            >Recusar</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </main>
    );
}