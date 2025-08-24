# 🌿 Saharanpur Community Connect (SCC)

A modern, mobile-friendly digital notice board web application designed specifically for local neighborhoods in Saharanpur. Built with Next.js 15, TypeScript, and a beautiful green eco-theme inspired by Saharanpur's wooden crafts and gardens.

## 🌟 Features

### 📢 Community Announcements
- Post and read official notices and community updates
- Priority levels (urgent, high, medium, low) with visual indicators
- Category filtering and search functionality
- Validity periods for time-sensitive announcements

### 🎉 Local Events
- Discover and join cultural events, festivals, and workshops
- Event registration with attendee limits
- Location and timing details with calendar integration
- Image support for event promotion

### 🚨 Issue Reporting
- Report infrastructure problems and community issues
- Status tracking (Reported → In Progress → Resolved → Closed)
- Upvoting system for community prioritization
- Category-based organization (Infrastructure, Safety, Utilities, etc.)

### 🛒 Local Marketplace
- Buy and sell goods and services locally
- Category-based listings (Electronics, Furniture, Vehicles, etc.)
- Condition indicators and price display
- Direct contact system with sellers

### 📞 Emergency Contacts
- Quick access to verified emergency services
- Categorized contacts (Police, Fire, Medical, Utility)
- One-click calling functionality
- Community-verified contact information

### 💬 Community Forum
- Engage in neighborhood discussions
- Upvote/downvote system for quality content
- Pinned announcements for important topics
- Category-based discussions

## 🎨 Design Philosophy

- **Green Eco-Theme**: Inspired by Saharanpur's natural beauty and wooden craft heritage
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Accessibility**: WCAG-compliant design with proper contrast and navigation
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom green eco-theme
- **Icons**: Lucide React for consistent iconography
- **Database**: SQLite with Prisma ORM
- **Authentication**: Ready for integration with NextAuth.js
- **Deployment**: Optimized for Vercel deployment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saharanpur-board
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Create and push database schema
   npx prisma db push
   
   # Seed with sample data
   npm run db:seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

## 📁 Project Structure

```
saharanpur-board/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Feature pages
│   │   │   ├── announcements/  # Community announcements
│   │   │   ├── events/         # Local events
│   │   │   ├── issues/         # Issue reporting
│   │   │   ├── marketplace/    # Local marketplace
│   │   │   ├── emergency/      # Emergency contacts
│   │   │   └── forum/          # Community forum
│   │   ├── api/                # API routes
│   │   │   ├── announcements/  # Announcements API
│   │   │   ├── events/         # Events API
│   │   │   ├── issues/         # Issues API
│   │   │   ├── marketplace/    # Marketplace API
│   │   │   ├── emergency/      # Emergency API
│   │   │   └── forum/          # Forum API
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   └── Navigation.tsx      # Main navigation
│   └── lib/                    # Utilities
│       ├── prisma.ts           # Database client
│       └── utils.ts            # Helper functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.js                 # Sample data
├── public/                     # Static assets
└── README.md                   # Project documentation
```

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users**: Community members with roles (Citizen, Admin, Vendor)
- **Announcements**: Official community notices
- **Events**: Local gatherings and activities
- **Issues**: Community problems and their resolution
- **MarketplaceItems**: Local goods and services
- **EmergencyContacts**: Verified emergency services
- **ForumPosts**: Community discussions
- **Badges**: Gamification system for active users

## 🎯 User Roles

### 👤 Citizens
- Post forum discussions and comments
- Submit issue reports
- Join events and view announcements
- Browse and contact marketplace listings

### 👨‍💼 Admins
- Moderate all content
- Verify emergency contacts
- Manage community announcements
- Approve marketplace listings

### 🏪 Vendors
- Post approved marketplace listings
- Organize commercial events
- Participate in community discussions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:seed     # Populate database with sample data
npx prisma studio   # Open database admin interface
npx prisma generate # Regenerate Prisma client

# Code Quality
npm run lint        # Run ESLint
```

## 🌐 API Endpoints

### Announcements
- `GET /api/announcements` - Fetch announcements
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements` - Update announcement
- `DELETE /api/announcements` - Delete announcement

### Events  
- `GET /api/events` - Fetch events
- `POST /api/events` - Create event

### Issues
- `GET /api/issues` - Fetch issues
- `POST /api/issues` - Report issue

### Marketplace
- `GET /api/marketplace` - Fetch marketplace items
- `POST /api/marketplace` - List item

### Emergency
- `GET /api/emergency` - Fetch emergency contacts
- `POST /api/emergency` - Add emergency contact

### Forum
- `GET /api/forum` - Fetch forum posts
- `POST /api/forum` - Create forum post

## 🎨 Color Palette

The application uses a beautiful green eco-theme:

- **Primary Green**: `#22c55e` (Green-500)
- **Accent Yellow**: `#eab308` (Yellow-500) 
- **Wood Brown**: `#a18072` (Custom wood tone)
- **Background**: `#f0fdf4` (Green-50)

## 📱 Responsive Design

- **Mobile**: Optimized for smartphones (320px+)
- **Tablet**: Enhanced layout for tablets (768px+)
- **Desktop**: Full-featured experience (1024px+)

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention with Prisma
- XSS protection
- CSRF protection (when authentication is added)

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on every push to main branch

### Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔮 Future Enhancements

- **Authentication**: User login/signup with NextAuth.js
- **Real-time Notifications**: WebSocket integration
- **Mobile App**: React Native version
- **Multi-language Support**: Hindi and English
- **PWA Features**: Offline functionality
- **Image Upload**: Cloudinary integration
- **SMS Notifications**: For emergency alerts
- **Maps Integration**: Google Maps for locations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the beautiful city of Saharanpur and its community spirit
- Built with modern web technologies for a seamless user experience
- Designed with accessibility and inclusivity in mind

---

**Made with ❤️ for the Saharanpur community**
