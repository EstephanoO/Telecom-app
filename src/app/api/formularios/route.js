import { NextResponse } from "next/server";
import prisma from '@/libs/db';

export async function GET(req, res) {
  try {
    const usuarios = await prisma.formulario.findMany();

    return NextResponse.json(usuarios, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json({ error: "Error al obtener usuarios" });
  }
}

export async function POST(req, res) {
  try {
    // obtén los datos del cuerpo de la solicitud
    const formData = await req.json();

    // realiza la creación del formulario en la base de datos
    const createdFormulario = await prisma.formulario.create({
      data: formData,
    });

    // responde con el formulario creado
    return NextResponse.json(createdFormulario, { status: 201 });
  } catch (error) {
    console.error("Error al crear el formulario:", error);
    return NextResponse.json({ error: "Error al crear el formulario" }, { status: 500 });
  }
}