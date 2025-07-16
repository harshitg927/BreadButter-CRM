import { useState } from 'react'
import { api } from '../utils/api'

const TaskExtractor = ({ noteText, onNoteChange, onTasksExtracted }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const extractTasks = async () => {
    if (!noteText.trim()) {
      setError('Please enter some notes first.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await api.ai.extractTasks({ note: noteText })
      setTasks(response.tasks.map(task => ({ text: task, completed: false })))
      
      // Call parent callback if provided
      if (onTasksExtracted) {
        onTasksExtracted(response.tasks)
      }
    } catch (error) {
      setError('Failed to extract tasks. Please try again.')
      console.error('Task extraction error:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTask = (index) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => 
        i === index ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const clearTasks = () => {
    setTasks([])
    setError('')
  }

  const addManualTask = () => {
    const taskText = prompt('Enter task:')
    if (taskText && taskText.trim()) {
      setTasks(prevTasks => [...prevTasks, { text: taskText.trim(), completed: false }])
    }
  }

  return (
    <div className="task-extractor">
      {/* Notes Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Meeting Notes
        </label>
        <textarea
          value={noteText}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
          placeholder="Enter your meeting notes here. Include action items like 'need to finalize budget' or 'must book location'..."
        />
      </div>

      {/* Extract Tasks Button */}
      <div className="mb-4">
        <button
          onClick={extractTasks}
          disabled={loading || !noteText.trim()}
          className={`px-4 py-2 rounded-lg font-medium text-sm mr-2 ${
            loading || !noteText.trim()
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {loading ? '🔄 Extracting...' : '🔍 Extract Tasks'}
        </button>
        
        {tasks.length > 0 && (
          <>
            <button
              onClick={addManualTask}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 mr-2"
            >
              ➕ Add Task
            </button>
            <button
              onClick={clearTasks}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Clear Tasks
            </button>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Tasks Display */}
      {tasks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Detected Tasks ({tasks.filter(t => t.completed).length}/{tasks.length} completed)
            </h4>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {tasks.filter(t => t.completed).length === tasks.length && tasks.length > 0
                ? '🎉 All tasks completed!'
                : `${tasks.filter(t => !t.completed).length} remaining`}
            </div>
          </div>
          
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-2 rounded-md transition-colors ${
                  task.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {task.text}
                </span>
                {task.completed && (
                  <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                )}
              </div>
            ))}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Sample Notes Hint */}
      {!noteText && (
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            💡 <strong>Try it out:</strong> Add some meeting notes with action items like:
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>• "We need to finalize the budget by Friday"</p>
            <p>• "Must book the location for the shoot"</p>
            <p>• "Should confirm talent availability"</p>
            <p>• "Todo: arrange equipment rental"</p>
            <p>• "Action: coordinate with the client team"</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskExtractor 