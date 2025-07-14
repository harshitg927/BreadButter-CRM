// Mock AI Functions for BreadButter CRM
// These functions simulate AI capabilities without requiring real API keys

/**
 * Mock AI summarization function
 * Takes input text and returns a summarized version with detected tags
 */
function mockSummarize(text) {
  console.log('🤖 AI SUMMARIZE: Processing text...')
  
  // Simple summary: first 150 words + ellipsis
  const words = text.split(' ')
  const summary = words.length > 150 
    ? words.slice(0, 150).join(' ') + '...'
    : text

  // Keyword-based tag detection
  const tags = []
  const lowerText = text.toLowerCase()

  // Budget-related keywords
  if (lowerText.includes('budget') || lowerText.includes('cost') || lowerText.includes('money') || 
      lowerText.includes('price') || lowerText.includes('inr') || lowerText.includes('amount')) {
    tags.push('budget')
  }

  // Creative direction keywords
  if (lowerText.includes('creative') || lowerText.includes('design') || lowerText.includes('visual') || 
      lowerText.includes('aesthetic') || lowerText.includes('style') || lowerText.includes('direction')) {
    tags.push('creative direction')
  }

  // Timeline-related keywords
  if (lowerText.includes('timeline') || lowerText.includes('deadline') || lowerText.includes('schedule') || 
      lowerText.includes('complete') || lowerText.includes('finish') || lowerText.includes('delivery')) {
    tags.push('timeline')
  }

  // Location-related keywords
  if (lowerText.includes('location') || lowerText.includes('venue') || lowerText.includes('shoot') || 
      lowerText.includes('goa') || lowerText.includes('mumbai') || lowerText.includes('place')) {
    tags.push('location')
  }

  // Team/talent keywords
  if (lowerText.includes('talent') || lowerText.includes('team') || lowerText.includes('crew') || 
      lowerText.includes('photographer') || lowerText.includes('model') || lowerText.includes('availability')) {
    tags.push('talent')
  }

  // Equipment keywords
  if (lowerText.includes('equipment') || lowerText.includes('camera') || lowerText.includes('gear') || 
      lowerText.includes('rental') || lowerText.includes('setup')) {
    tags.push('equipment')
  }

  // Client communication keywords
  if (lowerText.includes('client') || lowerText.includes('approval') || lowerText.includes('feedback') || 
      lowerText.includes('review') || lowerText.includes('meeting')) {
    tags.push('client communication')
  }

  console.log(`✅ AI SUMMARIZE: Generated summary with ${tags.length} tags`)
  
  return {
    summary,
    tags: [...new Set(tags)] // Remove duplicates
  }
}

/**
 * Mock task extraction function
 * Extracts action items from meeting notes using pattern matching
 */
function mockExtractTasks(note) {
  console.log('🤖 AI EXTRACT TASKS: Processing note...')
  
  const tasks = []
  
  // Task detection patterns
  const patterns = [
    // "need to" pattern
    /need to (.+?)(?:[.!]|$)/gi,
    // "must" pattern
    /must (.+?)(?:[.!]|$)/gi,
    // "should" pattern
    /should (.+?)(?:[.!]|$)/gi,
    // "have to" pattern
    /have to (.+?)(?:[.!]|$)/gi,
    // "todo" pattern
    /todo:?\s*(.+?)(?:[.!]|$)/gi,
    // "action" pattern
    /action:?\s*(.+?)(?:[.!]|$)/gi,
    // "next step" pattern
    /next step:?\s*(.+?)(?:[.!]|$)/gi,
    // "will" pattern (future actions)
    /will (.+?)(?:[.!]|$)/gi,
    // "plan to" pattern
    /plan to (.+?)(?:[.!]|$)/gi,
    // "going to" pattern
    /going to (.+?)(?:[.!]|$)/gi
  ]

  // Extract tasks using patterns
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(note)) !== null) {
      let taskText = match[1].trim()
      
      // Clean up the task text
      taskText = taskText.replace(/^(the |a |an )/i, '') // Remove articles
      taskText = taskText.charAt(0).toUpperCase() + taskText.slice(1) // Capitalize first letter
      
      // Skip very short or generic tasks
      if (taskText.length > 5 && !taskText.includes('we') && !taskText.includes('it')) {
        tasks.push(taskText)
      }
    }
  })

  // Look for bullet points or numbered lists
  const bulletPatterns = [
    /^[-*•]\s*(.+)$/gm,
    /^\d+\.\s*(.+)$/gm
  ]

  bulletPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(note)) !== null) {
      let taskText = match[1].trim()
      if (taskText.length > 5) {
        taskText = taskText.charAt(0).toUpperCase() + taskText.slice(1)
        tasks.push(taskText)
      }
    }
  })

  // Remove duplicates and filter out very similar tasks
  const uniqueTasks = []
  tasks.forEach(task => {
    const similarTask = uniqueTasks.find(existing => 
      existing.toLowerCase().includes(task.toLowerCase()) || 
      task.toLowerCase().includes(existing.toLowerCase())
    )
    if (!similarTask) {
      uniqueTasks.push(task)
    }
  })

  console.log(`✅ AI EXTRACT TASKS: Found ${uniqueTasks.length} tasks`)
  
  return {
    tasks: uniqueTasks.slice(0, 8) // Limit to 8 tasks max
  }
}

/**
 * Mock function to simulate AI processing delay
 */
function mockAIDelay() {
  return new Promise(resolve => {
    const delay = Math.random() * 2000 + 1000 // 1-3 seconds
    setTimeout(resolve, delay)
  })
}

module.exports = {
  mockSummarize,
  mockExtractTasks,
  mockAIDelay
} 