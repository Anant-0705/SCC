import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatDate, formatTime } from '@/lib/utils'
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Users,
  Clock,
  User
} from 'lucide-react'

async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: {
          select: {
            name: true,
            role: true,
          },
        },
        _count: {
          select: {
            attendees: true,
          },
        },
      },
      where: {
        isPublished: true,
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    })
    return events
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

function EventCard({ event }: { event: any }) {
  const isUpcoming = new Date(event.startDate) > new Date()
  const attendeeCount = event._count.attendees

  // Get avatar for organizer (using initials with random color)
  const getAvatarColor = (name: string) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500']
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  // Default event images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1511578314322-379afb476865',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7'
  ]
  
  const eventImage = event.imageUrl || `${defaultImages[event.id % defaultImages.length]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200/50 overflow-hidden backdrop-blur-sm transform hover:-translate-y-2">
      {/* Event Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={eventImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            isUpcoming 
              ? 'bg-green-500/90 text-white shadow-lg' 
              : 'bg-gray-500/90 text-white'
          }`}>
            {isUpcoming ? '✨ Upcoming' : '📅 Past'}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/90 text-white backdrop-blur-sm shadow-lg">
            {event.category === 'cultural' && '🎭'} 
            {event.category === 'sports' && '⚽'} 
            {event.category === 'education' && '📚'} 
            {event.category === 'social' && '🤝'} 
            {event.category || 'Event'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {/* Header with organizer */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <div className={`w-6 h-6 rounded-full ${getAvatarColor(event.organizer.name)} flex items-center justify-center text-white text-xs font-semibold mr-2`}>
                {getInitials(event.organizer.name)}
              </div>
              <span>by {event.organizer.name}</span>
              {event.organizer.role === 'ADMIN' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                  ✓ Official
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

        {/* Event details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <Calendar className="h-4 w-4 mr-2 text-purple-500" />
            <span className="font-medium">
              {formatDate(event.startDate)}
              {event.endDate && ` - ${formatDate(event.endDate)}`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <Clock className="h-4 w-4 mr-2 text-purple-500" />
            <span className="font-medium">
              {formatTime(event.startDate)}
              {event.endDate && ` - ${formatTime(event.endDate)}`}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
            <MapPin className="h-4 w-4 mr-2 text-purple-500" />
            <span className="font-medium">{event.location}</span>
          </div>
        </div>

        {/* Footer with attendees and action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-sm text-gray-600 bg-purple-50 rounded-lg px-3 py-1">
              <Users className="h-4 w-4 mr-1 text-purple-500" />
              <span className="font-semibold text-purple-700">
                {attendeeCount} {event.maxAttendees && `/ ${event.maxAttendees}`}
              </span>
            </div>
          </div>
          {isUpcoming && (
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Join Event 🎉
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function EventsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with background */}
        <div className="relative mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Community Events</h1>
                <p className="text-purple-100 text-lg">Discover and participate in exciting local gatherings and activities</p>
                <div className="flex items-center mt-3 space-x-4 text-sm text-purple-200">
                  <span>🎪 Festivals</span>
                  <span>•</span>
                  <span>🏛️ Cultural Programs</span>
                  <span>•</span>
                  <span>🤝 Community Meetups</span>
                </div>
              </div>
            </div>
            <button className="hidden md:flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </button>
          </div>
        </div>

        {/* Enhanced Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-12 pr-4 py-3 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm">
                <option value="">All Types</option>
                <option value="cultural">🎭 Cultural</option>
                <option value="sports">⚽ Sports</option>
                <option value="education">📚 Educational</option>
                <option value="social">🤝 Social</option>
              </select>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                🎉 {events.length} upcoming events
              </span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <Suspense fallback={<EventsLoading />}>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming events</h3>
              <p className="text-gray-600 mb-6">Be the first to organize a community event.</p>
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Create First Event
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
