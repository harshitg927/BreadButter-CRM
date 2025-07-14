import { useState, useEffect } from 'react'
import { api } from '../utils/api'

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
      alert('Error fetching data')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const gigData = {
        ...formData,
        clientId: parseInt(formData.clientId),
        talentId: parseInt(formData.talentId)
      }
      
      if (editingGig) {
        await api.gigs.update(editingGig.id, gigData)
      } else {
        await api.gigs.create(gigData)
      }
      setFormData({ title: '', clientId: '', talentId: '', status: 'In Progress' })
      setIsAddingGig(false)
      setEditingGig(null)
      fetchData()
    } catch (error) {
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
      await api.gigs.addNote(showingNotes.id, noteData)
      setNoteData({ note: '', type: 'text', created_by: '' })
      fetchData()
    } catch (error) {
      alert('Error adding note')
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

  const statusOptions = ['In Progress', 'Delivered', 'Pending']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        <button
          onClick={() => setIsAddingGig(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Project
        </button>
      </div>

      {isAddingGig && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6 text-gray-900">
            {editingGig ? 'Edit Project' : 'Add New Project'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client
              </label>
              <select
                value={formData.clientId}
                onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Talent
              </label>
              <select
                value={formData.talentId}
                onChange={(e) => setFormData({...formData, talentId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a talent</option>
                {talents.map(talent => (
                  <option key={talent.id} value={talent.id}>
                    {talent.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Talent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {gigs.map(gig => (
              <tr key={gig.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {gig.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {getClientName(gig.clientId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
                    onClick={() => handleDelete(gig.id)}
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
          <div className="text-center py-12 text-gray-500">
            <p className="text-sm">No projects found. Add your first project!</p>
          </div>
        )}
      </div>

      {showingNotes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Notes for: {showingNotes.title}
              </h3>
              <button
                onClick={() => setShowingNotes(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-4 mb-6">
                {showingNotes.updates && showingNotes.updates.length > 0 ? (
                  showingNotes.updates.map((update, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-800">{update.note}</p>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>By: {update.created_by}</span>
                        <span>{update.timestamp}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No notes yet.</p>
                )}
              </div>

              <form onSubmit={handleAddNote} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Note
                  </label>
                  <textarea
                    value={noteData.note}
                    onChange={(e) => setNoteData({...noteData, note: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={noteData.created_by}
                    onChange={(e) => setNoteData({...noteData, created_by: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GigsTab 