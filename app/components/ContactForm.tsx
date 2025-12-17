export default function ContactForm() {
    return (
        <div className="container" id="contact">
          <div className="row">
              <div className="contact-heading">
                  <img src="/images/sunglass.svg" />
                  <h1 className="contact-title">The Backstage Pass</h1>
                  <p className="contact-subtitle">Add some zazz to ask any questions about projects, code, ideas, or collabs, and maybe some hot gossip (or incoherent ramblings) from the coolest in the world!</p>
              </div>
              <div className="contact-content">
                  <div className="contact-left">
                      
                  </div>
                  <div className="contact-section">
                      <form>
                          <div className="list-form">
                              <label htmlFor="name">Name</label>
                              <input type="text" id="name" name="name" className="form-input" placeholder="Your Name" required/>
                          </div>
                          <div className="list-form">
                              <label htmlFor="email">Email</label>
                              <input type="email" id="email" name="email" className="form-input" placeholder="Your Email" required/>
                          </div>
                          <div className="list-form">
                              <label htmlFor="message">Message</label>
                              <textarea id="message" name="message" className="form-input" placeholder="Your Message" required></textarea>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div> 
    );
}