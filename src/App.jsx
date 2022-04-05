import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// pages loja
import { Home } from './pages/Home';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { UpdatePersonalData } from './pages/UpdatePersonalData';
import { UpdateAddress } from './pages/UpdateAddress';
import { UpdatePassword } from './pages/UpdatePassword';
import { RegisterCard } from './pages/RegisterCard';
import { UpdateCard } from './pages/UpdateCard';
import { RegisterAddress } from './pages/RegisterAddress';
import { Result } from './pages/Result';
import { ProdutosCategorizados } from './pages/ProdutosCategorizados';
import { MeuPerfil } from './pages/MeuPerfil';
import { MeusPedidos } from './pages/MeusPedidos';
import { TrocaProduto } from './pages/TrocaProduto';
import { Carrinho } from './pages/Carrinho';
import { ProdutoDetalhes } from './pages/ProdutoDetalhes';

//page admin
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProdutos } from './pages/AdminProdutos';
import { AdminBandeiras } from './pages/AdminBandeiras';
import { AdminTrocas } from './pages/AdminTrocas';
import { AdminVendas } from './pages/AdminVendas';
import { AdminEstoque } from './pages/AdminEstoque';
import { AdminClientes } from './pages/AdminClientes';
import { RegisterBandeira } from './pages/RegisterBandeira';
import { UpdateBandeira } from './pages/UpdateBandeira';

// styles
import './styles/font/font.scss';
import './styles/plugins/bootstrap.scss';
import './styles/global/reboot.scss';
import { RegisterProduto } from './pages/RegisterProduto';

function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Routes>
        <Route  path="/" exact element={<Home/>} />
        <Route  path="/signin" exact element={<Signin/>} />
        <Route  path="/signup" exact element={<Signup/>} />
        <Route  path="/register-card" exact element={<RegisterCard/>} />
        <Route  path="/register-address" exact element={<RegisterAddress/>} />
        <Route  path="/update-personal-data" exact element={<UpdatePersonalData/>} />
        <Route  path="/update-address" exact element={<UpdateAddress/>} />
        <Route  path="/update-password" exact element={<UpdatePassword/>} />
        <Route  path="/update-card" exact element={<UpdateCard/>} />
        <Route  path="/result" exact element={<Result/>} />
        <Route  path="/playstation/playstation5" exact element={<ProdutosCategorizados/>} />
        <Route  path="/playstation/playstation4" exact element={<ProdutosCategorizados/>} />
        <Route  path="/playstation/playstation3" exact element={<ProdutosCategorizados/>} />
        <Route  path="/xbox/xbox360" exact element={<ProdutosCategorizados/>} />
        <Route  path="/xbox/xboxone" exact element={<ProdutosCategorizados/>} />
        <Route  path="/xbox/xboxseriesxs" exact element={<ProdutosCategorizados/>} />
        <Route  path="/nintendo/nintendowii" exact element={<ProdutosCategorizados/>} />
        <Route  path="/nintendo/nintendo3ds" exact element={<ProdutosCategorizados/>} />
        <Route  path="/nintendo/nintendoswitch" exact element={<ProdutosCategorizados/>} />
        <Route  path="/pc/perifericos" exact element={<ProdutosCategorizados/>} />
        <Route  path="/meu-perfil" exact element={<MeuPerfil/>} />
        <Route  path="/meus-pedidos" exact element={<MeusPedidos/>} />
        <Route  path="/troca-produto" exact element={<TrocaProduto/>} />
        <Route  path="/carrinho" exact element={<Carrinho/>} />
        <Route  path="/produto-detalhes" exact element={<ProdutoDetalhes/>} />
        <Route  path="/admin-login" exact element={<AdminLogin/>} />
        <Route  path="/admin-dashboard" exact element={<AdminDashboard/>} />
        <Route  path="/admin-produtos" exact element={<AdminProdutos/>} />
        <Route  path="/admin-bandeiras" exact element={<AdminBandeiras/>} />
        <Route  path="/admin-trocas" exact element={<AdminTrocas/>} />
        <Route  path="/admin-vendas" exact element={<AdminVendas/>} />
        <Route  path="/admin-estoque" exact element={<AdminEstoque/>} />
        <Route  path="/admin-clientes" exact element={<AdminClientes/>} />
        <Route  path="/register-bandeira" exact element={<RegisterBandeira/>} />
        <Route  path="/register-produto" exact element={<RegisterProduto/>} />
        <Route  path="/update-produto" exact element={<RegisterProduto/>} />
        <Route  path="/update-bandeira" exact element={<UpdateBandeira/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;