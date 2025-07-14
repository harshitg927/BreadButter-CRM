import { Users, User, Briefcase, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'talents', label: 'Talents', icon: <User className="w-5 h-5" /> },
    { id: 'gigs', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="w-5 h-5" /> }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors group ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
              {tab.icon}
            </span>
            <span className="font-medium text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar 