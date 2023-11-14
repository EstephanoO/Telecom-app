import StickyHeadTable from './tabla'
import axios from 'axios'

async function LoadUsers() {
    const result = await axios.get('https://telecomprueba-production.up.railway.app/formularios')
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