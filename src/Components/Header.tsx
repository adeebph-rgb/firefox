import { useState } from 'react'
import Shortcuts from './Shortcuts'

import Logo from '../assets/firefox.svg'
import googleIcon from '../assets/Google_Favicon_2025.svg'
import { Input } from "../../@/components/ui/input"


interface Shortcut {
  title: string
  href: string
  image?: string
}

function loadShortcuts(): Shortcut[] {
  const saved = localStorage.getItem('shortcuts')
  return saved ? JSON.parse(saved) : []
}

export default function Header({ searchQuery, onSearch, shortcutEnabled, rowCount }: { searchQuery: string; onSearch: (query: string) => void; shortcutEnabled: boolean; rowCount: number }) {
  const [shortcuts, setShortcuts] = useState(loadShortcuts())
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const editingShortcut = editingIndex != null ? shortcuts[editingIndex] : null
  
  function addShortcut(shortcut: Shortcut) {
    setShortcuts((current) => {
      const updated = [...current, shortcut]
      localStorage.setItem('shortcuts', JSON.stringify(updated))
      return updated
    })
  }

  function editShortcut(index: number, shortcut: Shortcut) {
    setShortcuts((current) => {
      const updated = [...current]
      updated[index] = shortcut
      localStorage.setItem('shortcuts', JSON.stringify(updated))
      return updated
    })
  }
  function handleEditClick(index: number) {
    setEditingIndex(index)
    setDialogOpen(true)
  }
  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open)
    if(!open) setEditingIndex(null)

  }
  function handleDeleteOperation(index: number) {
    setShortcuts((current) => {
      const updated = [...current]
      updated.splice(index, 1)
      localStorage.setItem('shortcuts', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <header className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-2 p-3">
        <img src={Logo} alt="Firefox Logo" className="w-16 h-16 object-contain" />
        <h1 className="text-4xl font-semibold tracking-tight text-slate-800 dark:text-white">Firefox</h1>
      </div>
      <div className="relative w-1/2 self-center flex">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
          <img src={googleIcon} alt="Google Icon" className="w-5 h-5 object-contain" />
        </span>
        <Input
          placeholder="Search with Google or enter address"
          className="w-full pl-12 rounded-2xl h-12 bg-zinc-100 dark:bg-zinc-800 border-none focus-visible:ring-2 focus-visible:ring-indigo-500" 
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className=" flex flex-wrap justify-center gap-6 w-full max-w-4xl px-4 self-center">
        {
          shortcutEnabled && (<Shortcuts 
          shortcuts={shortcuts} 
          onEdit = {handleEditClick}
          onDelete = {handleDeleteOperation}
          shortcutEnabled={shortcutEnabled}
          onAddShortcut={addShortcut} 
          editingShortcut={editingShortcut} 
          editingIndex={editingIndex} 
          onEditShortcut={editShortcut} 
          open={dialogOpen} 
          onOpenChange={handleDialogOpenChange}
          rowCount={rowCount}/>
          )
        }
        
      </div >
    </header>
  )
}
