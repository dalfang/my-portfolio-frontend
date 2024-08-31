import React, { useContext, useState } from "react";
import "./Contact.scss";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { illustration, contactInfo } from "../../portfolio";
import { Fade } from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import emailjs from "emailjs-com";

export default function Contact() {
  const { isDark } = useContext(StyleContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_mz76kaa',
        'template_cwdhhe9',
        e.target,
        '6FDJwFOUAVV1hUgvI'
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log(error.text);
          alert("Failed to send the message. Please try again.");
        }
      );
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p
              className={
                isDark ? "dark-mode contact-subtitle" : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
            <div
              className={isDark ? "dark-mode contact-text-div" : "contact-text-div"}
            >
              {contactInfo.number && (
                <>
                  <a className="contact-detail" href={"tel:" + contactInfo.number}>
                    {contactInfo.number}
                  </a>
                  <br />
                  <br />
                </>
              )}
              <a className="contact-detail-email" href={"mailto:" + contactInfo.email_address}>
                {contactInfo.email_address}
              </a>
              <br />
              <br />
              <SocialMedia />
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Get in touch!</label>
              <div className="form-floating">
  <input
    type="text"
    name="name"
    id="name"
    className="name-control"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    required
  />
  <input
    type="email"
    name="email"
    id="email"
    className="email-control"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <textarea
    name="message"
    id="message"
    className="message-control"
    placeholder="Message..."
    value={formData.message}
    onChange={handleChange}
    required
  ></textarea>
</div>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={email} />
            ) : (
              <img
                alt="Man working"
                src={require("../../assets/images/contactMailDark.svg")}
                style={{ maxWidth: "100%", height: "auto", margin: "20px 0" }}
              />
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
