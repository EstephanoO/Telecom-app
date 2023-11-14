import StickyHeadTable from './tabla'
import axios from 'axios'

async function LoadUsers() {
    const result = await axios.get('monorail.proxy.rlwy.net:24690/api/formularios')
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