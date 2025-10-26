// Initialize demo data for the application
export const initDemoData = () => {
  // Check if demo user already exists
  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
  
  if (!users.find(u => u.email === 'demo@ticketflow.com')) {
    users.push({
      name: 'Demo User',
      email: 'demo@ticketflow.com',
      password: 'demo123'
    });
    localStorage.setItem('ticketapp_users', JSON.stringify(users));
  }

  // Check if demo tickets already exist
  const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
  
  if (tickets.length === 0) {
    const demoTickets = [
      {
        id: '1',
        title: 'Login page not loading',
        description: 'Users are reporting that the login page is not loading properly on mobile devices.',
        status: 'open',
        priority: 'high',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        title: 'Add dark mode support',
        description: 'Implement dark mode theme for better user experience.',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        title: 'Email notifications not working',
        description: 'Email notifications for new tickets are not being sent.',
        status: 'closed',
        priority: 'high',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        title: 'Update user profile page',
        description: 'Add ability to update user profile information.',
        status: 'open',
        priority: 'low',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem('ticketapp_tickets', JSON.stringify(demoTickets));
  }
};

