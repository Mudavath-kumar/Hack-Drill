import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Cloud,
  TrendingUp,
  Shield,
  Users,
  Zap,
  Globe,
  Satellite,
  Brain,
  Camera,
  Smartphone,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Quote,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-green-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Leaf className="h-10 w-10 text-green-600" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  FarmWise
                </span>
                <p className="text-xs text-gray-500 font-medium">AI-Powered Agriculture</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                <Link href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                  Features
                </Link>
                <Link href="#solutions" className="text-gray-700 hover:text-green-600 transition-colors">
                  Solutions
                </Link>
                <Link href="#pricing" className="text-gray-700 hover:text-green-600 transition-colors">
                  Pricing
                </Link>
                <Link href="/demo" className="text-gray-700 hover:text-green-600 transition-colors">
                  Demo
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-green-700 hover:text-green-800 font-medium">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-green-100 text-green-800 px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Farm Intelligence
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Farming
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 text-gray-700">Starts Here</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your farm with AI-driven insights, real-time monitoring, and precision agriculture. Increase
              yields by up to <span className="font-bold text-green-600">40%</span> while reducing costs by{" "}
              <span className="font-bold text-blue-600">25%</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Free 30-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-6 border-2 border-green-300 text-green-700 hover:bg-green-50 shadow-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Live Demo
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-purple-500" />
                <span>Award-Winning Platform</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Trusted by Farmers Worldwide</h2>
            <p className="text-xl text-green-100">Real-time impact across the globe</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "125K+", label: "Active Farmers", icon: Users },
              { number: "8.2M", label: "Acres Monitored", icon: Globe },
              { number: "42%", label: "Avg. Yield Increase", icon: TrendingUp },
              { number: "24/7", label: "Real-time Monitoring", icon: Satellite },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-green-200 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section id="features" className="py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered Intelligence
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Precision Agriculture
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets practical farming solutions. Monitor, analyze, and optimize every aspect of your
              farm operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Satellite,
                title: "Satellite Crop Monitoring",
                description: "Real-time NDVI analysis, crop health mapping, and growth stage tracking from space",
                features: [
                  "Weekly satellite imagery",
                  "NDVI health maps",
                  "Growth stage detection",
                  "Yield predictions",
                ],
                color: "from-blue-500 to-indigo-600",
                badge: "AI-Powered",
              },
              {
                icon: Camera,
                title: "Disease & Pest Detection",
                description: "AI-powered image recognition to identify crop diseases and pest infestations instantly",
                features: [
                  "Photo-based diagnosis",
                  "Treatment recommendations",
                  "Outbreak predictions",
                  "Severity assessment",
                ],
                color: "from-red-500 to-pink-600",
                badge: "Computer Vision",
              },
              {
                icon: Cloud,
                title: "Hyperlocal Weather",
                description: "Precision weather forecasting down to field-level with 7-day accuracy",
                features: [
                  "Field-specific forecasts",
                  "Severe weather alerts",
                  "Irrigation scheduling",
                  "Spray windows",
                ],
                color: "from-cyan-500 to-blue-600",
                badge: "Real-time",
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description: "Live commodity prices, market trends, and optimal selling recommendations",
                features: ["Real-time pricing", "Market predictions", "Contract opportunities", "Price alerts"],
                color: "from-green-500 to-emerald-600",
                badge: "Live Data",
              },
              {
                icon: Brain,
                title: "Smart Recommendations",
                description: "AI-driven crop selection, planting schedules, and resource optimization",
                features: ["Crop recommendations", "Planting calendars", "Resource optimization", "ROI predictions"],
                color: "from-purple-500 to-violet-600",
                badge: "Machine Learning",
              },
              {
                icon: Smartphone,
                title: "Mobile Field App",
                description: "Complete farm management in your pocket with offline capabilities",
                features: ["Offline functionality", "Field mapping", "Task management", "Photo documentation"],
                color: "from-orange-500 to-red-600",
                badge: "Mobile First",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-white/90 text-gray-700 text-xs">
                      {feature.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Solutions for Every
              <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Type of Farm
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Small Family Farms",
                subtitle: "1-100 acres",
                price: "$29/month",
                features: [
                  "Basic weather monitoring",
                  "Crop recommendations",
                  "Market price alerts",
                  "Mobile app access",
                  "Email support",
                ],
                popular: false,
              },
              {
                title: "Commercial Operations",
                subtitle: "100-1000 acres",
                price: "$99/month",
                features: [
                  "Advanced satellite monitoring",
                  "AI disease detection",
                  "Precision weather forecasting",
                  "Market intelligence",
                  "Priority support",
                  "Custom integrations",
                ],
                popular: true,
              },
              {
                title: "Enterprise Farms",
                subtitle: "1000+ acres",
                price: "Custom",
                features: [
                  "Full platform access",
                  "Dedicated account manager",
                  "Custom AI models",
                  "API access",
                  "On-site training",
                  "24/7 phone support",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "ring-2 ring-green-500 scale-105" : ""} bg-white/80 backdrop-blur-sm border-0 shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                    <div className="text-4xl font-bold text-green-600 mb-2">{plan.price}</div>
                    {plan.price !== "Custom" && <p className="text-gray-500">per farm</p>}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-green-600 to-blue-600" : "bg-gray-900"} hover:opacity-90`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Farmers Are Saying</h2>
            <p className="text-xl text-gray-600">Real results from real farmers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Corn & Soybean Farmer",
                location: "Iowa, USA",
                quote:
                  "FarmWise helped me increase my corn yield by 35% last season. The AI recommendations were spot-on!",
                rating: 5,
              },
              {
                name: "Miguel Rodriguez",
                role: "Organic Vegetable Farm",
                location: "California, USA",
                quote:
                  "The disease detection feature saved my tomato crop. Caught early blight before I even noticed it.",
                rating: 5,
              },
              {
                name: "David Chen",
                role: "Wheat Farmer",
                location: "Kansas, USA",
                quote: "Market intelligence helped me time my wheat sales perfectly. Made an extra $15,000 this year.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-green-500 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Transform Your Farm?</h2>
          <p className="text-xl text-green-100 mb-12 leading-relaxed">
            Join thousands of farmers who are already using FarmWise to increase their yields, reduce costs, and make
            data-driven decisions. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-12 py-6 bg-white text-gray-900 hover:bg-gray-100 shadow-2xl"
              >
                Start Free 30-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 py-6 border-2 border-white text-white hover:bg-white/10"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-green-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>30-Day Free Trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No Setup Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Leaf className="h-8 w-8 text-green-400" />
                <span className="text-2xl font-bold">FarmWise</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering farmers with AI-driven insights and precision agriculture technology.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Award Winner 2024
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FarmWise. All rights reserved. Transforming agriculture through technology.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
