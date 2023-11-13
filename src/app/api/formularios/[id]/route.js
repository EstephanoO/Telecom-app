import { NextResponse } from 'next/server'
import prisma from '@/libs/db'

export async function GET(request, { params }) {
  // Recuperar todos los formularios
  const formularios = await prisma.formulario.findMany();

  // Filtrar los formularios para obtener solo los que tienen UsuarioID igual a 9
  const formulariosUsuarioID9 = formularios.filter((formulario) => formulario.UsuarioID === parseInt(params.id));

  return NextResponse.json(formulariosUsuarioID9, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}



export async function PATCH(request, { params }) {
  const { Nombre, Grupo, NombresGrupo, TipoTrabajo, TrabajoRealizado, Ubicacion, Observacion } = await request.json();

  const updatedFormulario = await prisma.formulario.update({
    where: {
      ID: parseInt(params.id),
    },
    data: {
      Nombre,
      Grupo,
      NombresGrupo,
      TipoTrabajo,
      TrabajoRealizado,
      Ubicacion,
      Observacion,
    },
  });

  return NextResponse.json(updatedFormulario);
}
export async function DELETE(req, { params }) {
  try {
    const deletedFormulario = await prisma.formulario.delete({
      where: {
        ID: parseInt(params.id),
      },
    });

    return NextResponse.json(deletedFormulario);
  } catch (error) {
    console.error("Error al eliminar el formulario:", error);
    // Enviar una respuesta antes de capturar el error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
