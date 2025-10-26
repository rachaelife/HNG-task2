const SESSION_KEY = 'ticketapp_session';

export const auth = {
  login: (email, password) => {
    // Simulate authentication
    // In a real app, this would call an API
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const session = {
        token: btoa(`${email}:${Date.now()}`),
        user: { email: user.email, name: user.name },
        timestamp: Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return { success: true, user: session.user };
    }
    
    return { success: false, error: 'Invalid email or password' };
  },

  signup: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('ticketapp_users', JSON.stringify(users));
    
    // Auto login after signup
    return auth.login(email, password);
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated: () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return false;
    
    try {
      const parsed = JSON.parse(session);
      // Check if session is less than 24 hours old
      const isValid = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
      if (!isValid) {
        auth.logout();
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  getUser: () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    
    try {
      const parsed = JSON.parse(session);
      return parsed.user;
    } catch {
      return null;
    }
  }
};

