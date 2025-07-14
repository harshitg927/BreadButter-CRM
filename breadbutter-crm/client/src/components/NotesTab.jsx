import { useState, useEffect } from 'react'
import { api } from '../utils/api'

const NotesTab = () => {
  const [gigs, setGigs] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [clients, setClients] = useState([])
  const [talents, setTalents] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [gigsData, clientsData, talentsData] = await Promise.all([
        api.gigs.getAll(),
        api.clients.getAll(),
        api.talents.getAll()
      ])
      setGigs(gigsData)
      setClients(clientsData)
      setTalents(talentsData)
      
      // Flatten all notes from all gigs
      const notes = []
      gigsData.forEach(gig => {
        if (gig.updates && gig.updates.length > 0) {
          gig.updates.forEach(update => {
            notes.push({
              ...update,
              gigId: gig.id,
              gigTitle: gig.title,
              clientId: gig.clientId,
              talentId: gig.talentId
            })
          })
        }
      })
      
      // Sort notes by date (newest first)
      notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setAllNotes(notes)
    } catch (error) {
      alert('Error fetching data')
    }
  }

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  const getTalentName = (talentId) => {
    const talent = talents.find(t => t.id === talentId)
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">All Notes</h2>
        <div className="text-sm text-gray-500">
          {allNotes.length} notes across {gigs.length} projects
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        {allNotes.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {allNotes.map((note, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {note.gigTitle}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>Client: {getClientName(note.clientId)}</span>
                      <span>•</span>
                      <span>Talent: {getTalentName(note.talentId)}</span>
                      <span>•</span>
                      <span>By: {note.created_by}</span>
                      <span>•</span>
                      <span>{formatDate(note.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{note.note}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium mb-2">No notes yet</h3>
            <p className="text-sm">
              Notes will appear here when you add them to projects. 
              Go to the Projects tab to add your first note!
            </p>
          </div>
        )}
      </div>

      {allNotes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">💡</div>
            <div>
              <h4 className="font-medium text-blue-900">Tip</h4>
              <p className="text-sm text-blue-700">
                Use the Projects tab to add notes to specific projects. All notes will be consolidated here for easy reference.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotesTab 