import { Route, Routes } from 'react-router-dom';
// import { ListingPage } from './pages/ListingPage.js'

import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import { HomeLayout } from './components/HomeLayout.jsx';
import { ProtectedLayout } from './components/ProtectedLayout.jsx';
import { FourZeroFourPage } from './pages/404/FourZeroFourPage.jsx';
import { Dashboard } from './pages/Dashboard/Dashboard.jsx';
import { Login } from './pages/Login/Login.jsx';
import { Registration } from './pages/Registration/Registration.jsx';
import { Listing } from './pages/Listing/Listing.jsx';
import { EditBanner } from './pages/EditBanner/EditBanner.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        <Route path='/' element={<ProtectedLayout />}>
          <Route path="/" element={<Listing />} />
          <Route path="/banner/:id" element={<EditBanner />} />
        </Route>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<FourZeroFourPage />} />
      </Routes>
    </AuthProvider>

  )
}

export default App
