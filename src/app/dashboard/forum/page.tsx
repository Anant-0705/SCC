import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  User,
  Pin,
  Clock
} from 'lucide-react'
import { Prisma } from '@prisma/client'

type ForumPostWithAuthor = Prisma.ForumPostGetPayload<{
  include: {
    author: {
      select: {
        name: true,
        role: true,
      },
    },
    _count: {
      select: {
        comments: true,
      },
    },
  },
}>

async function getForumPosts(): Promise<ForumPostWithAuthor[]> {
  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' },
      ],
    })
    return posts
  } catch (error) {
    console.error('Error fetching forum posts:', error)
    return []
  }
}

function ForumPostCard({ post }: { post: ForumPostWithAuthor }) {
  const commentCount = post._count.comments
  const netVotes = post.upvotes - post.downvotes

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border ${
      post.isPinned ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'
    } p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          {post.isPinned && (
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg">
              <Pin className="h-4 w-4 text-indigo-600" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <User className="h-3 w-3" />
              <span>{post.author.name}</span>
              <span>•</span>
              <Clock className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
              {post.isPinned && (
                <>
                  <span>•</span>
                  <span className="text-indigo-600 font-medium">Pinned</span>
                </>
              )}
            </div>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {post.category}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>{post.upvotes}</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 transition-colors">
              <ThumbsDown className="h-4 w-4" />
              <span>{post.downvotes}</span>
            </button>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <MessageCircle className="h-4 w-4" />
            <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
          </div>
        </div>
        <div className={`text-sm font-medium ${
          netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-600'
        }`}>
          {netVotes > 0 ? '+' : ''}{netVotes} net votes
        </div>
      </div>
    </div>
  )
}

function ForumLoading() {
  return (
    <div className="space-y-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

const categories = [
  'General Discussion',
  'Local News',
  'Events',
  'Infrastructure',
  'Safety',
  'Environment',
  'Business',
  'Culture',
  'Sports',
  'Education'
]

export default async function ForumPage() {
  const posts = await getForumPosts()
  const pinnedPosts = posts.filter((post) => post.isPinned)
  const regularPosts = posts.filter((post) => !post.isPinned)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
                <p className="text-gray-600">Discuss, share ideas, and connect with your neighbors</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing {posts.length} discussions</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg">
              All Categories
            </button>
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
              >
                {category}
              </button>
            ))}
            <button className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800 transition-colors">
              +3 more
            </button>
          </div>
        </div>

        {/* Forum Posts */}
        <Suspense fallback={<ForumLoading />}>
          {posts.length > 0 ? (
            <div className="space-y-6">
              {/* Pinned Posts */}
              {pinnedPosts.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Pin className="h-5 w-5 mr-2 text-indigo-600" />
                    Pinned Discussions
                  </h2>
                  {pinnedPosts.map((post) => (
                    <ForumPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div className="space-y-4">
                  {pinnedPosts.length > 0 && (
                    <h2 className="text-lg font-semibold text-gray-900 mt-8">Recent Discussions</h2>
                  )}
                  {regularPosts.map((post) => (
                    <ForumPostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions yet</h3>
              <p className="text-gray-600 mb-6">Start the conversation in your community forum.</p>
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Start First Discussion
              </button>
            </div>
          )}
        </Suspense>

        {/* Forum Guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Forum Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Be respectful:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Treat all community members with respect</li>
                <li>No hate speech or discriminatory language</li>
                <li>Stay on topic and be constructive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Community standards:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Share accurate and helpful information</li>
                <li>No spam or promotional content</li>
                <li>Report inappropriate content to moderators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
