# TicketFlow - Multi-Framework Ticket Management Application

A comprehensive ticket management web application implemented in three different frontend frameworks: **React**, **Vue.js**, and **Twig**. Each implementation provides identical functionality and design, demonstrating framework-agnostic development skills.

## 🎯 Project Overview

This project is part of the HNG Stage 2 Frontend Task, showcasing the ability to build the same application across multiple frontend technologies while maintaining consistent design, functionality, and user experience.

## ✨ Core Features

All three implementations include:

- **Landing Page**: Attractive hero section with wavy SVG background and decorative circles
- **Authentication System**: Secure login and signup with comprehensive form validation
- **Dashboard**: Real-time statistics displaying total, open, in-progress, and closed tickets
- **Ticket Management**: Full CRUD operations (Create, Read, Update, Delete) with validation
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Accessibility**: WCAG AA compliant with semantic HTML and ARIA labels
- **Session Management**: Protected routes with localStorage-based authentication

## 🛠️ Technologies

### React Implementation
- React 18.x
- React Router DOM 6.x
- Vite
- CSS3 with Custom Properties

### Vue.js Implementation
- Vue 3.x
- Vue Router 4.x
- Vite
- CSS3 with Custom Properties

## 📁 Project Structure

```
HNG_stage2/
├── react-app/              # React implementation
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── vue-app/                # Vue.js implementation
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── views/          # Page views
│   │   ├── router/         # Router configuration
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── shared-assets/          # Shared design assets
│   ├── wave.svg            # Hero wave background SVG
│   └── DESIGN_SYSTEM.md    # Design system documentation
│
└── README.md               # This file
```

**Note**: Twig implementation is maintained in a separate repository.

## 🚀 Quick Start

### React Implementation

```bash
cd react-app
npm install
npm run dev
```

Visit: `http://localhost:5173`

### Vue.js Implementation

```bash
cd vue-app
npm install
npm run dev
```

Visit: `http://localhost:5174`

## 🎨 Design Consistency

All implementations follow the same design system:

### Layout
- **Max Width**: 1440px (centered on large screens)
- **Container Padding**: 1.5rem on mobile, 2rem on desktop
- **Border Radius**: 8px (standard), 12px (large cards)

### Color Palette
- **Primary**: #4F46E5 (Indigo)
- **Secondary**: #06B6D4 (Cyan)
- **Success/Open**: #10B981 (Green)
- **Warning/In Progress**: #F59E0B (Amber)
- **Closed**: #6B7280 (Gray)
- **Error**: #EF4444 (Red)

### Typography
- **Font Family**: 'Inter', system-ui, sans-serif
- **Headings**: Bold weight
- **Body**: Regular weight

### Components
- **Hero Section**: Gradient background with wavy SVG at bottom edge
- **Decorative Circles**: At least 2 semi-transparent circles across the site
- **Cards**: Rounded corners with box shadows
- **Status Badges**: Color-coded pills for ticket status

## 🔐 Authentication

All implementations use localStorage for session management:

- **Session Key**: `ticketapp_session`
- **Session Duration**: 24 hours
- **Protected Routes**: Dashboard and Ticket Management pages

### Demo Credentials
- **Email**: demo@ticketflow.com
- **Password**: demo123

## 📝 Ticket Validation Rules

Consistent across all implementations:

- **Title**: Required field (cannot be empty)
- **Status**: Required, must be one of: `open`, `in_progress`, `closed`
- **Description**: Optional, maximum 500 characters
- **Priority**: Optional, defaults to `medium`

## ♿ Accessibility Features

All implementations include:

- Semantic HTML elements (`<nav>`, `<main>`, `<footer>`, `<section>`)
- ARIA labels for icon buttons and interactive elements
- Visible focus states for keyboard navigation
- Color contrast ratio meeting WCAG AA standards (minimum 4.5:1)
- Screen reader friendly error messages
- Alt text for all images

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (stacked layout, full-width buttons)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (multi-column grid, max-width container)

### Mobile Adaptations
- Collapsible navigation
- Stacked form fields
- Full-width buttons
- Hidden decorative elements on small screens

## 🧪 Testing Checklist

For each implementation:

- [ ] Landing page displays correctly with hero section and features
- [ ] Login with demo credentials works
- [ ] Signup creates new account and auto-logs in
- [ ] Dashboard shows correct ticket statistics
- [ ] Create new ticket with validation
- [ ] Edit existing ticket
- [ ] Delete ticket with confirmation
- [ ] Form validation shows appropriate errors
- [ ] Toast notifications appear for success/error
- [ ] Logout clears session and redirects
- [ ] Protected routes redirect to login when not authenticated
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Keyboard navigation works throughout
- [ ] Screen reader compatibility

## 📊 Feature Comparison

| Feature | React | Vue.js |
|---------|-------|--------|
| Landing Page | ✅ | ✅ |
| Authentication | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| Ticket CRUD | ✅ | ✅ |
| Form Validation | ✅ | ✅ |
| Toast Notifications | ✅ | ✅ |
| Protected Routes | ✅ | ✅ |
| Responsive Design | ✅ | ✅ |
| Accessibility | ✅ | ✅ |

## 🐛 Known Issues

None at this time. All implementations are fully functional.

## 🤝 Contributing

This project is part of the HNG Internship Stage 2 task.

## 📄 License

This project is created for educational purposes as part of the HNG Internship program.

## 👥 Author

Built for HNG Internship Stage 2 - Frontend Development Task

**Deadline**: Tuesday, 28th October 2025 – 11:59 PM (GMT +1, Nigerian Time)

---

## 📦 Shared Assets

All implementations use shared design assets located in `shared-assets/`:

- **wave.svg** - Hero section wave background (responsive SVG)
- **DESIGN_SYSTEM.md** - Complete design guidelines and specifications

These assets ensure visual consistency across all framework implementations.

## ✨ All Features Implemented

✅ Landing page with hero section and wave SVG
✅ User authentication (login/signup)
✅ Dashboard with real-time statistics
✅ Full ticket CRUD operations
✅ Form validation with error messages
✅ Toast notifications
✅ Protected routes
✅ Responsive design (mobile, tablet, desktop)
✅ Accessibility (WCAG AA compliant)
✅ Semantic HTML and ARIA labels

---

**Note**: All implementations share the same design assets located in the `shared-assets/` folder to ensure visual consistency across frameworks.

