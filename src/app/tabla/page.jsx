import StickyHeadTable from './tabla'
import axios from 'axios'

async function LoadUsers() {
    const result = await axios.get('http://localhost:3000/api/formularios')
    return(result.data)
}

async function TablaPage() {
  const users = await LoadUsers()
  return (
    <section>
        <StickyHeadTable users={users}>
        </StickyHeadTable>
        </section>
  )
}

export default TablaPage