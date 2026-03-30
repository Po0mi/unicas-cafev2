import emailjs from "@emailjs/browser";
import "./Contact.scss";

const Contact = () => {
  // Format current time for the email template
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form data directly from form elements
    const form = e.target;
    const name = form.name.value;
    const intent = form.intent.value;
    const message = form.message.value;
    const email = form.email.value;

    // Basic validation
    if (!name || !intent || !message || !email) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      // Prepare template parameters matching your custom template
      const templateParams = {
        name: name,
        email: email,
        intent: intent,
        message: message,
        time: getCurrentTime(),
        to_name: "Unica's Cafe Team",
        reply_to: email,
      };

      console.log("Sending with params:", templateParams);

      // Using your provided credentials
      const result = await emailjs.send(
        "service_yzkgjhm",
        "template_ba6ei21",
        templateParams,
        "gL2IeAdmyzx77E6Qw",
      );

      console.log("Email sent successfully:", result.text);
      alert("Message sent successfully! We'll get back to you soon.");

      // Clear form
      form.reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Error details:", error.text || error.message);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="contact" id="contact">
      {/* Texture overlay — matches hero-wrapper / about-wrapper */}
      <div className="contact-wrapper">
        <div className="contact-texture" />
      </div>

      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <div>
            <p className="contact-eyebrow">Get in touch</p>
            <h2 className="contact-title">Say hello.</h2>
          </div>
          <span className="contact-note">Fill in the blanks</span>
        </div>

        {/* Conversational form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-sentence">
            {/* Line 1: name + intent */}
            <span className="sentence-text">Hi, my name is </span>
            <span className="sentence-field">
              <input
                className="inline-input"
                type="text"
                name="name"
                placeholder="your name"
                style={{ width: "10em" }}
                autoComplete="off"
              />
            </span>
            <span className="sentence-text"> and I'd like to </span>
            <span className="sentence-field">
              <input
                className="inline-input"
                type="text"
                name="intent"
                placeholder="ask about reservations"
                style={{ width: "22em" }}
                autoComplete="off"
              />
            </span>
            <span className="sentence-text">.</span>

            {/* Line 2: message */}
            <span className="sentence-block">
              <span className="sentence-text">My message is: </span>
              <textarea
                className="inline-textarea"
                name="message"
                placeholder="write something here..."
                rows={3}
              />
            </span>

            {/* Line 3: email */}
            <span className="sentence-block">
              <span className="sentence-text">You can reach me at </span>
              <span className="sentence-field">
                <input
                  className="inline-input"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  style={{ width: "20em" }}
                  autoComplete="off"
                />
              </span>
              <span className="sentence-text">.</span>
            </span>
          </p>

          {/* Bottom row */}
          <div className="form-bottom">
            <div className="contact-info">
              <a className="info-item" href="#">
                Cabatuan, Iloilo, Philippines
              </a>
              <a className="info-item" href="#">
                Open daily · 11am – 7pm
              </a>
              <a className="info-item" href="#">
                @unicascafecab
              </a>
            </div>
            <button className="submit-btn" type="submit">
              Send message
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="contact-footer">
          <span className="footer-brand">Unica's Cafe</span>
          <span className="footer-copy">© 2026 · Created by Dan</span>
          <div className="footer-socials">
            <a
              className="social-link"
              href="https://www.facebook.com/profile.php?id=61586858335568"
            >
              Facebook
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/unicascafecab?fbclid=IwY2xjawQRN8tleHRuA2FlbQIxMABicmlkETFWbmJNZTVEc3RScG4wYm41c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHnZQgBwzeD1nHrLhdUiPyU-1IgA9E2NvjkIj_Ext8Rqib-1jwr_PVgQ4vpbu_aem_dhpRZbap0y0jhkgPyRYgFw"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
