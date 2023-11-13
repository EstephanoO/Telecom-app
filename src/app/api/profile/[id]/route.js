// Import necessary modules
import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req, { params }) {
  try {
    // Obtener datos del usuario
    const usuario = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!usuario) {
      return NextResponse.error({ error: 'User not found' }, { status: 404 });
    }

    // Configurar encabezados de control de acceso
    const headers = {
      'Access-Control-Allow-Origin': '*', // Permite solicitudes desde cualquier origen
      'Access-Control-Allow-Methods': 'GET', // Permitir solo solicitudes GET
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Permitir ciertos encabezados
    };

    // Devolver la respuesta con los datos del usuario y los encabezados de control de acceso
    return NextResponse.json(usuario, { headers });
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return NextResponse.error({ error: 'Internal Server Error' }, { status: 500 });
  }
}
