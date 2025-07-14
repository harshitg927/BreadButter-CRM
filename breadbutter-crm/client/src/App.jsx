import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ClientsTab from './components/ClientsTab'
import TalentsTab from './components/TalentsTab'
import GigsTab from './components/GigsTab'
import NotesTab from './components/NotesTab'

function App() {
  const [activeTab, setActiveTab] = useState('clients')

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'clients':
        return <ClientsTab />
      case 'talents':
        return <TalentsTab />
      case 'gigs':
        return <GigsTab />
      case 'notes':
        return <NotesTab />
      default:
        return <ClientsTab />
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Creative Ops Hub
          </h1>
        </header>
        <main className="flex-1 overflow-auto px-8 py-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  )
}

export default App 