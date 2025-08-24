const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create sample users
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@saharanpur.gov.in',
      role: 'ADMIN',
      verified: true,
    },
  })

  const citizen1 = await prisma.user.create({
    data: {
      name: 'Rajesh Kumar',
      email: 'rajesh@gmail.com',
      phone: '+91-9876543210',
      role: 'CITIZEN',
      verified: true,
    },
  })

  const citizen2 = await prisma.user.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya@gmail.com',
      phone: '+91-9876543211',
      role: 'CITIZEN',
      verified: true,
    },
  })

  const vendor = await prisma.user.create({
    data: {
      name: 'Local Vendor',
      email: 'vendor@business.com',
      phone: '+91-9876543212',
      role: 'VENDOR',
      verified: true,
    },
  })

  // Create sample announcements
  await prisma.announcement.createMany({
    data: [
      {
        title: 'Water Supply Maintenance Notice',
        content: 'Water supply will be temporarily suspended from 10 AM to 4 PM on Sunday for maintenance work in the Civil Lines area. Please store adequate water for the day.',
        category: 'Utilities',
        priority: 'high',
        authorId: admin.id,
        isPublished: true,
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      {
        title: 'Street Light Repair Completed',
        content: 'All street lights in Nehru Park area have been repaired and are now functional. Thank you for your patience.',
        category: 'Infrastructure',
        priority: 'medium',
        authorId: admin.id,
        isPublished: true,
      },
      {
        title: 'Community Cleanliness Drive',
        content: 'Join us for a community cleanliness drive this Saturday at 6 AM. Meeting point: Gandhi Park. Bring your own cleaning supplies.',
        category: 'Environment',
        priority: 'medium',
        authorId: admin.id,
        isPublished: true,
      },
    ],
  })

  // Create sample events
  await prisma.event.createMany({
    data: [
      {
        title: 'Diwali Community Celebration',
        description: 'Join us for a grand Diwali celebration with cultural programs, food stalls, and fireworks display. All families welcome!',
        location: 'Gandhi Park, Civil Lines',
        startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000), // 6 hours duration
        category: 'Cultural',
        maxAttendees: 500,
        organizerId: admin.id,
        isPublished: true,
      },
      {
        title: 'Health Awareness Workshop',
        description: 'Free health checkup and awareness session by qualified doctors. Topics include diabetes, blood pressure, and general wellness.',
        location: 'Community Center, Model Town',
        startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours duration
        category: 'Health',
        maxAttendees: 100,
        organizerId: citizen1.id,
        isPublished: true,
      },
    ],
  })

  // Create sample issues
  await prisma.issue.createMany({
    data: [
      {
        title: 'Pothole on Main Road',
        description: 'Large pothole near the market area is causing traffic issues and vehicle damage. Urgent repair needed.',
        location: 'Main Road, near Sadar Bazaar',
        category: 'INFRASTRUCTURE',
        status: 'REPORTED',
        priority: 'high',
        upvotes: 15,
        reporterId: citizen1.id,
      },
      {
        title: 'Broken Street Light',
        description: 'Street light at the corner of Nehru Road and Gandhi Street has been non-functional for 3 days.',
        location: 'Nehru Road & Gandhi Street intersection',
        category: 'UTILITIES',
        status: 'IN_PROGRESS',
        priority: 'medium',
        upvotes: 8,
        reporterId: citizen2.id,
      },
      {
        title: 'Stray Dogs Safety Concern',
        description: 'Increasing number of stray dogs in residential area posing safety risk, especially for children.',
        location: 'Model Town residential area',
        category: 'SAFETY',
        status: 'REPORTED',
        priority: 'medium',
        upvotes: 22,
        reporterId: citizen1.id,
      },
    ],
  })

  // Create sample marketplace items
  await prisma.marketplaceItem.createMany({
    data: [
      {
        title: 'Handcrafted Wooden Furniture',
        description: 'Beautiful handcrafted wooden dining table and chairs set. Made from quality teak wood. Excellent condition.',
        price: 25000,
        category: 'FURNITURE',
        condition: 'like-new',
        contactInfo: '+91-9876543212',
        location: 'Civil Lines',
        sellerId: vendor.id,
        isApproved: true,
      },
      {
        title: 'Laptop Repair Services',
        description: 'Professional laptop repair services. All brands supported. Quick turnaround time. Home service available.',
        category: 'SERVICES',
        contactInfo: '+91-9876543213',
        location: 'Model Town',
        sellerId: citizen2.id,
        isApproved: true,
      },
      {
        title: 'Used Bicycle for Sale',
        description: 'Well-maintained bicycle, perfect for daily commuting. Recently serviced with new tires.',
        price: 3500,
        category: 'VEHICLES',
        condition: 'good',
        contactInfo: '+91-9876543210',
        location: 'Nehru Park area',
        sellerId: citizen1.id,
        isApproved: true,
      },
    ],
  })

  // Create sample emergency contacts
  await prisma.emergencyContact.createMany({
    data: [
      {
        name: 'Saharanpur Police Station',
        service: 'Police Emergency Services',
        phoneNumber: '0132-2714100',
        address: 'Civil Lines, Saharanpur',
        category: 'police',
        isVerified: true,
      },
      {
        name: 'District Hospital',
        service: 'Emergency Medical Services',
        phoneNumber: '0132-2714200',
        address: 'Hospital Road, Saharanpur',
        category: 'medical',
        isVerified: true,
      },
      {
        name: 'Fire Station Saharanpur',
        service: 'Fire Emergency Services',
        phoneNumber: '0132-2714300',
        address: 'Station Road, Saharanpur',
        category: 'fire',
        isVerified: true,
      },
      {
        name: 'Electricity Board',
        service: 'Power Supply Issues',
        phoneNumber: '0132-2714400',
        address: 'Power House, Saharanpur',
        category: 'utility',
        isVerified: true,
      },
    ],
  })

  // Create sample forum posts
  await prisma.forumPost.createMany({
    data: [
      {
        title: 'Organizing Neighborhood Watch Program',
        content: 'I think we should organize a neighborhood watch program to improve safety in our area. Who would be interested in participating?',
        category: 'Safety',
        upvotes: 12,
        downvotes: 1,
        authorId: citizen1.id,
      },
      {
        title: 'Local Business Directory',
        content: 'Should we create a directory of local businesses to support our community economy? Please share your thoughts and suggestions.',
        category: 'Business',
        upvotes: 18,
        downvotes: 0,
        isPinned: true,
        authorId: admin.id,
      },
      {
        title: 'Traffic Congestion Solutions',
        content: 'The traffic situation near the market area is getting worse. What solutions can we implement to reduce congestion?',
        category: 'Infrastructure',
        upvotes: 25,
        downvotes: 3,
        authorId: citizen2.id,
      },
    ],
  })

  // Create sample badges
  await prisma.badge.createMany({
    data: [
      {
        name: 'Community Helper',
        description: 'Awarded for actively helping community members',
        icon: 'heart',
        color: 'red',
      },
      {
        name: 'Issue Reporter',
        description: 'Awarded for reporting community issues',
        icon: 'alert-circle',
        color: 'orange',
      },
      {
        name: 'Event Organizer',
        description: 'Awarded for organizing community events',
        icon: 'calendar',
        color: 'purple',
      },
    ],
  })

  console.log('✅ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
