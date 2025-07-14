import { useState } from 'react'
import { api } from '../utils/api'

const IntegrationsPanel = ({ gigData }) => {
  const [loadingIntegrations, setLoadingIntegrations] = useState({})
  const [messages, setMessages] = useState([])

  const addMessage = (type, text) => {
    const message = {
      id: Date.now(),
      type, // 'success' or 'error'
      text,
      timestamp: new Date().toLocaleTimeString()
    }
    setMessages(prev => [...prev, message])
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== message.id))
    }, 5000)
  }

  const triggerIntegration = async (integrationType) => {
    setLoadingIntegrations(prev => ({ ...prev, [integrationType]: true }))

    try {
      let response
      
      switch (integrationType) {
        case 'slack':
          response = await api.integrations.slack({
            gigId: gigData.id,
            message: `📋 Project Update: "${gigData.title}" - Status: ${gigData.status}`
          })
          break
          
        case 'notion':
          response = await api.integrations.notion({
            gigId: gigData.id,
            title: gigData.title,
            client: gigData.clientName,
            talent: gigData.talentName,
            status: gigData.status
          })
          break
          
        case 'whatsapp':
          response = await api.integrations.whatsapp({
            gigId: gigData.id,
            phoneNumber: '+91-9876543210', // Mock phone number
            message: `Hi! Update on "${gigData.title}": ${gigData.status}`
          })
          break
          
        case 'webhook':
          response = await api.integrations.webhook({
            gigId: gigData.id,
            gigData: gigData,
            event: 'gig_update',
            timestamp: new Date().toISOString()
          })
          break
          
        default:
          throw new Error('Unknown integration type')
      }

      addMessage('success', response.message)
      
      // Show additional info for certain integrations
      if (integrationType === 'notion' && response.url) {
        addMessage('success', `Page created: ${response.url}`)
      }
      
    } catch (error) {
      addMessage('error', error.response?.data?.message || 'Integration failed. Please try again.')
      console.error(`${integrationType} integration error:`, error)
    } finally {
      setLoadingIntegrations(prev => ({ ...prev, [integrationType]: false }))
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return (
    <div className="integrations-panel border border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        🚀 Integrations
      </h3>
      
      {/* Integration Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => triggerIntegration('slack')}
          disabled={loadingIntegrations.slack}
          className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            loadingIntegrations.slack
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {loadingIntegrations.slack ? '⏳' : '📱'} 
          {loadingIntegrations.slack ? ' Sending...' : ' Notify Slack'}
        </button>
        
        <button
          onClick={() => triggerIntegration('notion')}
          disabled={loadingIntegrations.notion}
          className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            loadingIntegrations.notion
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
        >
          {loadingIntegrations.notion ? '⏳' : '📝'} 
          {loadingIntegrations.notion ? ' Creating...' : ' Create Notion Page'}
        </button>
        
        <button
          onClick={() => triggerIntegration('whatsapp')}
          disabled={loadingIntegrations.whatsapp}
          className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            loadingIntegrations.whatsapp
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {loadingIntegrations.whatsapp ? '⏳' : '💬'} 
          {loadingIntegrations.whatsapp ? ' Sending...' : ' Ping WhatsApp'}
        </button>
        
        <button
          onClick={() => triggerIntegration('webhook')}
          disabled={loadingIntegrations.webhook}
          className={`flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm transition-colors ${
            loadingIntegrations.webhook
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {loadingIntegrations.webhook ? '⏳' : '🔗'} 
          {loadingIntegrations.webhook ? ' Triggering...' : ' Trigger Webhook'}
        </button>
      </div>

      {/* Messages Display */}
      {messages.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-700">Integration Status:</h4>
            <button
              onClick={clearMessages}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="max-h-32 overflow-y-auto space-y-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 rounded-md text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span>{message.text}</span>
                  <span className="text-xs opacity-75 ml-2">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Info */}
      {messages.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-600 mb-2">
            💡 <strong>Quick Actions:</strong> Connect your project with external tools
          </p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• <strong>Slack:</strong> Send notifications to team channels</li>
            <li>• <strong>Notion:</strong> Create project documentation pages</li>
            <li>• <strong>WhatsApp:</strong> Send updates to clients/team</li>
            <li>• <strong>Webhook:</strong> Trigger custom automations</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default IntegrationsPanel 