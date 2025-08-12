import { useNavigate, Link } from 'react-router-dom';

const TopNav = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getHomeLink = () => {
    if (user?.role === 'provider') return '/provider';
    if (user?.role === 'admin') return '/admin';
    return '/login';
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to={getHomeLink()} className="nav-logo">
          🚽 CityCleanTracker
        </Link>
        
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
            <ul className="nav-links">
              {user.role === 'provider' && (
                <>
                  <li><Link to="/provider" className="nav-link">Home</Link></li>
                  <li><Link to="/provider/scan" className="nav-link">Scan</Link></li>
                </>
              )}
              
              {user.role === 'admin' && (
                <>
                  <li><Link to="/admin" className="nav-link">Dashboard</Link></li>
                  <li><Link to="/admin/providers" className="nav-link">Providers</Link></li>
                  <li><Link to="/admin/data" className="nav-link">Data</Link></li>
                  <li><Link to="/admin/reports" className="nav-link">Reports</Link></li>
                </>
              )}
            </ul>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              {user.role === 'admin' && (() => {
                try {
                  const pending = JSON.parse(localStorage.getItem('pending_registrations') || '[]')
                  if (pending.length > 0) {
                    return (
                      <Link to="/admin/data" className="badge badge-warning" title="Pending registrations">
                        Pending: {pending.length}
                      </Link>
                    )
                  }
                } catch {}
                return null
              })()}
              <div className="text-sm">
                <div className="font-medium">{user.name}</div>
                <div className="text-gray">{user.role}</div>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;