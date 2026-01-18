import { useEffect, useState, useRef } from 'react';
import {
  Heart,
  Users,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
  Star,
  Package,
  Truck,
  HeadphonesIcon
} from 'lucide-react';

export default function About() {
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    cities: 0,
    rating: 0
  });

  useEffect(() => {
    const targets = {
      customers: 12450,
      products: 876,
      cities: 7,
      rating: 4.9
    };

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        customers: Math.floor(progress * targets.customers),
        products: Math.floor(progress * targets.products),
        cities: Math.floor(progress * targets.cities),
        rating: parseFloat((progress * targets.rating).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/image%201.jpg')] bg-cover bg-center opacity-10"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Trusted by Thousands</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 animate-fade-in-up">
            About ShopNow
          </h1>

          <p className="text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed text-blue-50 animate-fade-in-up delay-200">
            Your trusted destination for quality products, exceptional service, and an unparalleled shopping experience that brings joy to every purchase.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-fade-in-up delay-400">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 min-w-[140px] transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold">{counters.customers.toLocaleString()}+</div>
              <div className="text-sm mt-2 text-blue-100">Happy Customers</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 min-w-[140px] transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold">{counters.products}+</div>
              <div className="text-sm mt-2 text-blue-100">Products</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 min-w-[140px] transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold">{counters.cities}+</div>
              <div className="text-sm mt-2 text-blue-100">Cities Served</div>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 min-w-[140px] transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold flex items-center justify-center gap-1">
                {counters.rating} <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
              </div>
              <div className="text-sm mt-2 text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Story</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
                Crafting Shopping Experiences Since Day One
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded with a vision to revolutionize online shopping, <span className="font-bold text-blue-600 dark:text-blue-400">ShopNow</span> began as a small startup driven by passion and a commitment to excellence. We believed that shopping should be more than just transactions—it should be an experience that delights, inspires, and connects.
                </p>
                <p>
                  From our humble beginnings, we've grown into a trusted platform serving thousands of customers across India. Every product we offer is carefully curated, every service meticulously designed, and every interaction thoughtfully crafted to ensure your satisfaction.
                </p>
                <p>
                  Today, we stand proud as a community of shoppers, dreamers, and believers who share a common goal: to make quality products accessible to everyone, everywhere. Our journey is fueled by your trust, and we're committed to earning it every single day.
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <img
                  src="/image%206.jpg"
                  alt="Our Story"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <Award className="w-10 h-10" />
                  <div>
                    <div className="font-bold text-2xl">Award Winning</div>
                    <div className="text-sm text-purple-100">Excellence in E-commerce</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/image%2011.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Driven by purpose, guided by values, and committed to making a difference in every customer's life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg text-blue-50 leading-relaxed">
                To empower customers with access to high-quality products at competitive prices, while delivering exceptional service that exceeds expectations. We strive to create a seamless shopping experience that saves time, offers value, and brings joy to every purchase. Our commitment is to build lasting relationships based on trust, transparency, and customer satisfaction.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg text-blue-50 leading-relaxed">
                To become India's most loved and trusted e-commerce platform, recognized for innovation, quality, and customer-centricity. We envision a future where shopping is effortless, personalized, and sustainable—where every customer feels valued and every product tells a story. We aim to set new standards in online retail and inspire positive change in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">What We Stand For</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide every decision we make and every action we take.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Customer First",
                description: "Your satisfaction is our top priority. We listen, we care, and we deliver experiences that exceed expectations every single time.",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Trust & Integrity",
                description: "We build relationships on honesty and transparency. Every product is authentic, every promise is kept, and every interaction is genuine.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Award,
                title: "Quality Excellence",
                description: "We never compromise on quality. From product selection to customer service, excellence is woven into everything we do.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: TrendingUp,
                title: "Innovation",
                description: "We embrace change and continuously evolve. By leveraging technology and creativity, we stay ahead to serve you better.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Users,
                title: "Community",
                description: "We're more than a platform—we're a family. Together, we celebrate diversity, support local businesses, and create positive impact.",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: Globe,
                title: "Sustainability",
                description: "We care about our planet. Through eco-friendly practices and responsible sourcing, we're committed to a greener future.",
                color: "from-emerald-500 to-lime-500"
              }
            ].map((value, index) => (
              <ValueCard key={index} {...value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Why Choose ShopNow?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We go above and beyond to ensure your shopping experience is nothing short of exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Package,
                title: "Curated Selection",
                description: "Every product is handpicked and verified for quality, ensuring you get only the best."
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Lightning-fast shipping across India with real-time tracking and timely updates."
              },
              {
                icon: Shield,
                title: "Secure Payments",
                description: "Bank-grade encryption and multiple payment options for safe, hassle-free transactions."
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                description: "Our dedicated team is always here to help, answer questions, and resolve issues instantly."
              }
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Meet Our Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              The People Behind ShopNow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A passionate team of innovators, dreamers, and problem-solvers dedicated to your satisfaction.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">100+ Dedicated Professionals</h3>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              From customer service representatives to logistics experts, from tech wizards to quality controllers—our diverse team works tirelessly to ensure every aspect of your shopping journey is seamless, enjoyable, and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/image%2012.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of happy customers who trust ShopNow for quality products, exceptional service, and unbeatable value. Your perfect shopping experience is just a click away.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Shopping Now
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Value Card Component
function ValueCard({ icon: Icon, title, description, color, index }) {
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
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${color} flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon: Icon, title, description, index }) {
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
    <div
      ref={ref}
      className={`text-center transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-lg">
        <Icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
