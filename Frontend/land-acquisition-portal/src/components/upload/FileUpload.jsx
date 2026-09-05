import React, { useRef, useState } from 'react'
import { UploadCloud, FileText } from 'lucide-react'

export default function FileUpload({ onFiles, accept = '.pdf,.jpg,.jpeg,.png', multiple = false }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [pending, setPending] = useState([])

  const handleFiles = (fileList) => {
    const files = Array.from(fileList)
    setPending(files)
    onFiles?.(files)
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed px-6 py-8 text-center transition-colors ${
          dragOver ? 'border-saffron-500 bg-saffron-50' : 'border-navy-200 bg-navy-50/40 hover:border-navy-300'
        }`}
      >
        <UploadCloud size={28} className="text-navy-400" />
        <p className="text-sm font-semibold text-navy-700">Drag &amp; drop a file here, or click to browse</p>
        <p className="text-xs text-navy-400">Accepted: PDF, JPG, PNG · Max 10 MB</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {pending.length > 0 && (
        <ul className="mt-3 space-y-2">
          {pending.map((f) => (
            <li key={f.name} className="flex items-center gap-2 rounded-sm border border-navy-100 bg-white px-3 py-2 text-sm text-navy-700">
              <FileText size={16} className="text-navy-400" />
              <span className="truncate">{f.name}</span>
              <span className="ml-auto text-xs text-navy-400">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
