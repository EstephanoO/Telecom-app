import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req, res) {
  try {
    const roles = await prisma.rol.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    return NextResponse.json({ error: "Error al obtener roles" });
  }
}

export async function POST(req, res) {
    try {
      const { name } = await req.json();
  
      // Crear el rol sin asociarlo a un usuario
      const newRole = await prisma.rol.create({
        data: {
          name,
        },
      });
  
      return NextResponse.json(newRole);
    } catch (error) {
      console.error("Error al crear el rol:", error);
      return NextResponse.json({ error: "Error al crear el rol" });
    }
  }