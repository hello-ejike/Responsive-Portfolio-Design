import React, { useEffect, useState, useRef } from "react";
import { Menu, X, ArrowRight, TrendingUp, Users, Target, Workflow, Lightbulb, Award, Linkedin, Twitter, Mail } from "lucide-react";
function useIntersectionObserver(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.2
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref]);
  return isIntersecting;
}
function useScrollAnimation(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref]);
  return isVisible;
}
function useCountUp(endValue: string, duration: number = 2000, delay: number = 0, isVisible: boolean = false) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(endValue.replace(/[^0-9]/g, ""));
  const prefix = endValue.match(/^\D+/) || "";
  const suffix = endValue.match(/\D+$/) || "";
  useEffect(() => {
    if (!isVisible) return;
    let startTime: number | null = null;
    let frameId: number;
    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const elapsed = currentTime - startTime;
      if (elapsed < delay) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [numericValue, duration, delay, isVisible]);
  return `${prefix}${count}${suffix}`;
}
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      const progress = currentScroll / totalScroll * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-amber-400 transition-all duration-300" style={{
      width: `${scrollProgress}%`
    }} />
    </div>;
}
export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const metricsRef = useRef(null);
  const isMetricsVisible = useIntersectionObserver(metricsRef);
  const processRef = useRef(null);
  const impactRef = useRef(null);
  const articlesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const isProcessVisible = useScrollAnimation(processRef);
  const isImpactVisible = useScrollAnimation(impactRef);
  const isArticlesVisible = useScrollAnimation(articlesRef);
  const isAboutVisible = useScrollAnimation(aboutRef);
  const isContactVisible = useScrollAnimation(contactRef);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-50 relative">
      <ScrollProgress />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
        transform: "translate(-50%, -50%)",
        transition: "all 1s cubic-bezier(0.075, 0.82, 0.165, 1)"
      }} />
      </div>
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <span className="text-xl font-semibold text-teal-900">
              Chinedu Uzodinma
            </span>
            <nav className="hidden md:flex space-x-8">
              {["Articles", "Impact", "About", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-navy-800 transition-colors">
                  {item}
                </a>)}
            </nav>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && <nav className="md:hidden border-t">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-3">
                {["Articles", "Impact", "About", "Contact"].map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-navy-800 transition-colors" onClick={() => setIsMenuOpen(false)}>
                    {item}
                  </a>)}
              </div>
            </div>
          </nav>}
      </header>
      <main className="pt-20">
        <section className="bg-gradient-to-r from-teal-900 to-teal-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000_0%,#00000015_100%)]" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#fff_0,#fff_1px,#0000_0,#0000_50px)]" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[90vh] flex items-center">
            <div className="max-w-4xl animate-slide-up">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-teal-800/40 rounded-full mb-8 border border-teal-700">
                <Award className="text-amber-400" size={20} />
                <span className="text-amber-400">RevOps Certified</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Sustainable Growth Architect with
                <span className="text-amber-400 block mt-2">
                  Creative Operational Rigor
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
                Transforming market opportunities into measurable revenue growth
                through innovative RevOps strategies and jugaad mindset.
              </p>
              <div className="flex flex-wrap gap-4 mt-12">
                <a href="#impact" className="group bg-amber-400 text-teal-900 px-8 py-4 rounded-lg hover:bg-amber-500 transition-all duration-300 inline-flex items-center justify-center hover:transform hover:translate-y-[-2px]">
                  View Impact Stories
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <a href="#process" className="group border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center hover:transform hover:translate-y-[-2px]">
                  Explore My Process
                  <Workflow className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section ref={metricsRef} className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
              icon: TrendingUp,
              metric: "$10M+",
              label: "Revenue Generated",
              description: "Through strategic partnerships & market expansion"
            }, {
              icon: Target,
              metric: "35%",
              label: "Average Growth Rate",
              description: "Consistent year-over-year improvement"
            }, {
              icon: Lightbulb,
              metric: "50+",
              label: "Strategic Partnerships",
              description: "Built through innovative RevOps approach"
            }].map((item, index) => <div key={index} className={`
                    transform transition-all duration-700 
                    ${isMetricsVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  `} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-teal-900 text-amber-400 mb-6">
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-4xl font-bold text-teal-900 mb-2">
                      {useCountUp(item.metric, 2000, index * 200, isMetricsVisible)}
                    </h3>
                    <p className="text-lg font-semibold text-teal-800 mb-2">
                      {item.label}
                    </p>
                    <p className="text-teal-600">{item.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        <section ref={processRef} id="process" className="py-20 bg-gradient-to-br from-teal-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl md:text-4xl font-bold text-teal-900 mb-16 text-center transform transition-all duration-700 ${isProcessVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
              Revenue Operations Methodology
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
              step: "1",
              title: "Opportunity Analysis",
              description: "Deep market research and data-driven opportunity identification",
              icon: Target
            }, {
              step: "2",
              title: "Strategy Development",
              description: "Custom RevOps framework implementation and goal setting",
              icon: Workflow
            }, {
              step: "3",
              title: "Partnership Building",
              description: "Strategic relationship development and ecosystem creation",
              icon: Users
            }, {
              step: "4",
              title: "Growth Execution",
              description: "Systematic implementation with continuous optimization",
              icon: TrendingUp
            }].map((item, index) => <div key={index} className={`relative p-6 rounded-2xl bg-white border border-teal-100 hover:shadow-lg transition-all duration-500 transform hover:scale-105 ${isProcessVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-teal-900 text-amber-400 flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="mb-4 text-teal-900">
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-teal-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-teal-600">{item.description}</p>
                </div>)}
            </div>
          </div>
        </section>
        <section ref={impactRef} id="impact" className="py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-16 text-center">
              Impact Stories
            </h2>
            <div className="space-y-12">
              {[{
              title: "Global Market Expansion",
              impact: "$5M+ Revenue Growth",
              timeline: "12 months",
              challenge: "Limited market presence in APAC region",
              solution: "Implemented RevOps framework for market entry",
              results: ["40% Year-over-Year growth", "15 new strategic partnerships", "3 new market territories"]
            }, {
              title: "Digital Transformation",
              impact: "35% Efficiency Increase",
              timeline: "9 months",
              challenge: "Fragmented sales and operations processes",
              solution: "Custom RevOps digital transformation strategy",
              results: ["50% reduction in sales cycle", "90% customer satisfaction", "2x team productivity"]
            }, {
              title: "Partnership Ecosystem",
              impact: "20+ Enterprise Deals",
              timeline: "18 months",
              challenge: "Limited enterprise market access",
              solution: "Strategic partnership program development",
              results: ["$3M+ in partnership revenue", "5 Fortune 500 clients", "3 industry awards"]
            }].map((story, index) => <div key={index} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isImpactVisible ? "translate-x-0 opacity-100" : index % 2 === 0 ? "-translate-x-20" : "translate-x-20 opacity-0"}`} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <div className="grid md:grid-cols-3 gap-6 p-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-teal-900">
                        {story.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-amber-500 font-semibold">
                        <TrendingUp size={20} />
                        <span>{story.impact}</span>
                      </div>
                      <div className="text-teal-600">
                        Timeline: {story.timeline}
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">
                          Challenge:
                        </h4>
                        <p className="text-teal-600">{story.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">
                          Solution:
                        </h4>
                        <p className="text-teal-600">{story.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-teal-800 mb-2">
                          Key Results:
                        </h4>
                        <ul className="list-disc list-inside text-teal-600 space-y-1">
                          {story.results.map((result, i) => <li key={i}>{result}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        <section ref={articlesRef} id="articles" className="py-20 bg-gradient-to-br from-teal-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-16 text-center">
              Featured Insights
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[{
              title: "RevOps: The Future of Business Growth",
              category: "Strategy",
              date: "June 2023",
              readTime: "8 min read",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
              summary: "How Revenue Operations is transforming business growth strategies in 2023"
            }, {
              title: "Building Sustainable Partnership Ecosystems",
              category: "Partnerships",
              date: "May 2023",
              readTime: "6 min read",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
              summary: "A strategic approach to developing lasting business partnerships"
            }, {
              title: "Jugaad Innovation in Modern Business",
              category: "Innovation",
              date: "April 2023",
              readTime: "10 min read",
              image: "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=1000",
              summary: "Applying creative problem-solving in today's business landscape"
            }].map((article, index) => <div key={index} className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${isArticlesVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`} style={{
              transitionDelay: `${index * 200}ms`
            }}>
                  <div className="relative">
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-teal-900 text-amber-400 rounded-full text-sm">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-teal-600 mb-3">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-teal-900">
                      {article.title}
                    </h3>
                    <p className="text-teal-600 mb-4">{article.summary}</p>
                    <a href="#" className="inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors group">
                      Read More
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        <section ref={aboutRef} id="about" className="py-20 overflow-hidden">
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-700 ${isAboutVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-16 text-center">
                About Me
              </h2>
              <div className="space-y-8">
                <p className="text-lg text-teal-700 leading-relaxed">
                  With over 3 years of experience in Business Development and a
                  RevOps certification, I specialize in creating sustainable
                  growth strategies that combine operational excellence with
                  innovative thinking.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-teal-900">
                      Expertise
                    </h3>
                    <ul className="space-y-3">
                      {["Revenue Operations Strategy", "Partnership Development", "Market Expansion", "Digital Transformation", "Growth Strategy", "Business Development"].map((skill, index) => <li key={index} className="flex items-center text-teal-700">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-3" />
                          {skill}
                        </li>)}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-teal-900">
                      Certifications
                    </h3>
                    <ul className="space-y-4">
                      {[{
                      name: "RevOps Certification",
                      org: "RevOps Institute",
                      year: "2023"
                    }, {
                      name: "Strategic Partnership Management",
                      org: "Business Growth Academy",
                      year: "2022"
                    }, {
                      name: "Digital Business Transformation",
                      org: "Digital Strategy Institute",
                      year: "2021"
                    }].map((cert, index) => <li key={index} className="p-4 bg-teal-50 rounded-lg">
                          <div className="font-semibold text-teal-900">
                            {cert.name}
                          </div>
                          <div className="text-teal-600">
                            {cert.org} • {cert.year}
                          </div>
                        </li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={contactRef} id="contact" className="py-20 bg-gradient-to-br from-teal-50 to-white overflow-hidden">
          <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-700 ${isContactVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-8">
                Let's Connect
              </h2>
              <p className="text-lg text-teal-700 mb-12">
                Interested in discussing business growth opportunities or
                strategic partnerships? Let's schedule a conversation about how
                we can create sustainable growth together.
              </p>
              <div className="space-y-6">
                <a href="mailto:chinedu@example.com" className="block w-full bg-teal-900 text-white px-8 py-4 rounded-lg hover:bg-teal-800 transition-colors duration-300">
                  Schedule a Call
                </a>
                <div className="flex justify-center space-x-8 mt-12">
                  {[{
                  icon: Linkedin,
                  href: "#",
                  label: "LinkedIn"
                }, {
                  icon: Twitter,
                  href: "#",
                  label: "Twitter"
                }, {
                  icon: Mail,
                  href: "mailto:chinedu@example.com",
                  label: "Email"
                }].map((social, index) => <a key={index} href={social.href} className="group relative p-3 bg-teal-50 rounded-full hover:bg-teal-100 transition-all duration-300" aria-label={social.label}>
                      <social.icon size={24} className="text-teal-900 transform group-hover:scale-110 transition-transform duration-300" />
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-teal-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {social.label}
                      </span>
                    </a>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-teal-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-teal-200">
              © {new Date().getFullYear()} Chinedu Uzodinma
            </p>
            <p className="text-sm mt-2 text-teal-300">
              Revenue Operations & Business Growth Strategy
            </p>
          </div>
        </div>
      </footer>
    </div>;
}