import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/auth';
import { ticketService, validateTicket } from '../utils/tickets';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import './TicketManagement.css';

const TicketManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const currentUser = auth.getUser();
    setUser(currentUser);
    loadTickets();
  }, []);

  const loadTickets = () => {
    const allTickets = ticketService.getAll();
    setTickets(allTickets);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setErrors({});
    setEditingTicket(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateTicket(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingTicket) {
      const result = ticketService.update(editingTicket.id, formData);
      if (result.success) {
        setToast({ message: 'Ticket updated successfully!', type: 'success' });
        loadTickets();
        resetForm();
      } else {
        setToast({ message: result.error, type: 'error' });
      }
    } else {
      const result = ticketService.create(formData);
      if (result.success) {
        setToast({ message: 'Ticket created successfully!', type: 'success' });
        loadTickets();
        resetForm();
      } else {
        setToast({ message: result.error, type: 'error' });
      }
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || 'medium'
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    const result = ticketService.delete(deleteConfirm);
    if (result.success) {
      setToast({ message: 'Ticket deleted successfully!', type: 'success' });
      loadTickets();
    } else {
      setToast({ message: result.error, type: 'error' });
    }
    setDeleteConfirm(null);
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  return (
    <div className="ticket-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this ticket? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="dashboard-nav">
        <div className="container nav-content">
          <h1 className="nav-logo">TicketFlow</h1>
          <div className="nav-actions">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="user-name">Welcome, {user?.name || 'User'}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="ticket-main">
        <div className="container">
          <div className="ticket-header">
            <h2>Ticket Management</h2>
            <button 
              onClick={() => {
                if (showForm && !editingTicket) {
                  resetForm();
                } else {
                  setShowForm(!showForm);
                  setEditingTicket(null);
                }
              }} 
              className="btn btn-primary"
            >
              {showForm ? 'Cancel' : '+ New Ticket'}
            </button>
          </div>

          {showForm && (
            <div className="ticket-form-card">
              <h3>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h3>
              <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`form-input ${errors.title ? 'input-error' : ''}`}
                      placeholder="Enter ticket title"
                    />
                    {errors.title && <p className="form-error">{errors.title}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="status" className="form-label">
                      Status <span className="required">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={`form-select ${errors.status ? 'input-error' : ''}`}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && <p className="form-error">{errors.status}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="priority" className="form-label">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                    placeholder="Enter ticket description (optional)"
                    rows="4"
                  ></textarea>
                  {errors.description && <p className="form-error">{errors.description}</p>}
                </div>

                <div className="form-actions">
                  <button type="button" onClick={resetForm} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="tickets-list">
            {tickets.length === 0 ? (
              <div className="empty-state">
                <p>No tickets found. Create your first ticket to get started!</p>
              </div>
            ) : (
              <div className="tickets-grid">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-card-header">
                      <h3>{ticket.title}</h3>
                      <span className={getStatusClass(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                    {ticket.description && (
                      <p className="ticket-description">{ticket.description}</p>
                    )}
                    <div className="ticket-meta">
                      <span className="ticket-priority">Priority: {ticket.priority || 'medium'}</span>
                      <span className="ticket-date">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="ticket-actions">
                      <button 
                        onClick={() => handleEdit(ticket)} 
                        className="btn-icon btn-edit"
                        aria-label="Edit ticket"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(ticket.id)} 
                        className="btn-icon btn-delete"
                        aria-label="Delete ticket"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TicketManagement;

