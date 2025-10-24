import { MetaTags } from "@/components/MetaTags";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Users, Database, Cookie } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Privacy Policy"
        description="Pitt Party Bus privacy policy. Learn how we collect, use, and protect your personal information when you use our party bus rental services."
        canonical="/privacy"
      />
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="py-12 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border shadow-card-custom mb-8">
            <CardHeader>
              <div className="flex items-center">
                <Eye className="h-6 w-6 text-accent mr-3" />
                <CardTitle>Our Commitment to Your Privacy</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground">
                At Pitt Party Bus, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Database className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Information We Collect</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <p>When you book our services, we may collect:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Name and contact information (phone number, email address)</li>
                    <li>Event details (date, time, location, number of passengers)</li>
                    <li>Payment information (processed securely through our payment processor)</li>
                    <li>Special requests or requirements for your event</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                  <p>We may automatically collect certain information about your device, including:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>How We Use Your Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process your bookings and provide our transportation services</li>
                  <li>Communicate with you about your reservation and any changes</li>
                  <li>Send you confirmations, receipts, and service-related information</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our services and website functionality</li>
                  <li>Send promotional materials (only with your consent)</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Lock className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Information Sharing and Disclosure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (payment processors, email services)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition of our business</li>
                </ul>
                <p className="mt-4">
                  All third-party service providers are required to maintain the confidentiality and security of your personal information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Cookie className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Cookies and Tracking Technologies</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and usage patterns</li>
                  <li>Provide personalized content and advertisements</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings, but disabling them may affect website functionality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-accent mr-3" />
                  <CardTitle>Data Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                  <li>Regular security assessments and updates</li>
                  <li>Restricted access to personal information</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Request correction of inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your personal information</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at Pittpartybus412@gmail.com or call (412) 385-3877.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card-custom">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Pitt Party Bus</strong></p>
                  <p>2101 Centre Ave, Pittsburgh, PA 15219</p>
                  <p>Phone: <a href="tel:4123853877" className="text-accent hover:underline">(412) 385-3877</a></p>
                  <p>Email: <a href="mailto:Pittpartybus412@gmail.com" className="text-accent hover:underline">Pittpartybus412@gmail.com</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
