import React from 'react'
import axios from 'axios'
import Files from './filess'
import settings from '@/libs/settings'

const API_URL = settings.apiUrl;

async function LoadFiles() {
  const result = await axios.get(`${API_URL}/archivos`)
  return(result.data)
}

async function FilesPage() {
    const files = await LoadFiles()
  return (
    <div>
        <Files items={files}/>
    </div>
  )
}

export default FilesPage