import { Link } from "react-router-dom";

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <p>Admin Tasks:</p>
      <Link to="/admin/tickets" className="footer-link-1">
        View All Tickets
      </Link>
      <Link to="/admin/users" className="footer-link-2">
        View All Users
      </Link>
    </footer>
  );
}

export default AdminFooter;