import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { 
  AlertCircle, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  ThumbsUp,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { Prisma } from '@prisma/client'

const issueWithReporterPayload = Prisma.validator<Prisma.IssueFindManyArgs>()({
  include: {
    reporter: {
      select: {
        name: true,
        role: true,
      },
    },
  },
})

type IssueWithReporter = Prisma.IssueGetPayload<typeof issueWithReporterPayload>

async function getIssues(): Promise<IssueWithReporter[]> {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        reporter: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      orderBy: [
        { status: 'asc' },
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    })
    return issues
  } catch (error) {
    console.error('Error fetching issues:', error)
    return []
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'REPORTED':
      return <Clock className="h-5 w-5 text-blue-600" />
    case 'IN_PROGRESS':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />
    case 'RESOLVED':
      return <CheckCircle className="h-5 w-5 text-green-600" />
    case 'CLOSED':
      return <XCircle className="h-5 w-5 text-gray-600" />
    default:
      return <AlertCircle className="h-5 w-5 text-gray-600" />
  }
}

function getStatusBadge(status: string) {
  const styles = {
    REPORTED: 'bg-blue-100 text-blue-800 border-blue-200',
    IN_PROGRESS: 'bg-orange-100 text-orange-800 border-orange-200',
    RESOLVED: 'bg-green-100 text-green-800 border-green-200',
    CLOSED: 'bg-gray-100 text-gray-800 border-gray-200',
  }
  
  return styles[status as keyof typeof styles] || styles.REPORTED
}

function getPriorityBadge(priority: string) {
  const styles = {
    urgent: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-blue-100 text-blue-800',
    low: 'bg-green-100 text-green-800',
  }
  
  return styles[priority as keyof typeof styles] || styles.medium
}

function IssueCard({ issue }: { issue: IssueWithReporter }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(issue.status)}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <User className="h-3 w-3" />
              <span>by {issue.reporter.name}</span>
              <span>•</span>
              <span>{formatDate(issue.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(issue.status)}`}>
            {issue.status.replace('_', ' ')}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(issue.priority)}`}>
            {issue.priority.toUpperCase()}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{issue.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {issue.location}
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {issue.category.replace('_', ' ')}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {issue.upvotes} upvotes
          </div>
        </div>
      </div>

      {issue.imageUrl && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img
            src={issue.imageUrl}
            alt="Issue"
            className="w-full h-32 object-cover"
          />
        </div>
      )}
    </div>
  )
}

function IssuesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-5 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function IssuesPage() {
  const issues = await getIssues()
  const reportedCount = issues.filter((issue: { status: string }) => issue.status === 'REPORTED').length
  const inProgressCount = issues.filter((issue: { status: string }) => issue.status === 'IN_PROGRESS').length
  const resolvedCount = issues.filter((issue: { status: string }) => issue.status === 'RESOLVED').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with background */}
        <div className="relative mb-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Community Issues</h1>
                <p className="text-red-100 text-lg">Report, track, and resolve neighborhood concerns together</p>
                <div className="flex items-center mt-3 space-x-4 text-sm text-red-200">
                  <span>🚨 Quick Response</span>
                  <span>•</span>
                  <span>🛠️ Problem Solving</span>
                  <span>•</span>
                  <span>✅ Community Action</span>
                </div>
              </div>
            </div>
            <button className="hidden md:flex items-center px-6 py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Plus className="h-5 w-5 mr-2" />
              Report Issue
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
                  placeholder="Search issues..."
                  className="pl-12 pr-4 py-3 w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm">
                <option value="">All Categories</option>
                <option value="utilities">🔧 Utilities</option>
                <option value="infrastructure">🏗️ Infrastructure</option>
                <option value="environment">🌱 Environment</option>
                <option value="safety">🛡️ Safety</option>
              </select>
              <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white shadow-sm">
                <option value="">All Status</option>
                <option value="REPORTED">🔄 Reported</option>
                <option value="IN_PROGRESS">⚡ In Progress</option>
                <option value="RESOLVED">✅ Resolved</option>
              </select>
              <button className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors bg-white shadow-sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Issues</p>
                <p className="text-3xl font-bold text-gray-900">{issues.length}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Reported</p>
                <p className="text-3xl font-bold text-blue-900">{reportedCount}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">In Progress</p>
                <p className="text-3xl font-bold text-orange-900">{inProgressCount}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Resolved</p>
                <p className="text-3xl font-bold text-green-900">{resolvedCount}</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Issues Grid */}
        <Suspense fallback={<IssuesLoading />}>
          {issues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue: IssueWithReporter) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No issues reported</h3>
              <p className="text-gray-600 mb-6">Help improve your community by reporting issues.</p>
              <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Report First Issue
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
