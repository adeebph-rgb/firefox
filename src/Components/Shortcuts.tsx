import { Button } from "../../@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu"
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../@/components/ui/dialog"
import { Field, FieldGroup } from "../../@/components/ui/field"
import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"

interface Shortcut {
  title: string
  href: string
  image?: string
}

interface ShortcutsProps {
  shortcuts: Shortcut[]
  onEdit: (index: number) => void
  onDelete: (index: number) => void
  onAddShortcut: (shortcut: Shortcut) => void
  editingShortcut?: Shortcut | null
  editingIndex?: number | null
  onEditShortcut?: (index: number, shortcut: Shortcut) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  shortcutEnabled: boolean
  rowCount: number
}

export default function Shortcuts({
  shortcuts,
  onEdit,
  onDelete,
  onAddShortcut,
  editingShortcut,
  editingIndex,
  onEditShortcut,
  open,
  onOpenChange,
  shortcutEnabled,
  rowCount,
}: ShortcutsProps) {
  const [title, setTitle] = useState(editingShortcut?.title ?? "")
  const [url, setUrl] = useState(editingShortcut?.href ?? "")
  const [imageUrl, setImageUrl] = useState(editingShortcut?.image ?? "")

  useEffect(() => {
    setTitle(editingShortcut?.title ?? "")
    setUrl(editingShortcut?.href ?? "")
    setImageUrl(editingShortcut?.image ?? "")
  }, [editingShortcut])

  function handleAdd() {
    if (!title.trim() || !url.trim()) return

    const shortcut: Shortcut = {
      title: title.trim(),
      href: url.trim(),
      image: imageUrl.trim() || undefined,
    }

    if (editingShortcut != null && editingIndex != null && onEditShortcut) {
      onEditShortcut(editingIndex, shortcut)
    } else {
      onAddShortcut(shortcut)
    }

    setTitle("")
    setUrl("")
    setImageUrl("")
    onOpenChange(false)
  }

  return (
    <div className="flex flex-wrap items-start justify-center gap-4 mb-16 mt-2">
      {shortcuts.slice(0, rowCount * 8).map((shortcut, index) => (
  <div key={index} className="flex flex-col items-center gap-1 w-20 flex-shrink-0">
    <div className="group p-3 border-2 rounded-2xl border-gray-400 transition duration-300 ease-in-out hover:border-white hover:shadow-2xl hover:scale-105 relative w-20 h-20 flex items-center justify-center">
      <button
        type="button"
        onClick={() => window.location.href = shortcut.href}
        className="shortcut-card"
      >
        {shortcut.image ? (
          <img
            src={shortcut.image}
            alt={shortcut.title}
            className="w-12 h-12 rounded-xl object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-indigo-500 text-white grid place-items-center font-bold">
            {shortcut.title?.[0] ?? '?'}
          </div>
        )}
      </button>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute -right-2 top-0 border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rotate-90"
            variant="outline"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
              <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800 text-white border-none shadow-lg">
          <DropdownMenuGroup>
            <DropdownMenuLabel
              className="text-white cursor-pointer hover:bg-slate-700"
              onClick={() => onEdit(index)}
            >
              Edit
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="text-white cursor-pointer hover:bg-slate-700"
              onClick={() => onDelete(index)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <span className="text-xs text-white text-center w-full line-clamp-2 break-words">{shortcut.title}</span>
  </div>
))}

      <Dialog open={open} onOpenChange={onOpenChange}>
        {shortcutEnabled && (
          <DialogTrigger asChild>
            <div className="flex flex-col items-center gap-1 w-20 flex-shrink-0 cursor-pointer">
              <div className="border-2 rounded-2xl border-gray-400 transition duration-300 ease-in-out hover:border-white hover:shadow-2xl hover:scale-105 relative w-20 h-20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="white"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
              </div>
            </div>
          </DialogTrigger>
        )}

        <DialogContent className="sm:max-w-sm bg-black text-white">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingShortcut ? "Edit Shortcut" : "New Shortcut"}
            </DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                name="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleAdd}>
              {editingShortcut ? "Save" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}