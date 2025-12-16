import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8" data-aos="fade-right">
              <h1 className="text-6xl font-bold leading-tight">
                Discover Amazing Products at Great Prices
              </h1>
              <p className="text-xl opacity-90">
                Shop with confidence on our trusted platform. Find the best deals and enjoy a seamless shopping experience.
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() => navigate('/products')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Cart
                </button>
              </div>
            </div>
            <div className="hidden md:block" data-aos="fade-left">
              <img src="https://picsum.photos/200/300" alt="photo" className="rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Shipping</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
              <p className="text-gray-600">Safe and protected payment methods</p>
            </div>
            <div className="text-center p-6" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-600 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +977 9844XXXXXX
                </p>
                <p className="flex items-center text-gray-600 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-6 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
          XXX@gmail.com
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg" data-aos="fade-left">
              <form className="space-y-6">
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                </div>
                <div>
                  <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"></textarea>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest('form');
                    const name = form?.querySelector<HTMLInputElement>('input[type="text"]')?.value || '';
                    const email = form?.querySelector<HTMLInputElement>('input[type="email"]')?.value || '';
                    const message = form?.querySelector<HTMLTextAreaElement>('textarea')?.value || '';
                    // Send email using fetch
                    fetch('https://api.emailjs.com/api/v1.0/email/send', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        service_id: 'YOUR_SERVICE_ID',
                        template_id: 'YOUR_TEMPLATE_ID', 
                        user_id: 'YOUR_USER_ID',
                        template_params: {
                          from_name: name,
                          from_email: email,
                          message: message,
                          to_email: 'imrajesh2005@gmail.com'
                        }
                      })
                    }).catch(err => {
                      console.error('Failed to send email:', err);
                    });
                    // Show success animation
                    const successDiv = document.createElement('div');
                    successDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-2xl z-50 animate-bounce';
                    successDiv.innerHTML = `
                      <div class="flex flex-col items-center">
                        <svg class="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                        <p class="text-gray-600">We'll get back to you soon.</p>
                      </div>
                    `;
                    document.body.appendChild(successDiv);
                    
                    // Remove animation after 3 seconds
                    setTimeout(() => {
                      successDiv.classList.add('animate-fade-out');
                      setTimeout(() => {
                        document.body.removeChild(successDiv);
                      }, 500);
                    }, 3000);
                  }}
                  className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
