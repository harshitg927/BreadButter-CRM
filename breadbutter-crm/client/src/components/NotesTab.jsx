import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import TaskExtractor from './TaskExtractor'

const NotesTab = () => {
  const [gigs, setGigs] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [clients, setClients] = useState([])
  const [talents, setTalents] = useState([])
  const [noteText, setNoteText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [gigsData, clientsData, talentsData] = await Promise.all([
        api.gigs.getAll(),
        api.clients.getAll(),
        api.talents.getAll()
      ])
      
      console.log('Fetched data:', { gigsData, clientsData, talentsData })
      
      setGigs(gigsData || [])
      setClients(clientsData || [])
      setTalents(talentsData || [])
      
      // Flatten all notes from all gigs
      const notes = []
      if (gigsData && Array.isArray(gigsData)) {
        gigsData.forEach(gig => {
          if (gig && gig.updates && Array.isArray(gig.updates) && gig.updates.length > 0) {
            gig.updates.forEach(update => {
              if (update && update.note) {
                notes.push({
                  ...update,
                  gigId: gig._id,
                  gigTitle: gig.title,
                  clientId: gig.clientId,
                  talentId: gig.talentId
                })
              }
            })
          }
        })
      }
      
      // Sort notes by date (newest first)
      notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setAllNotes(notes)
      
      console.log('Processed notes:', notes)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message || 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }

  const getClientName = (clientId) => {
    const client = clients.find(c => c._id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  const getTalentName = (talentId) => {
    const talent = talents.find(t => t._id === talentId)
    return talent ? talent.name : 'Unknown Talent'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Notes</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-sm">Loading notes...</p>
          </div>
        </div>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Notes</h2>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="text-center py-12 text-red-500 dark:text-red-400">
            <p className="text-sm">Error loading notes: {error}</p>
            <button 
              onClick={fetchData}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">All Notes</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {allNotes.length} notes across {gigs.length} projects
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        {allNotes.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {allNotes.map((note, index) => (
              <div key={`${note.gigId}-${index}`} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {note.gigTitle || 'Untitled Project'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>Client: {getClientName(note.clientId)}</span>
                      <span>•</span>
                      <span>Talent: {getTalentName(note.talentId)}</span>
                      <span>•</span>
                      <span>By: {note.created_by || 'Unknown'}</span>
                      <span>•</span>
                      <span>{formatDate(note.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">{note.note}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No notes found. Add notes to your projects!</p>
          </div>
        )}
      </div>

      {/* Task Extractor Section */}
      <div className="space-y-6">
        <TaskExtractor 
          noteText={noteText}
          onNoteChange={setNoteText}
        />
      </div>
    </div>
  )
}

export default NotesTab 