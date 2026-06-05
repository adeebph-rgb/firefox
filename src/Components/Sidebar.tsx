import { useState, useRef, useEffect } from 'react'
import { Button } from "../../@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../../@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu"

interface DrawerScrollableContentProps {
  shortcutEnabled: boolean
  rowCount: number
  setRowCount: (count: number) => void
  setShortcutEnabled: (enabled: boolean) => void
  setStoriesEnabled: (enabled:boolean) => void
  storiesEnabled:boolean
s
}

export function DrawerScrollableContent({ shortcutEnabled, rowCount, setRowCount, setShortcutEnabled, setStoriesEnabled, storiesEnabled }: DrawerScrollableContentProps) {
  console.log('Drawer component rendered')
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [wallpapersEnabled, setWallpapersEnabled] = useState<boolean>(() => {
    return localStorage.getItem('wallpapersEnabled') === 'true'
  })



  const fileInputRef = useRef<HTMLInputElement>(null)

  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('uploadedWallpapers')
    return saved ? JSON.parse(saved) : []
  })

  const [activeWallpaper, setActiveWallpaper] = useState<string | null>(() => {
    return localStorage.getItem('activeWallpaper')
  })


  useEffect(() => {
    if (activeWallpaper  && wallpapersEnabled) {
       document.body.style.backgroundImage = `url(${activeWallpaper})`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
    console.log('applied:', document.body.style.backgroundImage)
      
    }
    else{
      document.body.style.backgroundImage ='none'
    }
  }, [activeWallpaper, wallpapersEnabled])

  function addWallpaper() {
    fileInputRef.current?.click()
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const current = reader.result as string
        setUploadedImages(prev => {
          const updated = [...prev, current]
          try{
          localStorage.setItem('uploadedWallpapers', JSON.stringify(updated))

          }catch(e){
            console.warn('localStorage full, wallpaper not saved', e)
          }
          return updated
        })
      }
      reader.readAsDataURL(file)
      event.target.value = ''
    }
  }

  function applyWallpaper(url: string) {
    setActiveWallpaper(url)
    try{
    localStorage.setItem('activeWallpaper', url)

    }catch(e){
      console.warn('Could not persist active wallpaper')
    }
  }

  return (
     <Drawer direction="right" open={isOpen} modal={false} shouldScaleBackground={false} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) setIsHovered(false)
    }}>
      {!isOpen && (
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed bottom-4 right-2 z-50 transition-all duration-700 ${isHovered ? "w-28" : "w-9"} rounded-full border border-none shadow-sm hover:shadow-md bg-slate-800 text-white`}
          >
            <span className={`transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}>
              Customize
            </span>
            <span className={`absolute transition-opacity duration-700 ${isHovered ? "opacity-0" : "opacity-100"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </span>
          </Button>
        </DrawerTrigger>
      )}

      <DrawerContent className="bg-zinc-800 text-white flex-col h-full">
        <div className="drawer-content p-4 flex flex-col gap-4 overflow-y-auto mb-6">

          <div className="flex flex-row justify-between items-center border-">
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => {
                  const updated = !wallpapersEnabled
                  setWallpapersEnabled(updated)
                  localStorage.setItem('wallpapersEnabled', String(updated))
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  wallpapersEnabled ? 'bg-blue-500' : 'bg-zinc-500'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    wallpapersEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-base font-medium">Wallpapers</span>
            </div>

            <DrawerClose asChild>
              <Button variant="outline" className="w-4 h-4 border-none">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </Button>
            </DrawerClose>
          </div>

          
          
            <div className="flex flex-wrap gap-2 mt-4 border-b border-zinc-500 pb-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

             
              <div
                onClick={addWallpaper}
                className="border border-dashed border-white w-32 h-24 flex items-center justify-center cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3">
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </div>
             
              {uploadedImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => applyWallpaper(img)}
                  className={`w-32 h-24 cursor-pointer overflow-hidden border-2 transition-all ${
                    activeWallpaper === img ? 'border-blue-400' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`wallpaper-${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

              <div className = 'flex flex-col border-b border-zinc-500 pb-6 mt-4'>
                <div className="flex items-center gap-2 ">
              <button
                onClick={() => {
                  const updated = !shortcutEnabled
                  setShortcutEnabled(updated)
                  localStorage.setItem('shortcutEnabled', String(updated))
                }}

                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  shortcutEnabled ? 'bg-blue-500' : 'bg-zinc-500'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    shortcutEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-base font-medium">Shortcuts</span>
            </div>
            <div className='mt-4 p-4 flex flex-row items-center justify-between'>
              
              <h1>Number of Rows</h1>
              <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button  className="" variant="outline">{rowCount?` ${rowCount}`:'Rows'}
</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 text-white border-none shadow-lg">
                <DropdownMenuGroup >
                  <DropdownMenuItem
                    className="text-white cursor-pointer focus:bg-slate-700 hover:bg-slate-700"
                    onClick={() => {
                      setRowCount(1)
                      localStorage.setItem('rowCount', '1')
                    }}
                  >
                    1
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-white cursor-pointer focus:bg-slate-700 hover:bg-slate-700 ' 
                    onClick={() =>{setRowCount(2)
                      localStorage.setItem('rowCount','2')
                    }}>
                    2
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-white cursor-pointer focus:bg-slate-700 hover:bg-slate-700 ' 
                  onClick={() => {setRowCount(3)
                    localStorage.setItem('rowCount','3')
                  }}>
                    3
                  </DropdownMenuItem>
                   <DropdownMenuItem className='text-white cursor-pointer focus:bg-slate-700 hover:bg-slate-700 ' 
                  onClick={() => {setRowCount(4)
                    localStorage.setItem('rowCount','4')
                  }}>
                    4
                  </DropdownMenuItem>
                </DropdownMenuGroup>
            
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
              </div>


              <div className = 'flex flex-col'>
                <div className="flex items-center gap-2 ">
              <button
                onClick={() => {
                  const updated = !storiesEnabled
                  setStoriesEnabled(updated)
                  localStorage.setItem('storiesEnabled', String(updated))
                }}

                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  storiesEnabled ? 'bg-blue-500' : 'bg-zinc-500'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
                    storiesEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-base font-medium">Recommended Stories</span>
            </div>
              </div>
            
            
       

        </div>
      </DrawerContent>
    </Drawer>
  )
}