import { Switch, Route, useLocation, Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import MainframeDashboard from "@/pages/MainframeDashboard";
import WebhookManagement from "@/pages/WebhookManagement";
import AccessibilityPage from "@/pages/AccessibilityPage";
import PricingPage from "@/pages/PricingPage";
import IndividualIdPage from "@/pages/IndividualIdPage";
import DisasterRecoveryPage from "@/pages/DisasterRecoveryPage";
import SupportBubble from "@/components/SupportBubble";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import ScrollToTop from "@/components/ScrollToTop";
import PinkSyncWidget from "@/components/PinkSyncWidget";
import { GestureEasterEgg } from "@/components/GestureEasterEgg";
import { EasterEggHints } from "@/components/EasterEggHints";
import SitemapPage from "@/pages/SitemapPage";
import { Menu, X, ChevronRight, ChevronDown, Github } from "lucide-react";
import "@/styles/ScrollStyles.css";

function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Track dropdown states for mobile accordions
  const [dropdowns, setDropdowns] = useState({
    security: false,
    accessibility: false,
    community: false
  });

  // Toggle a specific dropdown
  const toggleDropdown = (dropdown: keyof typeof dropdowns) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section when clicking on smooth scroll links
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset menu state when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`bg-background border-b border-border sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'shadow-md py-2' : 'py-4'
      }`}
      ref={menuRef}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-lg font-semibold cursor-pointer" data-logo>NegraRosa Security</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center overflow-x-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent">
            <div className="flex space-x-6 py-2 px-4 whitespace-nowrap">
              <SmoothScrollLink href="/" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Home
              </SmoothScrollLink>
              
              <SmoothScrollLink href="/mainframe" className="text-sm font-medium hover:text-purple-600 transition-colors">
                For Organizations
              </SmoothScrollLink>
              
              <div className="relative group">
                <button className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center">
                  Security Features
                  <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border border-border rounded-md shadow-lg p-2 z-10 w-48 transition-all">
                  <SmoothScrollLink href="/demo" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Demo
                  </SmoothScrollLink>
                  <SmoothScrollLink href="/individual-id" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Individual ID
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Authentication
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Data Protection
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Risk Management
                  </SmoothScrollLink>
                </div>
              </div>
              
              <div className="relative group">
                <button className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center">
                  Accessibility
                  <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border border-border rounded-md shadow-lg p-2 z-10 w-48 transition-all">
                  <SmoothScrollLink href="/accessibility" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Voice & Visual Guidance
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Accessibility Settings
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Resources
                  </SmoothScrollLink>
                </div>
              </div>
              
              <SmoothScrollLink href="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Pricing
              </SmoothScrollLink>
              
              <div className="relative group">
                <button className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center">
                  Community
                  <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border border-border rounded-md shadow-lg p-2 z-10 w-48 transition-all">
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Directory
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Events
                  </SmoothScrollLink>
                  <SmoothScrollLink href="#" className="block px-3 py-2 text-sm hover:bg-purple-50 rounded-md">
                    Resources
                  </SmoothScrollLink>
                </div>
              </div>
              
              <SmoothScrollLink href="/webhooks" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Integration
              </SmoothScrollLink>

              <SmoothScrollLink href="/disaster-recovery" className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 transition-colors flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                Stolen Phone Recovery
              </SmoothScrollLink>

              <SmoothScrollLink href="/sitemap" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Sitemap
              </SmoothScrollLink>
            </div>
            
            <div className="ml-6 pl-6 border-l flex items-center space-x-3">
              <a 
                href="https://github.com/NegraRosa/negrarosa-security-framework" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>

              <SmoothScrollLink 
                href="/login" 
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
              >
                Login / Register
              </SmoothScrollLink>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-purple-600 focus:outline-none transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100 mt-4 border-t pt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pb-5">
            <SmoothScrollLink 
              href="/" 
              className="text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              Home
            </SmoothScrollLink>
            
            <SmoothScrollLink 
              href="/mainframe" 
              className="text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              For Organizations
            </SmoothScrollLink>
            
            <div className="border-b border-gray-100 py-1">
              <button 
                onClick={() => toggleDropdown('security')}
                className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-purple-600 transition-colors"
              >
                <span>Security Features</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${dropdowns.security ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-200 ${
                dropdowns.security ? 'max-h-56 mt-2 mb-3' : 'max-h-0'
              }`}>
                <SmoothScrollLink href="/demo" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Demo
                </SmoothScrollLink>
                <SmoothScrollLink href="/individual-id" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Individual ID
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Authentication
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Data Protection
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Risk Management
                </SmoothScrollLink>
              </div>
            </div>
            
            <div className="border-b border-gray-100 py-1">
              <button 
                onClick={() => toggleDropdown('accessibility')}
                className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-purple-600 transition-colors"
              >
                <span>Accessibility</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${dropdowns.accessibility ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-200 ${
                dropdowns.accessibility ? 'max-h-56 mt-2 mb-3' : 'max-h-0'
              }`}>
                <SmoothScrollLink href="/accessibility" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Voice & Visual Guidance
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Accessibility Settings
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Resources
                </SmoothScrollLink>
              </div>
            </div>
            
            <SmoothScrollLink 
              href="/pricing" 
              className="text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              Pricing
            </SmoothScrollLink>
            
            <div className="border-b border-gray-100 py-1">
              <button 
                onClick={() => toggleDropdown('community')}
                className="flex items-center justify-between w-full text-sm font-medium py-2 hover:text-purple-600 transition-colors"
              >
                <span>Community</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${dropdowns.community ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-200 ${
                dropdowns.community ? 'max-h-56 mt-2 mb-3' : 'max-h-0'
              }`}>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Directory
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Events
                </SmoothScrollLink>
                <SmoothScrollLink href="#" className="block py-1 text-sm hover:text-purple-600 transition-colors">
                  Resources
                </SmoothScrollLink>
              </div>
            </div>
            
            <SmoothScrollLink 
              href="/webhooks" 
              className="text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              Integration
            </SmoothScrollLink>

            <SmoothScrollLink 
              href="/disaster-recovery" 
              className="text-sm font-medium py-2 text-red-600 dark:text-red-400 hover:text-red-700 transition-colors flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              Stolen Phone & Disaster Recovery
            </SmoothScrollLink>
            
            <SmoothScrollLink 
              href="/sitemap" 
              className="text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              Sitemap & Security Hub
            </SmoothScrollLink>

            <a 
              href="https://github.com/NegraRosa/negrarosa-security-framework" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm font-medium py-2 hover:text-purple-600 transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Repository</span>
            </a>
            
            <div className="pt-4">
              <SmoothScrollLink 
                href="/login" 
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Login / Register
              </SmoothScrollLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">NegraRosa Security</h3>
            <p className="text-sm text-gray-300 mb-4">
              Deaf-first security framework empowering organizations with accessible, 
              powerful security solutions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/NegraRosa/negrarosa-security-framework" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-white transition-colors"
                title="GitHub Repository"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-sm text-gray-300 hover:text-white">Home</span></Link></li>
              <li><Link href="/accessibility"><span className="text-sm text-gray-300 hover:text-white">Accessibility</span></Link></li>
              <li><Link href="/individual-id"><span className="text-sm text-gray-300 hover:text-white">Individual ID</span></Link></li>
              <li><Link href="/demo"><span className="text-sm text-gray-300 hover:text-white">Demo</span></Link></li>
              <li><Link href="/disaster-recovery"><span className="text-sm text-red-300 hover:text-white font-medium">Stolen Phone & Disaster</span></Link></li>
              <li><Link href="/sitemap"><span className="text-sm text-gray-300 hover:text-white">Sitemap</span></Link></li>
              <li><Link href="/security-examples"><span className="text-sm text-gray-300 hover:text-white">Security & SDKs</span></Link></li>
              <li><Link href="/login"><span className="text-sm text-gray-300 hover:text-white">Login/Register</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources & Security</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/NegraRosa/negrarosa-security-framework" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-300 hover:text-white flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5 inline" />
                  GitHub Repository
                </a>
              </li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">Sitemap XML Feed</a></li>
              <li><a href="/.well-known/security.txt" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">security.txt (RFC 9116)</a></li>
              <li><a href="https://github.com/NegraRosa/negrarosa-security-framework/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">SECURITY.md Policy</a></li>
              <li><a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white">Robots.txt</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Cookies Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div>
            © {new Date().getFullYear()} MBTQ UNIVERSE. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            Designed with accessibility as our priority.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Router({ initialUserId }: { initialUserId: number }) {
  const [location, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <Switch>
          <Route path="/">
            <Dashboard userId={initialUserId} />
          </Route>
          <Route path="/mainframe">
            <MainframeDashboard userId={initialUserId} />
          </Route>
          <Route path="/webhooks">
            <WebhookManagement />
          </Route>
          <Route path="/accessibility">
            <AccessibilityPage />
          </Route>
          <Route path="/pricing">
            <PricingPage />
          </Route>
          <Route path="/individual-id">
            <IndividualIdPage />
          </Route>
          <Route path="/demo">
            <div className="container mx-auto py-8">
              <h1 className="text-3xl font-bold mb-6">Interactive Demo</h1>
              <p className="text-muted-foreground mb-8">
                Experience the power of NegraRosa Security with our interactive demos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-medium mb-2">User Experience Demo</h3>
                  <p className="text-muted-foreground mb-4">
                    See how verification works from the user's perspective
                  </p>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                    Try Demo
                  </button>
                </div>
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-medium mb-2">Business Integration Demo</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore how businesses can integrate our verification system
                  </p>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
                    Try Demo
                  </button>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/sitemap">
            <SitemapPage />
          </Route>
          <Route path="/disaster-recovery">
            <DisasterRecoveryPage />
          </Route>
          <Route path="/stolen-phone">
            <DisasterRecoveryPage />
          </Route>
          <Route path="/emergency">
            <DisasterRecoveryPage />
          </Route>
          <Route path="/security-examples">
            <SitemapPage />
          </Route>
          <Route path="/login">
            <div className="container mx-auto py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold mb-6">Login or Register</h1>
                <div className="bg-card border rounded-lg p-6 shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 border rounded-md" 
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <button className="w-full bg-primary text-primary-foreground p-2 rounded-md">
                      Login
                    </button>
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">
                        Don't have an account? <a href="#" className="text-primary hover:underline">Register</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

interface AppProps {
  initialUserId: number;
}

function App({ initialUserId }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router initialUserId={initialUserId} />
      <ScrollToTop showBelow={250} />
      <PinkSyncWidget />
      <SupportBubble 
        onASLRequest={() => {
          console.log("ASL support requested");
          // TODO: Implement ASL support request functionality
        }}
        onVideoChat={() => {
          console.log("Video chat requested");
          // TODO: Implement video chat functionality
        }}
        onTextChat={() => {
          console.log("Text chat requested");
          // TODO: Implement text chat functionality
        }}
      />
      <Toaster />
      <GestureEasterEgg />
      <EasterEggHints />
    </QueryClientProvider>
  );
}

export default App;
