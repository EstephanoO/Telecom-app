import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req, res) {
    console.log(req)
  const { userId } = req;

  try {
    const usuario = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        carpetas: {
          include: {
            archivos: true,
          },
        },
      },
    });

    // Filtrar y obtener solo los archivos
    const archivos = usuario.carpetas.reduce((acc, carpeta) => {
      acc.push(...carpeta.archivos);
      return acc;
    }, []);

    NextResponse.json(archivos);
  } catch (error) {
    console.error("Error al obtener archivos:", error);
    NextResponse.json({ error: "Error al obtener archivos" });
  }
}
