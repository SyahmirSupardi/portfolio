import { FiArrowUpRight, FiMail, FiMessageCircle, FiPhone } from 'react-icons/fi'

const Contact = () => {
  return (
    <section id="contact" className="section-wrap contact-section" aria-labelledby="contact-title">
      <div className="section-label-row"><span>04 / CONTACT</span><span>END OF FILE — START A CONVERSATION</span></div>
      <div className="contact-paper">
        <span className="paper-tape contact-tape" aria-hidden="true" />
        <div className="contact-copy">
          <p className="contact-kicker">HAVE A PROJECT IN MIND?</p>
          <h2 id="contact-title">Let’s talk<br /><span>about the data.</span></h2>
          <p>Have a question, a project, or an opportunity in mind? I’d be glad to hear from you.</p>
        </div>

        <div className="contact-details">
          <a className="contact-link" href="mailto:syahmirsupardi@gmail.com">
            <span className="contact-icon"><FiMail aria-hidden="true" /></span>
            <span><small>Email</small><strong>syahmirsupardi@gmail.com</strong></span>
            <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
          </a>
          <a className="contact-link" href="https://wa.me/60197627420" target="_blank" rel="noreferrer">
            <span className="contact-icon"><FiMessageCircle aria-hidden="true" /></span>
            <span><small>WhatsApp</small><strong>Send me a message</strong></span>
            <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
          </a>
          <a className="contact-link" href="tel:+60197627420">
            <span className="contact-icon"><FiPhone aria-hidden="true" /></span>
            <span><small>Phone</small><strong>+60 19-762 7420</strong></span>
            <FiArrowUpRight className="contact-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
