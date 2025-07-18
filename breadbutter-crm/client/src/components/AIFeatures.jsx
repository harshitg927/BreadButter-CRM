import { useState } from 'react'
import { api } from '../utils/api'

const AIFeatures = ({ gigId }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [transcriptText, setTranscriptText] = useState('')
  const [summary, setSummary] = useState('')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setError('')
      
      // Read the file content
      const reader = new FileReader()
      reader.onload = (e) => {
        setTranscriptText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const generateSummary = async () => {
    if (!transcriptText.trim()) {
      setError('Please upload a transcript file first.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.ai.summarize({ text: transcriptText })
      setSummary(response.summary)
      setTags(response.tags || [])
    } catch (error) {
      setError('Failed to generate summary. Please try again.')
      console.error('Summary generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setSelectedFile(null)
    setTranscriptText('')
    setSummary('')
    setTags([])
    setError('')
  }

  return (
    <div className="ai-features border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        🧠 AI Features
      </h3>
      
      {/* File Upload Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Meeting Transcript
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {selectedFile && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            ✓ {selectedFile.name} uploaded successfully
          </p>
        )}
      </div>

      {/* Generate Summary Button */}
      <div className="mb-4">
        <button
          onClick={generateSummary}
          disabled={loading || !transcriptText.trim()}
          className={`px-4 py-2 rounded-lg font-medium text-sm mr-2 ${
            loading || !transcriptText.trim()
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? '🔄 Generating...' : '✨ Generate Summary'}
        </button>
        
        {(summary || tags.length > 0) && (
          <button
            onClick={clearAll}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Summary Display */}
      {summary && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">AI Summary:</h4>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
            <p className="text-sm text-gray-800 dark:text-gray-200">{summary}</p>
          </div>
        </div>
      )}

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detected Topics:</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sample Transcript Note */}
      {!transcriptText && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            💡 <strong>Try it out:</strong> Create a text file with sample meeting notes like:
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            "Meeting with Zara India team. Budget discussion: 50,000 INR for Goa shoot. 
            Creative direction: beach lifestyle focus. Timeline: complete by Nov 30. 
            Need to finalize location booking and confirm talent availability."
          </p>
        </div>
      )}
    </div>
  )
}

export default AIFeatures 