import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req,{params}) {
    const usuario = await prisma.user.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
            roles: true,
          },
    });
    const roles = usuario.carpetas.reduce((acc, carpeta) => {
      acc.push(...carpeta.roles);
      return acc;
    }, []);

    return NextResponse.json(roles);
}


export async function DELETE(req, { params }) {
  try {
    const deletedRole = await prisma.rol.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json(deletedRole);
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    return NextResponse.json({ error: "Error al eliminar el rol" });
  }
}
