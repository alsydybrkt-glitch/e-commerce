import "./contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-head">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you. Our team is always ready to help.</p>
      </div>

      <div className="contact-box">
        <div className="contact-info">
          <div className="info-item">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <span>support@shop.com</span>
            </div>
          </div>

          <div className="info-item">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <span>+20 123 456 789</span>
            </div>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <span>Cairo, Egypt</span>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button>Send Message</button>
        </form>
      </div>
    </section>
  );
}
