import Link from 'next/link'
import { 
  Megaphone, 
  Calendar, 
  AlertCircle, 
  ShoppingCart, 
  Phone, 
  MessageSquare,
  Users,
  TreePine,
  ArrowRight,
  Bell,
  Star
} from 'lucide-react'

const features = [
  {
    title: 'Community Announcements',
    description: 'Stay updated with official notices, community updates, and important announcements from local authorities.',
    icon: Megaphone,
    href: '/dashboard/announcements',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Local Events',
    description: 'Discover and join cultural events, festivals, workshops, and community gatherings in Saharanpur.',
    icon: Calendar,
    href: '/dashboard/events',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Report Issues',
    description: 'Report infrastructure problems, safety concerns, and community issues for prompt resolution.',
    icon: AlertCircle,
    href: '/dashboard/issues',
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Local Marketplace',
    description: 'Buy and sell goods, find local services, and connect with vendors in your neighborhood.',
    icon: ShoppingCart,
    href: '/dashboard/marketplace',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Emergency Contacts',
    description: 'Quick access to verified emergency services, hospitals, police stations, and utility services.',
    icon: Phone,
    href: '/dashboard/emergency',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Community Forum',
    description: 'Engage in discussions, share ideas, and connect with fellow residents in your area.',
    icon: MessageSquare,
    href: '/dashboard/forum',
    color: 'bg-indigo-100 text-indigo-600'
  }
]

const stats = [
  { label: 'Active Users', value: '50+', icon: Users },
  { label: 'Posts This Month', value: '5', icon: Bell },
  { label: 'Community Rating', value: '4.8/5', icon: Star },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-white/95 to-green-50/90 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
            alt="Saharanpur community" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-green-600 rounded-3xl shadow-2xl transform rotate-3">
                  <TreePine className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-green-600 block md:inline">Saharanpur</span>{' '}
              <span className="relative">
                Community Connect
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-green-200 -skew-y-1 -z-10"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-medium leading-relaxed">
              🌿 Your digital gateway to local community life. Stay connected, informed, and engaged with your neighborhood in the beautiful city of Saharanpur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/dashboard/announcements"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/dashboard/events"
                className="group inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl border-2 border-green-600 hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Calendar className="mr-2 h-5 w-5" />
                <span>Explore Events</span>
              </Link>
            </div>
          </div>

          {/* Stats with better styling */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center transform hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                      <stat.icon className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                  <div className="absolute inset-0 bg-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with improved design */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              🚀 Comprehensive Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything Your{' '}
              <span className="text-green-600 relative">
                Community
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 -skew-y-1 -z-10"></div>
              </span>{' '}
              Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From local announcements to emergency contacts, we've got all your community needs covered in one beautiful, easy-to-use platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent rounded-bl-3xl opacity-50"></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              </Link>
            ))}
          </div>

          {/* Additional community highlight */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-white/10 rounded-3xl"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                🌟 Built for Saharanpur, by Saharanpur
              </h3>
              <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
                Celebrating our rich heritage of wooden crafts, beautiful gardens, and strong community bonds through modern technology.
              </p>
              <div className="flex items-center justify-center space-x-8 text-green-100">
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm">Neighborhoods</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80" 
            alt="Community background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            🚀 Join thousands of neighbors
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Connect with Your{' '}
            <span className="relative">
              Community?
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400 -skew-y-1 -z-10 opacity-70"></div>
            </span>
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Be part of the digital transformation of Saharanpur&apos;s neighborhoods. Connect, share, and grow together in our vibrant community platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/announcements"
              className="group inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-2xl hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Start Exploring</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/dashboard/events"
              className="group inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-2xl border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar className="mr-2 h-5 w-5" />
              <span>View Events</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
