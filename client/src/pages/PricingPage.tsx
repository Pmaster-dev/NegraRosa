import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Info, AlertCircle, ShieldAlert, Smartphone, Flame, LifeBuoy, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MainframeLayout from "@/components/MainframeLayout";

// Low-cost / Free Unhackable Disaster Recovery and Stolen Phone Plans
const disasterPricingTiers = [
  {
    name: "Free Community Disaster Plan",
    price: 0,
    interval: "forever",
    description: "100% free unhackable stolen phone and disaster recovery kit for anyone on a tight budget.",
    features: [
      "1-Click Stolen Phone Killswitch (Instant session revocation)",
      "Air-Gapped Zero-Knowledge Printable Recovery Card",
      "12-Word Visual ASL Mnemonic Seed (Deaf-accessible)",
      "Cryptographic Hardware Enclave Detachment",
      "Restore on any $50 replacement phone in 2 minutes",
      "Zero cost, no credit card required ever"
    ],
    cta: "Use Free Recovery Kit",
    popular: false,
    badge: "100% Free"
  },
  {
    name: "Personal Guardian",
    price: 3,
    interval: "month",
    description: "Automated zero-knowledge stolen phone protection. High security that costs not much — $3/month (or $29/year).",
    features: [
      "Everything in Free Community Plan",
      "3-of-5 Trusted Guardian Social Recovery (Family/Deaf peers)",
      "Automated Zero-Knowledge Cloud Backup (E2E Encrypted)",
      "Anti-SIM Swap & Carrier Hijack Defense",
      "Global Stolen Hardware Blacklist Registry",
      "1-Click Fast Re-enrollment on New Phone",
      "Visual SMS & Notification Shield"
    ],
    cta: "Start Protection ($3/mo)",
    popular: true,
    badge: "Not Much — $3/Mo"
  },
  {
    name: "Family & Circle Emergency",
    price: 7,
    interval: "month",
    description: "Mutual emergency guardian network across up to 5 family members, deaf peers, or team phones.",
    features: [
      "Protects up to 5 family or circle phones",
      "Mutual Peer Guardian Sharding (Shamir Secrets)",
      "Instant Family Member Stolen Phone Alert",
      "Coordinated Remote Session Severing",
      "Deaf-accessible visual emergency coordination",
      "Fast replacement phone onboarding"
    ],
    cta: "Protect 5 Phones ($7/mo)",
    popular: false,
    badge: "Family & Circle"
  }
];

// Define pricing tiers based on organization type and size
const pricingTiers = [
  {
    name: "Startup",
    staffSize: "1-10",
    price: 79,
    interval: "month",
    description: "For deaf-led startups just beginning their security journey.",
    features: [
      "Essential security assessment",
      "Multi-factor authentication",
      "Visual security guidance",
      "Email support",
      "Deaf-first interface",
      "Basic security monitoring"
    ],
    cta: "Get Started",
    popular: false,
    badge: null
  },
  {
    name: "Small Business",
    staffSize: "11-50",
    price: 149,
    interval: "month",
    description: "For small deaf-run businesses and organizations.",
    features: [
      "Comprehensive security assessment",
      "Multi-factor authentication",
      "End-to-end encryption basics",
      "Visual security guidance",
      "Email & chat support",
      "Deaf-first interface",
      "Security badges for managers"
    ],
    cta: "Start Free Trial",
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "Medium Organization",
    staffSize: "51-200",
    price: 349,
    interval: "month",
    description: "For growing deaf-run organizations with complex needs.",
    features: [
      "Advanced security assessment",
      "End-to-end encryption",
      "Custom security badges",
      "ASL video support",
      "Vulnerability scanning",
      "Priority email & chat support",
      "Team-based security training",
      "Department-level security zones"
    ],
    cta: "Start Free Trial",
    popular: false,
    badge: null
  },
  {
    name: "Enterprise",
    staffSize: "201-400+",
    price: 749,
    interval: "month",
    description: "For large organizations with enterprise-grade security needs.",
    features: [
      "Complete security suite",
      "Custom security policies",
      "Deaf-first training modules",
      "Dedicated ASL security advisor",
      "Real-time threat monitoring",
      "Advanced detection & response",
      "Visual analytics dashboard",
      "24/7 priority support",
      "Custom security integrations"
    ],
    cta: "Contact Sales",
    popular: false,
    badge: "Enterprise"
  }
];

// Define special pricing tiers
const specialPricingTiers = [
  {
    name: "Non-Profit",
    price: 99,
    interval: "month",
    discount: "35% off regular pricing",
    description: "Special pricing for deaf-focused non-profit organizations.",
    features: [
      "Tailored to non-profit needs",
      "All features of Small Business plan",
      "Grant compliance features",
      "Donor data protection",
      "Additional seats at no cost"
    ],
    cta: "Apply Now",
    badge: "Discounted"
  },
  {
    name: "Chamber of Commerce",
    price: 129,
    interval: "month",
    discount: "25% off regular pricing",
    description: "For deaf-community chambers and business associations.",
    features: [
      "Multi-organization dashboard",
      "Member business monitoring",
      "Community security alerts",
      "Group training sessions",
      "Security newsletters"
    ],
    cta: "Learn More",
    badge: "Specialized"
  },
  {
    name: "Educational Institution",
    price: 199,
    interval: "month",
    discount: "45% off enterprise pricing",
    description: "For deaf schools, colleges and educational programs.",
    features: [
      "Student data protection",
      "Classroom security tools",
      "Visual learning materials",
      "Faculty & staff training",
      "Campus-wide protection"
    ],
    cta: "Apply Now",
    badge: "Education"
  }
];

