import { NextResponse } from "next/server";
import prisma from '@/libs/db'

export async function GET(req, res) {
      const carpetas = await prisma.carpeta.findMany({
        include: {
          archivos: true,
          usuario: true,
        },
      });
      return NextResponse.json(carpetas);
}
