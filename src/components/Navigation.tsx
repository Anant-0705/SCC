'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Megaphone, 
  Calendar, 
  AlertCircle, 
  ShoppingCart, 
  Phone, 
  MessageSquare,
  Home,
  Menu,
  X,
  TreePine
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Announcements', href: '/dashboard/announcements', icon: Megaphone },
  { name: 'Events', href: '/dashboard/events', icon: Calendar },
  { name: 'Issues', href: '/dashboard/issues', icon: AlertCircle },
  { name: 'Marketplace', href: '/dashboard/marketplace', icon: ShoppingCart },
  { name: 'Emergency', href: '/dashboard/emergency', icon: Phone },
  { name: 'Forum', href: '/dashboard/forum', icon: MessageSquare },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-green-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Enhanced Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  <TreePine className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  SCC
                </span>
                <span className="text-xs text-green-600 font-medium hidden sm:block">
                  Saharanpur Connect
                </span>
              </div>
            </Link>
          </div>

          {/* Enhanced Desktop navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative group',
                    isActive
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-md'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700 hover:shadow-md'
                  )}
                >
                  <item.icon className={cn(
                    'h-4 w-4 transition-all duration-300',
                    isActive ? 'text-green-700' : 'group-hover:scale-110'
                  )} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-600 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-green-700 p-3 rounded-xl hover:bg-green-50 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-green-100/50 shadow-xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 relative',
                    isActive
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-lg'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700 active:scale-95'
                  )}
                >
                  <div className={cn(
                    'p-2 rounded-lg',
                    isActive ? 'bg-green-600' : 'bg-gray-100'
                  )}>
                    <item.icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-white' : 'text-gray-600'
                    )} />
                  </div>
                  <span className="flex-1">{item.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  )}
                </Link>
              )
            })}
            
            {/* Mobile-only footer */}
            <div className="mt-6 pt-6 border-t border-green-100">
              <div className="text-center text-xs text-gray-500">
                <div className="mb-2">🌿 Saharanpur Community Connect</div>
                <div>Connecting neighbors, building community</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
