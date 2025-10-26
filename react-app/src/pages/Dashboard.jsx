import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { ticketService } from '../utils/tickets';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0
  });

  useEffect(() => {
    const currentUser = auth.getUser();
    setUser(currentUser);
    
    const ticketStats = ticketService.getStats();
    setStats(ticketStats);
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="container nav-content">
          <h1 className="nav-logo">TicketFlow</h1>
          <div className="nav-actions">
            <span className="user-name">Welcome, {user?.name || 'User'}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="container">
          <div className="dashboard-header">
            <h2>Dashboard</h2>
            <Link to="/tickets" className="btn btn-primary">
              Manage Tickets
            </Link>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-total">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Tickets</h3>
                <p className="stat-number">{stats.total}</p>
              </div>
            </div>

            <div className="stat-card stat-open">
              <div className="stat-icon">🟢</div>
              <div className="stat-content">
                <h3>Open Tickets</h3>
                <p className="stat-number">{stats.open}</p>
              </div>
            </div>

            <div className="stat-card stat-in-progress">
              <div className="stat-icon">🟡</div>
              <div className="stat-content">
                <h3>In Progress</h3>
                <p className="stat-number">{stats.in_progress}</p>
              </div>
            </div>

            <div className="stat-card stat-closed">
              <div className="stat-icon">⚫</div>
              <div className="stat-content">
                <h3>Closed Tickets</h3>
                <p className="stat-number">{stats.closed}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-info">
            <div className="info-card">
              <h3>Quick Actions</h3>
              <ul className="action-list">
                <li>
                  <Link to="/tickets">View all tickets</Link>
                </li>
                <li>
                  <Link to="/tickets">Create new ticket</Link>
                </li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Getting Started</h3>
              <p>Welcome to TicketFlow! Here you can manage all your support tickets efficiently.</p>
              <ul className="info-list">
                <li>Create tickets with title and status</li>
                <li>Track ticket progress with status updates</li>
                <li>Edit and delete tickets as needed</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;

