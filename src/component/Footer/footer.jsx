import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-column">
          <h2 className="footer-logo">Al_Saiedy</h2>
          <p>
            A modern e-commerce platform offering high-quality products
            with a secure and seamless shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Offers</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-column">
          <h3>Customer Service</h3>
          <ul>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Support Center</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-column">
          <h3>Newsletter</h3>
          <p>Subscribe to receive special offers and updates.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>

      </div>

      {/* Payments */}
      <div className="payment-methods">
        <span>We accept:</span>
        <p>Visa • MasterCard • PayPal • Apple Pay</p>
      </div>

      {/* Security */}
      <p className="security-text">
        Secure payments • SSL protected • Trusted worldwide
      </p>

      {/* Bottom */}
      <div className="footer-bottom">
        © 2025 Al_Saiedy Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
