import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} TicketFlow. All rights reserved.</p>
        <p>Built with React for HNG Stage 2</p>
      </div>
    </footer>
  );
};

export default Footer;

