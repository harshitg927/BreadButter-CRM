// Mock Integration Functions for BreadButter CRM
// These functions simulate external service integrations without requiring real API keys

/**
 * Mock Slack notification function
 * Simulates sending notifications to Slack channels
 */
function mockSlackNotification(data) {
  console.log('📱 SLACK INTEGRATION: Sending notification...')
  console.log(`   Channel: #general`)
  console.log(`   Message: "${data.message}"`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ SLACK: Notification sent successfully!')
      resolve({ 
        success: true, 
        message: "Slack notification sent to #general!" 
      })
    }, 1000)
  })
}

/**
 * Mock Notion page creation function
 * Simulates creating documentation pages in Notion
 */
function mockNotionPage(data) {
  console.log('📝 NOTION INTEGRATION: Creating page...')
  console.log(`   Page Title: "${data.title}"`)
  console.log(`   Client: ${data.client}`)
  console.log(`   Talent: ${data.talent}`)
  console.log(`   Status: ${data.status}`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      const mockUrl = `https://notion.so/breadbutter-crm/gig-${data.gigId}-${Date.now()}`
      console.log(`✅ NOTION: Page created at ${mockUrl}`)
      resolve({ 
        success: true, 
        message: "Notion page created successfully!",
        url: mockUrl
      })
    }, 1500)
  })
}

/**
 * Mock WhatsApp messaging function
 * Simulates sending WhatsApp messages
 */
function mockWhatsAppPing(data) {
  console.log('💬 WHATSAPP INTEGRATION: Sending message...')
  console.log(`   To: ${data.phoneNumber}`)
  console.log(`   Message: "${data.message}"`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ WHATSAPP: Message sent successfully!')
      resolve({ 
        success: true, 
        message: `WhatsApp message sent to ${data.phoneNumber}!` 
      })
    }, 800)
  })
}

/**
 * Mock Webhook trigger function
 * Simulates triggering external webhooks
 */
function mockWebhook(data) {
  console.log('🔗 WEBHOOK INTEGRATION: Triggering webhook...')
  console.log(`   URL: https://api.example.com/webhooks/breadbutter`)
  console.log(`   Event: ${data.event}`)
  console.log(`   Gig ID: ${data.gigId}`)
  console.log(`   Timestamp: ${data.timestamp}`)
  console.log(`   Payload:`, JSON.stringify(data.gigData, null, 2))
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ WEBHOOK: Triggered successfully!')
      resolve({ 
        success: true, 
        message: "Webhook triggered successfully!" 
      })
    }, 1200)
  })
}

/**
 * Mock Google Calendar integration
 * Simulates creating calendar events
 */
function mockGoogleCalendar(data) {
  console.log('📅 GOOGLE CALENDAR INTEGRATION: Creating event...')
  console.log(`   Title: "${data.title}"`)
  console.log(`   Date: ${data.date}`)
  console.log(`   Location: ${data.location}`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ GOOGLE CALENDAR: Event created successfully!')
      resolve({ 
        success: true, 
        message: "Calendar event created!" 
      })
    }, 1000)
  })
}

/**
 * Mock Trello card creation
 * Simulates creating Trello cards for project management
 */
function mockTrelloCard(data) {
  console.log('📋 TRELLO INTEGRATION: Creating card...')
  console.log(`   Board: BreadButter Projects`)
  console.log(`   List: ${data.status}`)
  console.log(`   Card: "${data.title}"`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ TRELLO: Card created successfully!')
      resolve({ 
        success: true, 
        message: "Trello card created!" 
      })
    }, 900)
  })
}

/**
 * Mock email notification function
 * Simulates sending email notifications
 */
function mockEmailNotification(data) {
  console.log('📧 EMAIL INTEGRATION: Sending email...')
  console.log(`   To: ${data.email}`)
  console.log(`   Subject: "${data.subject}"`)
  console.log(`   Message: "${data.message}"`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ EMAIL: Notification sent successfully!')
      resolve({ 
        success: true, 
        message: `Email sent to ${data.email}!` 
      })
    }, 700)
  })
}

/**
 * Mock Asana task creation
 * Simulates creating tasks in Asana
 */
function mockAsanaTask(data) {
  console.log('✅ ASANA INTEGRATION: Creating task...')
  console.log(`   Project: BreadButter CRM`)
  console.log(`   Task: "${data.title}"`)
  console.log(`   Assignee: ${data.assignee}`)
  console.log(`   Due Date: ${data.dueDate}`)
  console.log(`   Gig ID: ${data.gigId}`)
  
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('✅ ASANA: Task created successfully!')
      resolve({ 
        success: true, 
        message: "Asana task created!" 
      })
    }, 1100)
  })
}

/**
 * Mock function to simulate integration failures (for testing)
 */
function mockIntegrationFailure(data) {
  console.log('❌ INTEGRATION FAILURE: Simulating error...')
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Integration service temporarily unavailable'))
    }, 500)
  })
}

/**
 * Mock function to get integration status
 */
function mockIntegrationStatus() {
  return {
    slack: { status: 'active', lastUsed: new Date().toISOString() },
    notion: { status: 'active', lastUsed: new Date().toISOString() },
    whatsapp: { status: 'active', lastUsed: new Date().toISOString() },
    webhook: { status: 'active', lastUsed: new Date().toISOString() },
    trello: { status: 'inactive', lastUsed: null },
    googleCalendar: { status: 'inactive', lastUsed: null },
    email: { status: 'active', lastUsed: new Date().toISOString() },
    asana: { status: 'inactive', lastUsed: null }
  }
}

module.exports = {
  mockSlackNotification,
  mockNotionPage,
  mockWhatsAppPing,
  mockWebhook,
  mockGoogleCalendar,
  mockTrelloCard,
  mockEmailNotification,
  mockAsanaTask,
  mockIntegrationFailure,
  mockIntegrationStatus
} 