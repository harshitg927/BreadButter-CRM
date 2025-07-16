import { useState, useEffect } from 'react'
import { api } from '../utils/api'
import AIFeatures from './AIFeatures'
import IntegrationsPanel from './IntegrationsPanel'

const GigsTab = () => {
  const [gigs, setGigs] = useState([])
  const [clients, setClients] = useState([])
  const [talents, setTalents] = useState([])
  const [isAddingGig, setIsAddingGig] = useState(false)
  const [editingGig, setEditingGig] = useState(null)
  const [showingNotes, setShowingNotes] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    clientId: '',
    talentId: '',
    status: 'In Progress'
  })
  const [noteData, setNoteData] = useState({
    note: '',
    type: 'text',
    created_by: ''
  })

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
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error fetching data')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const gigData = {
        ...formData,
        // Remove parseInt - keep as ObjectId strings
        clientId: formData.clientId,
        talentId: formData.talentId
      }
      
      if (editingGig) {
        await api.gigs.update(editingGig._id, gigData)
      } else {
        await api.gigs.create(gigData)
      }
      setFormData({ title: '', clientId: '', talentId: '', status: 'In Progress' })
      setIsAddingGig(false)
      setEditingGig(null)
      fetchData()
    } catch (error) {
      console.error('Error saving gig:', error)
      alert('Error saving gig')
    }
  }

  const handleEdit = (gig) => {
    setEditingGig(gig)
    setFormData({
      title: gig.title,
      clientId: gig.clientId.toString(),
      talentId: gig.talentId.toString(),
      status: gig.status
    })
    setIsAddingGig(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gig?')) {
      try {
        await api.gigs.delete(id)
        fetchData()
      } catch (error) {
        console.error('Error deleting gig:', error)
        alert('Error deleting gig')
      }
    }
  }

  const handleCancel = () => {
    setIsAddingGig(false)
    setEditingGig(null)
    setFormData({ title: '', clientId: '', talentId: '', status: 'In Progress' })
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    try {
      await api.gigs.addNote(showingNotes._id, noteData)
      setNoteData({ note: '', type: 'text', created_by: '' })
      setShowingNotes(null) // Close the modal after adding note
      fetchData()
    } catch (error) {
      console.error('Error adding note:', error)
      alert('Error adding note')
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

  const statusOptions = ['In Progress', 'Delivered', 'Pending']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={() => setIsAddingGig(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Project
        </button>
      </div>

      {isAddingGig && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">
            {editingGig ? 'Edit Project' : 'Add New Project'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Talent
              </label>
              <select
                value={formData.talentId}
                onChange={(e) => setFormData({...formData, talentId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a talent</option>
                {talents.map(talent => (
                  <option key={talent._id} value={talent._id}>
                    {talent.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {editingGig ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Talent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {gigs.map(gig => (
              <tr key={gig._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {gig.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {getClientName(gig.clientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {getTalentName(gig.talentId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    gig.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    gig.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gig.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3">
                  <button
                    onClick={() => setShowingNotes(gig)}
                    className="text-green-600 hover:text-green-800 font-medium"
                  >
                    Notes ({gig.updates ? gig.updates.length : 0})
                  </button>
                  <button
                    onClick={() => handleEdit(gig)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(gig._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {gigs.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No projects found. Add your first project!</p>
          </div>
        )}
      </div>

      {/* AI Features Section */}
      <div className="space-y-6">
        <AIFeatures />
      </div>

      {/* Integrations Section */}
      {gigs.length > 0 && (
        <div className="space-y-6">
          <IntegrationsPanel 
            gigData={{
              id: gigs[0]._id,
              title: gigs[0].title,
              status: gigs[0].status,
              clientName: getClientName(gigs[0].clientId),
              talentName: getTalentName(gigs[0].talentId)
            }}
          />
        </div>
      )}

      {showingNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notes for: {showingNotes.title}
              </h3>
              <button
                onClick={() => setShowingNotes(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-4 mb-6">
                {showingNotes.updates && showingNotes.updates.length > 0 ? (
                  showingNotes.updates.map((update, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{update.note}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>By: {update.created_by}</span>
                        <span>{new Date(update.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No notes yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add Note
                  </label>
                  <textarea
                    value={noteData.note}
                    onChange={(e) => setNoteData({...noteData, note: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={noteData.created_by}
                    onChange={(e) => setNoteData({...noteData, created_by: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Add Note
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowingNotes(null)}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GigsTab 