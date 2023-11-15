
const ListaRA = () => {
    const [formData, setFormData] = useState([]);
    const [raDataForUser, setRaDataForUser] = useState([]);
  
    useEffect(() => {
      const fetchFormData = async () => {
        try {
          const response = await fetch(`${API_URL}/formularios`);
          if (response.ok) {
            const data = await response.json();
            setFormData(data);
  
            // Filtra los datos para el usuario "SILMER PUELLES" y tipo de trabajo 'RA'
            const raData = data.filter(
              (formulario) => formulario.NombreUsuario === 'SILMER PUELLES' && formulario.TipoTrabajo === 'RA'
            );
            setRaDataForUser(raData);
          } else {
            console.error('Error al obtener datos de formularios');
          }
        } catch (error) {
          console.error('Error al obtener datos de formularios: ' + error);
        }
      };
  
      fetchFormData();
    }, []);
  
    // Calcula la cantidad total de trabajos de tipo 'RA' para el usuario "SILMER PUELLES"
    const totalRaForUser = raDataForUser.reduce(
      (total, formulario) => total + parseInt(formulario.TrabajoRealizado, 10),
      0
    );
  
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <div>
          <h2>Lista para SILMER PUELLES - Trabajos RA</h2>
          <ul>
            {raDataForUser.map((formulario) => (
              <li key={formulario.id}>
                {`Fecha: ${formulario.Fecha}, Trabajo Realizado: ${formulario.TrabajoRealizado} m`}
              </li>
            ))}
          </ul>
          <h2>Total de Trabajos RA para SILMER PUELLES: {totalRaForUser} m</h2>
        </div>
        {/* Resto de tu código JSX existente */}
      </main>
    );
  };
  
  export default ListaRA;
  