// Accessibility features included in all plans
const accessibilityFeatures = [
  "Visual security guidance",
  "Deaf-first interface",
  "ASL video translations",
  "Visual alert system",
  "No audio dependencies"
];

export default function PricingPage() {
  return (
    <MainframeLayout>
      <div className="container py-12 mx-auto">
        
        {/* Emergency Disaster Recovery Banner */}
        <div className="mb-10 p-4 sm:p-5 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 border-2 border-red-300 dark:border-red-900 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-full flex-shrink-0">
              <Flame className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
                <span>Phone Stolen or Hardware Disaster?</span>
                <Badge variant="destructive" className="text-[10px] uppercase">Immediate Free Protocol</Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                You do not need an expensive subscription. Trigger our 1-click remote killswitch and air-gapped recovery card for <strong>$0 free forever</strong>.
              </p>
            </div>
          </div>
          <Link href="/disaster-recovery">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 whitespace-nowrap text-xs sm:text-sm">
              <span>Emergency Action Console</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Affordable security solutions designed specifically for deaf individuals, families, and organizations.
          </p>
        </div>

        {/* SECTION 1: Unhackable Disaster Recovery & Stolen Phone Plans (Not Much / Free) */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Unhackable Disaster & Stolen Phone Recovery</span>
            </div>
            <h2 className="text-3xl font-extrabold text-center">Plans That Don't Cost Much</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm sm:text-base">
              Mathematically unhackable zero-knowledge recovery for your smartphone, biometric IDs, and credentials — starting at $0.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disasterPricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`border flex flex-col justify-between relative ${
                  tier.popular ? 'border-purple-500 shadow-lg shadow-purple-100 dark:shadow-purple-950/20' : 'border-gray-200'
                }`}
              >
                {tier.badge && (
                  <Badge className={`absolute top-4 right-4 ${tier.popular ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'}`}>
                    {tier.badge}
                  </Badge>
                )}
                <div>
                  <CardHeader>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-gray-500">/{tier.interval}</span>
                    </div>
                    <CardDescription className="mt-3 text-xs sm:text-sm">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
                <CardFooter className="pt-4 border-t">
                  <Link href="/disaster-recovery" className="w-full">
                    <Button className={`w-full ${tier.popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : ''}`} variant={tier.popular ? 'default' : 'outline'}>
                      {tier.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Organization Size Pricing Tiers */}
        <h2 className="text-2xl font-bold mb-6 text-center">Business & Organization Pricing</h2>
        <p className="text-gray-600 mb-8 text-center">Choose the plan that fits your organization's size and security needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border ${tier.popular ? 'border-purple-500 shadow-lg shadow-purple-100' : 'border-gray-200'} relative`}
            >
              {tier.badge && (
                <Badge className="absolute top-4 right-4 bg-purple-500">{tier.badge}</Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <div className="text-sm font-medium text-gray-500 mt-1">
                  {tier.staffSize} staff members
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-gray-500">/{tier.interval}</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${tier.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`}>
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Special Pricing Tiers */}
        <h2 className="text-2xl font-bold my-8 text-center">Special Organization Pricing</h2>
        <p className="text-gray-600 mb-8 text-center">Specialized pricing for non-profits, chambers, and educational institutions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {specialPricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className="border border-purple-300 relative"
            >
              {tier.badge && (
                <Badge className="absolute top-4 right-4 bg-purple-500">{tier.badge}</Badge>
              )}
              <CardHeader className="bg-purple-50">
                <CardTitle>{tier.name}</CardTitle>
                <div className="text-sm font-medium text-purple-700 mt-1">
                  {tier.discount}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-gray-500">/{tier.interval}</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Accessibility features included */}
        <div className="bg-purple-50 rounded-lg p-8 mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold">All Plans Include Deaf-First Features</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-5 w-5 ml-2 text-purple-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">These accessibility features come standard with all plans because we believe security should be accessible to everyone.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-5 w-5 text-purple-500 mr-3" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">My phone was stolen. How does the Free / $3 plan protect me?</h3>
              <p className="text-gray-600">
                You can immediately use our 1-Click Remote Killswitch from any friend's device or web browser. Because of our Zero-Knowledge hardware enclave architecture, your master keys never live unencrypted on the phone. The thief cannot access your identity or accounts, and you can restore onto any cheap replacement device using your paper recovery card or trusted guardians.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">Why do these plans cost so little ($0 - $3/mo) compared to traditional identity theft insurance?</h3>
              <p className="text-gray-600">
                Traditional identity companies charge $30–$60/month to pay for legacy call centers and reactive credit bureau alerts. NegraRosa uses client-side mathematics and air-gapped cryptographic keys. Math doesn't require high overhead, so we pass 100% of those savings directly to our users.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">How can a deaf person recover their accounts without hearing audio phone support or SMS OTP?</h3>
              <p className="text-gray-600">
                All recovery workflows are visual-first. Our 12-word recovery seeds use visual ASL symbols, and our Shamir Guardian sharding lets trusted deaf peers vouch for you visually without requiring audio phone calls or SMS OTP codes that thieves might intercept.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">Do you offer discounts for nonprofits?</h3>
              <p className="text-gray-600">Yes, we offer special pricing for nonprofit organizations serving the deaf community. Please contact our sales team for details.</p>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">Absolutely. You can upgrade, downgrade, or cancel your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, ACH transfers, and invoicing for annual enterprise plans.</p>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">Yes! The Free Community Disaster Plan is $0 forever. For our paid guardian and business tiers, we offer a 14-day free trial with no credit card required.</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gray-900 text-white rounded-lg p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-xl mb-8">Our team can create a tailored security package specifically for your organization's needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-gray-900 hover:bg-gray-100">
                Schedule a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainframeLayout>
  );
}