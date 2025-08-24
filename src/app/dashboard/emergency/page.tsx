import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { 
  Phone, 
  Plus, 
  Search,
  Shield,
  Flame,
  Heart,
  Zap,
  MapPin,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

async function getEmergencyContacts() {
  try {
    const contacts = await prisma.emergencyContact.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { isVerified: 'desc' },
        { category: 'asc' },
        { name: 'asc' },
      ],
    })
    return contacts
  } catch (error) {
    console.error('Error fetching emergency contacts:', error)
    return []
  }
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'police':
      return <Shield className="h-6 w-6 text-blue-600" />
    case 'fire':
      return <Flame className="h-6 w-6 text-red-600" />
    case 'medical':
      return <Heart className="h-6 w-6 text-pink-600" />
    case 'utility':
      return <Zap className="h-6 w-6 text-yellow-600" />
    default:
      return <Phone className="h-6 w-6 text-gray-600" />
  }
}

function getCategoryColor(category: string) {
  switch (category.toLowerCase()) {
    case 'police':
      return 'bg-blue-100 border-blue-200'
    case 'fire':
      return 'bg-red-100 border-red-200'
    case 'medical':
      return 'bg-pink-100 border-pink-200'
    case 'utility':
      return 'bg-yellow-100 border-yellow-200'
    default:
      return 'bg-gray-100 border-gray-200'
  }
}

function EmergencyContactCard({ contact }: { contact: any }) {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 ${getCategoryColor(contact.category)} p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${getCategoryColor(contact.category)}`}>
            {getCategoryIcon(contact.category)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.service}</p>
          </div>
        </div>
        {contact.isVerified ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-1" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        ) : (
          <div className="flex items-center text-orange-600">
            <AlertTriangle className="h-5 w-5 mr-1" />
            <span className="text-xs font-medium">Unverified</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Phone Number</span>
          <a 
            href={`tel:${contact.phoneNumber}`}
            className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {contact.phoneNumber}
          </a>
        </div>

        {contact.address && (
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{contact.address}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
            {contact.category}
          </span>
          <a
            href={`tel:${contact.phoneNumber}`}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </a>
        </div>
      </div>
    </div>
  )
}

function EmergencyLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded-lg"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const quickAccessNumbers = [
  { name: 'Police Emergency', number: '100', color: 'bg-blue-600' },
  { name: 'Fire Brigade', number: '101', color: 'bg-red-600' },
  { name: 'Ambulance', number: '108', color: 'bg-pink-600' },
  { name: 'Women Helpline', number: '1091', color: 'bg-purple-600' },
]

export default async function EmergencyPage() {
  const contacts = await getEmergencyContacts()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
                <p className="text-gray-600">Quick access to verified emergency services and contacts</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Quick Access Numbers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access Emergency Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessNumbers.map((number, index) => (
              <a
                key={index}
                href={`tel:${number.number}`}
                className={`${number.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity text-center`}
              >
                <div className="text-2xl font-bold mb-1">{number.number}</div>
                <div className="text-sm opacity-90">{number.name}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search emergency contacts..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Police', 'Fire', 'Medical', 'Utility', 'Other'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Emergency Contacts Grid */}
        <Suspense fallback={<EmergencyLoading />}>
          {contacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <EmergencyContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <Phone className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No emergency contacts found</h3>
              <p className="text-gray-600 mb-6">Help your community by adding verified emergency contacts.</p>
              <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Add First Contact
              </button>
            </div>
          )}
        </Suspense>

        {/* Emergency Tips */}
        <div className="mt-12 bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-4">Emergency Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
            <div>
              <h4 className="font-medium mb-2">In case of emergency:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Stay calm and assess the situation</li>
                <li>Call the appropriate emergency number</li>
                <li>Provide clear location details</li>
                <li>Follow instructions from emergency services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Important information to provide:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Your exact location and landmarks</li>
                <li>Nature of the emergency</li>
                <li>Number of people involved</li>
                <li>Your contact number</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
