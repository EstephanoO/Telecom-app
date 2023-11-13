import React from 'react'
import axios from 'axios'
import Files from './filess'

async function LoadFiles() {
  const result = await axios.get('http://localhost:3000/api/archivos')
  return(result.data)
}

async function page() {
    const files = await LoadFiles()
  return (
    <div>
        <Files items={files}/>
    </div>
  )
}

export default page