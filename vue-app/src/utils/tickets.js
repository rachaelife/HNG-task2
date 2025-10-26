const TICKETS_KEY = 'ticketapp_tickets';

export const ticketService = {
  getAll: () => {
    const tickets = localStorage.getItem(TICKETS_KEY);
    return tickets ? JSON.parse(tickets) : [];
  },

  getById: (id) => {
    const tickets = ticketService.getAll();
    return tickets.find(t => t.id === id);
  },

  create: (ticket) => {
    const tickets = ticketService.getAll();
    const newTicket = {
      id: Date.now().toString(),
      ...ticket,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    return { success: true, ticket: newTicket };
  },

  update: (id, updates) => {
    const tickets = ticketService.getAll();
    const index = tickets.findIndex(t => t.id === id);
    
    if (index === -1) {
      return { success: false, error: 'Ticket not found' };
    }
    
    tickets[index] = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    return { success: true, ticket: tickets[index] };
  },

  delete: (id) => {
    const tickets = ticketService.getAll();
    const filtered = tickets.filter(t => t.id !== id);
    
    if (filtered.length === tickets.length) {
      return { success: false, error: 'Ticket not found' };
    }
    
    localStorage.setItem(TICKETS_KEY, JSON.stringify(filtered));
    return { success: true };
  },

  getStats: () => {
    const tickets = ticketService.getAll();
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      in_progress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };
  }
};

export const validateTicket = (ticket) => {
  const errors = {};
  
  if (!ticket.title || ticket.title.trim() === '') {
    errors.title = 'Title is required';
  }
  
  if (!ticket.status) {
    errors.status = 'Status is required';
  } else if (!['open', 'in_progress', 'closed'].includes(ticket.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed';
  }
  
  if (ticket.description && ticket.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

