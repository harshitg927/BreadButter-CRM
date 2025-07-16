import { useState, useEffect } from 'react'
import { api } from '../utils/api'

const TalentsTab = () => {
  const [talents, setTalents] = useState([])
  const [isAddingTalent, setIsAddingTalent] = useState(false)
  const [editingTalent, setEditingTalent] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    city: ''
  })

  useEffect(() => {
    fetchTalents()
  }, [])

  const fetchTalents = async () => {
    try {
      const data = await api.talents.getAll()
      setTalents(data)
    } catch (error) {
      console.error('Error fetching talents:', error)
      alert('Error fetching talents')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const talentData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      }
      
      if (editingTalent) {
        await api.talents.update(editingTalent._id, talentData)
      } else {
        await api.talents.create(talentData)
      }
      setFormData({ name: '', skills: '', city: '' })
      setIsAddingTalent(false)
      setEditingTalent(null)
      fetchTalents()
    } catch (error) {
      console.error('Error saving talent:', error)
      alert('Error saving talent')
    }
  }

  const handleEdit = (talent) => {
    setEditingTalent(talent)
    setFormData({
      name: talent.name,
      skills: talent.skills.join(', '),
      city: talent.city
    })
    setIsAddingTalent(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this talent?')) {
      try {
        await api.talents.delete(id)
        fetchTalents()
      } catch (error) {
        console.error('Error deleting talent:', error)
        alert('Error deleting talent')
      }
    }
  }

  const handleCancel = () => {
    setIsAddingTalent(false)
    setEditingTalent(null)
    setFormData({ name: '', skills: '', city: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Talents</h2>
        <button
          onClick={() => setIsAddingTalent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Talent
        </button>
      </div>

      {isAddingTalent && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-6 text-gray-900 dark:text-white">
            {editingTalent ? 'Edit Talent' : 'Add New Talent'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (comma separated)
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Photography, Video, Editing"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {editingTalent ? 'Update' : 'Save'}
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {talents.map(talent => (
              <tr key={talent._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {talent.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                  {talent.skills.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {talent.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 space-x-3">
                  <button
                    onClick={() => handleEdit(talent)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(talent._id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {talents.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-sm">No talents found. Add your first talent!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TalentsTab 