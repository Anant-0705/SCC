import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatDate, cn } from '@/lib/utils'
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Prisma } from '@prisma/client'

type AnnouncementWithAuthor = Prisma.AnnouncementGetPayload<{
  include: {
    author: {
      select: {
        name: true,
        role: true,
      },
    },
  },
}>

async function getAnnouncements(): Promise<AnnouncementWithAuthor[]> {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return announcements
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

function getPriorityIcon(priority: string) {
  switch (priority) {
    case 'urgent':
      return <AlertTriangle className="h-5 w-5 text-red-600" />
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />
    case 'medium':
      return <Info className="h-5 w-5 text-blue-600" />
    case 'low':
      return <CheckCircle className="h-5 w-5 text-green-600" />
    default:
      return <Info className="h-5 w-5 text-gray-600" />
  }
}

function getPriorityBadge(priority: string) {
  const styles = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-blue-100 text-blue-800 border-blue-200',
    low: 'bg-green-100 text-green-800 border-green-200',
  }
  
  return styles[priority as keyof typeof styles] || styles.medium
}

function AnnouncementCard({ announcement }: { announcement: AnnouncementWithAuthor }) {
  const isUrgent = announcement.priority === 'urgent'
  const isHighPriority = announcement.priority === 'high'
  
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 p-6 transform hover:-translate-y-1",
      isUrgent ? "border-red-200 bg-red-50/50" : 
      isHighPriority ? "border-orange-200 bg-orange-50/50" : "border-gray-200"
    )}>
      {/* Priority indicator strip */}
      {(isUrgent || isHighPriority) && (
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-2xl",
          isUrgent ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-orange-500 to-orange-600"
        )} />
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-3 rounded-xl shadow-md",
            isUrgent ? "bg-red-100" : isHighPriority ? "bg-orange-100" : "bg-blue-100"
          )}>
            {getPriorityIcon(announcement.priority)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{announcement.title}</h3>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(announcement.author.name)}&background=22c55e&color=fff&size=24`}
                alt={announcement.author.name}
                className="w-5 h-5 rounded-full"
              />
              <span className="font-medium">{announcement.author.name}</span>
              <span>•</span>
              <span>{formatDate(announcement.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getPriorityBadge(announcement.priority)}`}>
            {announcement.priority}
          </span>
          {announcement.author.role === 'ADMIN' && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
              Official
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">{announcement.content}</p>
      
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm">
          📂 {announcement.category}
        </span>
        {announcement.validUntil && (
          <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
            <Clock className="h-4 w-4 mr-1" />
            <span className="font-medium">Valid until {formatDate(announcement.validUntil)}</span>
          </div>
        )}
      </div>
      
      {/* Interactive elements */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
            <span className="text-sm">👍</span>
            <span className="text-sm font-medium">Helpful</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
            <span className="text-sm">💬</span>
            <span className="text-sm font-medium">Comment</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <span className="text-sm">🔗 Share</span>
        </button>
      </div>
    </div>
  )
}

function AnnouncementsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with background */}
        <div className="relative mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Community Announcements</h1>
                <p className="text-blue-100 text-lg">Stay updated with the latest community news and official notices</p>
                <div className="flex items-center mt-3 space-x-4 text-sm text-blue-200">
                  <span>📢 Official Updates</span>
                  <span>•</span>
                  <span>🏛️ Government Notices</span>
                  <span>•</span>
                  <span>🎯 Priority Alerts</span>
                </div>
              </div>
            </div>
            <button className="hidden md:flex items-center px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Plus className="h-5 w-5 mr-2" />
              Post Announcement
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
                  placeholder="Search announcements..."
                  className="pl-12 pr-4 py-3 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm">
                <option value="">All Categories</option>
                <option value="utilities">🔧 Utilities</option>
                <option value="infrastructure">🏗️ Infrastructure</option>
                <option value="environment">🌱 Environment</option>
                <option value="safety">🛡️ Safety</option>
              </select>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✨ {announcements.length} active announcements
              </span>
            </div>
          </div>
        </div>

        {/* Announcements Grid */}
        <Suspense fallback={<AnnouncementsLoading />}>
          {announcements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <Megaphone className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
              <p className="text-gray-600 mb-6">Be the first to share important community news.</p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Create First Announcement
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
