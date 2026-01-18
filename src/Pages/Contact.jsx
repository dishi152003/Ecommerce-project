import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HeadphonesIcon,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  User,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const faqs = [
    {
      question: "What are your customer service hours?",
      answer: "Our customer service team is available 24/7 to assist you. You can reach us via phone, email, or live chat at any time."
    },
    {
      question: "How long does it take to get a response?",
      answer: "We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please call our hotline for immediate assistance."
    },
    {
      question: "Can I track my order status?",
      answer: "Yes! Once your order is placed, you'll receive a tracking number via email. You can also check your order status in the 'My Orders' section of your account."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a hassle-free 30-day return policy. If you're not satisfied with your purchase, you can return it for a full refund or exchange within 30 days of delivery."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we ship to all major cities across India. We're working on expanding our services internationally. Stay tuned for updates!"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/image%2011.jpg')] bg-cover bg-center opacity-10"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-semibold">We're Here to Help</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 animate-fade-in-up">
            Get in Touch
          </h1>

          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-50 animate-fade-in-up delay-200">
            Have questions, feedback, or need assistance? Our dedicated team is ready to help you with anything you need.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 px-6 -mt-16 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "+91 1800-123-4567",
                subInfo: "Mon-Sun, 24/7",
                color: "from-blue-500 to-cyan-500",
                link: "tel:+911800123456"
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "support@shopnow.com",
                subInfo: "Response in 2-4 hours",
                color: "from-purple-500 to-pink-500",
                link: "mailto:support@shopnow.com"
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                info: "Chat with us now",
                subInfo: "Available 24/7",
                color: "from-green-500 to-teal-500",
                isAction: true,
                onClick: (e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('open-chat'));
                }
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "123 Shopping Street",
                subInfo: "New Delhi, India",
                color: "from-orange-500 to-red-500",
                link: "#"
              }
            ].map((method, index) => (
              <ContactMethodCard key={index} {...method} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form & Info Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 lg:p-12">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-4">
                  <Send className="w-4 h-4" />
                  <span className="text-sm font-semibold">Send us a message</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
                  Drop Us a Line
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.subject ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                        }`}
                      placeholder="How can we help you?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'
                      }`}
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">Message Sent Successfully!</p>
                      <p className="text-sm text-green-600 dark:text-green-500">We'll get back to you within 2-4 hours.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info & Additional Details */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3 text-blue-50">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-semibold">Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-semibold">Saturday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="font-semibold">Sunday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold">Customer Support</span>
                    <span className="bg-green-500 px-3 py-1 rounded-full text-xs font-bold">24/7</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <HeadphonesIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Need Quick Help?</h3>
                </div>
                <div className="space-y-3">
                  <Link to="/track-order" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors group">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Track Your Order</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Check order status in real-time</div>
                  </Link>
                  <a href="#" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors group">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Return & Refund</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Easy 30-day return policy</div>
                  </a>
                  <a href="#faq" className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors group">
                    <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">FAQs</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Find answers to common questions</div>
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-xl">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Follow Us</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Stay connected and get the latest updates, offers, and news.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, color: 'hover:bg-blue-600', link: '#' },
                    { icon: Twitter, color: 'hover:bg-sky-500', link: '#' },
                    { icon: Instagram, color: 'hover:bg-pink-600', link: '#' },
                    { icon: Linkedin, color: 'hover:bg-blue-700', link: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Common Questions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Quick answers to questions you may have
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isExpanded={expandedFaq === index}
                onToggle={() => setExpandedFaq(expandedFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">Visit Our Office</span>
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Location</h3>
                <div className="space-y-4 text-blue-50">
                  <p className="text-lg">
                    <strong className="text-white">ShopNow Headquarters</strong><br />
                    123 Shopping Street, 4th Floor<br />
                    Connaught Place, New Delhi<br />
                    Delhi - 110001, India
                  </p>
                  <p className="text-lg">
                    We'd love to see you in person! Drop by during our office hours or schedule an appointment for a personalized consultation.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 h-96 lg:h-auto flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">Interactive Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Map integration coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Method Card Component
function ContactMethodCard({ icon: Icon, title, info, subInfo, color, link, index, isAction, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={link || '#'}
      onClick={isAction ? onClick : undefined}
      ref={ref}
      className={`block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-900 dark:text-white font-semibold">{info}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subInfo}</p>
    </a>
  );
}

// FAQ Item Component
function FaqItem({ question, answer, isExpanded, onToggle }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">{question}</span>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isExpanded && (
        <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}
