import { useState } from "react";
import supabase from "@/utils/supabaseClient";
// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  // state untuk mengolah input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isStatusVisible, setIsStatusVisible] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Error details:", error);
      setStatus("Error submitting the form. Please Try Again");
    } else {
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }

    setIsStatusVisible(true);
    setTimeout(() => setIsStatusVisible(false), 5000);
  };

  const statusClass = status?.startsWith("Error")
    ? "status-error"
    : "status-success";

  return (
    <article className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6336.072716796348!2d107.6291105!3d-6.973007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9adf177bf8d%3A0x437398556f9fa03!2sTelkom%20University!5e0!3m2!1sen!2sid!4v1691882345678
"
            width="400"
            height="300"
            loading="lazy"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>
        {isStatusVisible && (
          <p className={`status-message ${statusClass}`}>{status}</p>
        )}{" "}
        {/* Status dari form */}
        <form onSubmit={handleSubmit} className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="form-btn" type="submit" disabled data-form-btn>
            <FontAwesomeIcon icon={faPaperPlane}/>
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}
