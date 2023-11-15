import StickyHeadTable from './tabla'
import axios from 'axios'
import settings from '@/libs/settings'

const API_URL = settings.apiUrl;

async function LoadUsers() {
    const result = await axios.get(`${API_URL}/formularios`)
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