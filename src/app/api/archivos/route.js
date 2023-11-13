import { NextResponse } from "next/server";
import prisma from '@/libs/db'

export async function GET(req, res) {
  const carpetas = await prisma.carpeta.findMany({
    include: {
      archivos: true,
      usuario: { // Incluir la información del usuario
        select: {
          username: true
        }
      }
    },
  });

  // Mapear el resultado para agregar el nombre del usuario en cada carpeta
  const carpetasConUsuario = carpetas.map(carpeta => ({
    ...carpeta,
    nombreUsuario: carpeta.usuario.username // Agregar el nombre del usuario
  }));

  return NextResponse.json(carpetasConUsuario);
}
