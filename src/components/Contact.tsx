import FadeIn from './FadeIn'
import { MdOutlineEmail } from 'react-icons/md'
import { BsWhatsapp, BsTelephone } from 'react-icons/bs' 

const Contact = () => {
  return (
    <section id="contact" className="pt-20 pb-24">
      <FadeIn delay={0.2} direction="down">
        <div className="text-center mb-12">
            <h5 className="text-slate-400 text-sm">Get In Touch</h5>
            <h2 className="text-3xl font-bold text-blue-500">Contact Me</h2>
        </div>
      </FadeIn>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl px-6">
        
        {/* Email Card */}
        <ContactOption 
          icon={<MdOutlineEmail />} 
          title="Email" 
          value="syahmirsupardi@gmail.com" 
          link="mailto:syahmirsupardi@gmail.com" 
          btnText="Send an email" // <--- Custom text
          delay={0.2} 
        />

        {/* Call Me Card */}
        <ContactOption 
          icon={<BsTelephone />} 
          title="Call Me" 
          value="Say Hi!" 
          link="tel:+60197627420" 
          btnText="Call Now"     // <--- Custom text for phone
          delay={0.4} 
        />

        {/* WhatsApp Card */}
        <ContactOption 
          icon={<BsWhatsapp />} 
          title="WhatsApp" 
          value="Just whatsapp me!" 
          link="https://wa.me/60197627420" 
          btnText="Send a message" // <--- Custom text
          delay={0.6} 
        />

      </div>
    </section>
  )
}

// ----------------------------------------------------------------------
// Reusable Component (Updated to accept btnText)
// ----------------------------------------------------------------------
// We added 'btnText' to the props list below, with a default value
const ContactOption = ({ icon, title, value, link, delay, btnText = "Send a message" }: any) => (
  <FadeIn delay={delay} direction="up" fullWidth={true} padding={false}>
    <article className="bg-slate-800 p-8 rounded-2xl text-center border border-transparent hover:bg-slate-700 hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 shadow-lg cursor-pointer group">
        <div className="text-4xl text-blue-400 mx-auto mb-4 inline-block group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h4 className="text-xl font-bold text-white">{title}</h4>
        <h5 className="text-slate-400 text-sm mb-6">{value}</h5>
        
        {/* Using the new btnText prop here */}
        <a href={link} target="_blank" className="text-blue-400 text-sm hover:text-white hover:underline transition">
            {btnText}
        </a>
    </article>
  </FadeIn>
)

export default Contact