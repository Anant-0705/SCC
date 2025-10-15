import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  User,
  Phone,
  Star,
  IndianRupee
} from 'lucide-react'
import { Prisma } from '@prisma/client'

type MarketplaceItemWithSeller = Prisma.MarketplaceItemGetPayload<{
  include: {
    seller: {
      select: {
        name: true,
        role: true,
      },
    },
  },
}>

async function getMarketplaceItems(): Promise<MarketplaceItemWithSeller[]> {
  try {
    const items = await prisma.marketplaceItem.findMany({
      include: {
        seller: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      where: {
        isAvailable: true,
        isApproved: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return items
  } catch (error) {
    console.error('Error fetching marketplace items:', error)
    return []
  }
}

function getConditionBadge(condition: string) {
  const styles = {
    'new': 'bg-green-100 text-green-800',
    'like-new': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800',
  }
  
  return styles[condition as keyof typeof styles] || 'bg-gray-100 text-gray-800'
}

function MarketplaceCard({ item }: { item: MarketplaceItemWithSeller }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      {item.imageUrl ? (
        <div className="h-48 bg-gray-200">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-gray-400" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-3 w-3 mr-1" />
              {item.seller.name}
            </div>
          </div>
          {item.price && (
            <div className="flex items-center text-lg font-bold text-green-600">
              <IndianRupee className="h-4 w-4" />
              {item.price.toLocaleString('en-IN')}
            </div>
          )}
        </div>

        <p className="text-gray-700 mb-4 line-clamp-2">{item.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {item.location}
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {item.category.replace('_', ' ')}
            </span>
            {item.condition && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionBadge(item.condition)}`}>
                {item.condition.replace('-', ' ').toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            Posted {formatDate(item.createdAt)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
            <Phone className="h-4 w-4 mr-1" />
            Contact
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Star className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function MarketplaceLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-300"></div>
          <div className="p-6">
            <div className="flex justify-between mb-3">
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
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function MarketplacePage() {
  const items = await getMarketplaceItems()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Local Marketplace</h1>
                <p className="text-gray-600">Buy and sell goods and services in your community</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              List Item
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option value="">All Categories</option>
                <option value="GOODS">Goods</option>
                <option value="SERVICES">Services</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="FURNITURE">Furniture</option>
                <option value="VEHICLES">Vehicles</option>
                <option value="BOOKS">Books</option>
                <option value="CLOTHING">Clothing</option>
              </select>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing {items.length} items</span>
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <Suspense fallback={<MarketplaceLoading />}>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <MarketplaceCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No items listed yet</h3>
              <p className="text-gray-600 mb-6">Be the first to list an item in the marketplace.</p>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                List First Item
              </button>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
