import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req,{params}) {
    const usuario = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        carpetas: {
          include: {
            archivos: true,
          },
        },
      },
    });
    const archivos = usuario.carpetas.reduce((acc, carpeta) => {
      acc.push(...carpeta.archivos);
      return acc;
    }, []);

    return NextResponse.json(archivos);
}
