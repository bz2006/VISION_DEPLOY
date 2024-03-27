import React, { useState } from 'react'
import Layout from "./../components/Layout/Layout";
import { toast } from 'react-toastify';
import "./contactform/style.css"



function Contact() {
  var hosturl = window.location.protocol + "//" + window.location.host + "/uploads/"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success("Thank you for contacting us")
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
    } catch (error) {
    }
  };

  return (
    <Layout>

      <>
        <div class="content">

          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-10">


                <div class="row justify-content-center">
                  <div class="col-md-6">

                    <h3 class="heading mb-4" style={{color:"black"}}>Let's talk about everything!</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas debitis, fugit natus?</p>

                    <p><img src={hosturl + "undraw-contact.svg"} alt="Image" class="img-fluid" /></p>


                  </div>
                  <div class="col-md-6">

                    <form class="mb-5" method="post" id="contactForm" name="contactForm" onSubmit={handleSubmit}>
                      <div class="row">
                        <div class="col-md-12 form-group">
                          <input type="text" style={{ width: "400px", marginBottom: "15px" }} class="form-control" name="name" required placeholder="Your Name" value={formData.name} onChange={handleChange} />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 form-group">
                          <input type="text" class="form-control" style={{ width: "400px", marginBottom: "15px" }} name="email" Required id="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-md-12 form-group">
                          <textarea class="form-control" style={{ width: "400px", marginBottom: "15px", minHeight: "150px" }} name="message" id="message" cols="30" rows="7" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12">
                          <input type="submit" value="Send Message" class="btn btn-primary rounded-0 py-2 px-4" />
                          <span class="submitting"></span>
                        </div>
                      </div>
                    </form>

                    <div id="form-message-warning mt-4"></div>
                    <div id="form-message-success">
                      Your message was sent, thank you!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </>
    </Layout >
  )
}

export default Contact