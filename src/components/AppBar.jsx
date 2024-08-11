import './AppBar.css'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export function AppBar({ pages }) {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="header" style={{justifyContent: user ? 'space-between' : 'end'}}>
            <div style={{display: 'flex', gap: '20px', marginLeft: '20px'}}>
                {user && <div style={{color: 'white', cursor: 'pointer'}} onClick={() => navigate('/')}>Home</div>}
                {isAdmin && user && <div style={{color: 'white', cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>Dashboard</div>}
            </div>
            <div className="header-actions">
                <div className="parent">
                    {user && <img src="https://qph.cf2.quoracdn.net/main-qimg-228c725b76e58fd97f78efcda2cec96a-lq" alt="Profile Logo" className="action-logo profile-logo" />}
                    {user && <div className="slide-in-right">
                        <div className="hamburger-dropdown-menu">
                            <a href="" onClick={logout}>Logout</a>         
                        </div>
                    </div>}
                    {!user && <div style={{color: 'white', cursor: 'pointer'}} onClick={() => navigate('/login')}>Log In</div>}
                </div>
            </div>
        </header>
    )
}
