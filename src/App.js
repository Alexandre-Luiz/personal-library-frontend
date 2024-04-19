import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserEndpoint } from './services/apiService';
import { AuthContext } from './contexts/authContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CatalogPage from './pages/CatalogPage';
import HomePage from './pages/HomePage';

export default function App() {
  const [user, setUser] = useState(null);
  // 1 - Primeiro busca informações do usuário (back verifica se há sessão aberta), caso contrário, 401
  // 2 - Se não houver sessão, redireciona para página de login
  // 3 - Se houver, redireciona para página do calendar

  useEffect(() => {
    (async function getUser() {
      try {
        const userData = await getUserEndpoint();
        setUser(userData);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    })();
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <AuthContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Navigate to={`/catalog/${user.userId}`} replace={true} />}
            />
            <Route path="/catalog/:userId" element={<CatalogPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />;
          {/* Veja que estou passando a função de setUser para eu poder setar o user no componente filho */}
          <Route path="/login" element={<LoginPage onSignIn={setUser} />} />;
          <Route path="/signup" element={<SignupPage onSignIn={setUser} />} />;
          {/* <Route path="*" element={<Navigate to="/login" replace={true} />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }
}
