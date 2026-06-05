import './App.css'
import Header from './Components/Header'
import NewsGrid from './Components/Newsgrid'
import { useState } from 'react'
import {DrawerScrollableContent} from './Components/Sidebar'


function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [shortcutEnabled, setShortcutEnabled] = useState(() =>
  localStorage.getItem('shortcutEnabled') === 'true'
  
)
  const [storiesEnabled, setStoriesEnabled] = useState<boolean>(() => {
    return localStorage.getItem('storiesEnabled') === 'true'
  })

const [rowCount, setRowCount] = useState(() =>
  Number(localStorage.getItem('rowCount')) || 1
)
  return( 
  
    <div>
      <Header searchQuery={searchQuery} onSearch={setSearchQuery}  shortcutEnabled={shortcutEnabled} rowCount={rowCount} />
      <NewsGrid searchQuery={searchQuery} storiesEnabled={storiesEnabled}/>
      <DrawerScrollableContent 
      shortcutEnabled={shortcutEnabled} 
      rowCount={rowCount} 
      setRowCount={setRowCount}
      setShortcutEnabled={setShortcutEnabled}
      setStoriesEnabled={setStoriesEnabled}
      storiesEnabled={storiesEnabled}
      />
    </div>
  )
}

export default App
