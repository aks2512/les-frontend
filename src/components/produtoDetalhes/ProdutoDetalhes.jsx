
export function ProdutoDetalhes({ product }) {
    return (
        <>
            <div className="col-md-12 container text-center">
                <img width="35%" src={product.image_url} alt="" />
            </div>
            <hr />
            <div className="col-md-6 col-sm-12 container">
                <h5>Descrição</h5>
                <p>{product?.description}</p>
            </div>
            <div className="col-md-6  col-sm-12 row">
                <div className="col-md-8 col-sm-12">
                    <h5>Detalhes do Produto</h5>

                    <p><strong>Publicadora: </strong>{product?.publisher}</p>
                    <p><strong>Desenvolvedora: </strong>{product?.developer}</p>
                    <p><strong>Lançamento: </strong>{product?.release_date}</p>
                    <p><strong>Idioma: </strong>{product?.language}</p>
                    <p><strong>Legenda: </strong>{product?.subtitle}</p>
                </div>
            </div>
        </>
    );
}