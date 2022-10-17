import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, Context } from './contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages loja
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
import { RegisterProduto } from './pages/RegisterProduto';

// styles
import './styles/font/font.scss';
import './styles/plugins/bootstrap.scss';
import './styles/global/reboot.scss';
import { UpdateProduto } from './pages/UpdateProduto';

function UserRoute({ isPrivate = false, children, redirectTo, roles }) {
  const { loading, authenticated, user } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Navigate to={redirectTo} />
  }

  if (roles && !roles.includes(user?.role)) {
    toast('Não autorizado');
    return <Navigate to={redirectTo} />
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <UserRoute redirectTo="/"><Home /></UserRoute>
            }
          />
          <Route
            path="/signin"
            exact
            element={
              <UserRoute redirectTo="/"><Signin /></UserRoute>
            } />
          <Route
            path="/signup"
            exact
            element={
              <UserRoute redirectTo="/"><Signup /></UserRoute>
            } />
          <Route
            path="/register-card"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><RegisterCard /></UserRoute>
            } />
          <Route
            path="/register-address"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><RegisterAddress /></UserRoute>
            } />
          <Route
            path="/update-personal-data"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><UpdatePersonalData /></UserRoute>
            } />
          <Route
            path="/update-address"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><UpdateAddress /></UserRoute>
            } />
          <Route
            path="/update-password"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><UpdatePassword /></UserRoute>
            } />
          <Route
            path="/update-card"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><UpdateCard /></UserRoute>
            } />
          <Route
            path="/result"
            exact
            element={
              <UserRoute redirectTo="/"><Result /></UserRoute>
            } />
          <Route
            path="/playstation/playstation5"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/playstation/playstation4"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/playstation/playstation3"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/xbox/xbox360"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/xbox/xboxone"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/xbox/xboxseriesxs"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/nintendo/nintendowii"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/nintendo/nintendo3ds"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/nintendo/nintendoswitch"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/pc/perifericos"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutosCategorizados /></UserRoute>
            } />
          <Route
            path="/meu-perfil"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><MeuPerfil /></UserRoute>
            } />
          <Route
            path="/meus-pedidos"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><MeusPedidos /></UserRoute>
            } />
          <Route
            path="/troca-produto"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><TrocaProduto /></UserRoute>
            } />
          <Route
            path="/carrinho"
            exact
            element={
              <UserRoute isPrivate={true} redirectTo="/signin" roles={['usuario']}><Carrinho /></UserRoute>
            } />
          <Route
            path="/produto-detalhes"
            exact
            element={
              <UserRoute redirectTo="/"><ProdutoDetalhes /></UserRoute>
            } />
          <Route
            path="/admin-login"
            exact
            element={
              <UserRoute redirectTo="/admin-login"><AdminLogin /></UserRoute>
            } />
          <Route
            path="/admin-dashboard"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminDashboard /></UserRoute>
            } />
          <Route
            path="/admin-produtos"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminProdutos /></UserRoute>
            } />
          <Route
            path="/admin-bandeiras"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminBandeiras /></UserRoute>
            } />
          <Route
            path="/admin-trocas"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminTrocas /></UserRoute>
            } />
          <Route
            path="/admin-vendas"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminVendas /></UserRoute>
            } />
          <Route
            path="/admin-estoque"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminEstoque /></UserRoute>
            } />
          <Route
            path="/admin-clientes"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><AdminClientes /></UserRoute>
            } />
          <Route
            path="/register-bandeira"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><RegisterBandeira /></UserRoute>
            } />
          <Route
            path="/register-produto"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><RegisterProduto /></UserRoute>
            } />
          <Route
            path="/update-produto"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><UpdateProduto /></UserRoute>
            } />
          <Route
            path="/update-bandeira"
            exact
            element={
              <UserRoute redirectTo="/admin-login" isPrivate={true} roles={['admin']}><UpdateBandeira /></UserRoute>
            } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;