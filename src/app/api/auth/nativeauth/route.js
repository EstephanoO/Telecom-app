// pages/api/login.js
import bcrypt from 'bcrypt';
import prisma from '@/libs/db';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  if (req.method !== 'POST') {
    return NextResponse.error({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.error('Invalid credentials');
      return NextResponse.error({ error: 'Invalid credentials' }, { status: 401 });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      console.error('Invalid credentials');
      return NextResponse.error({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generar un token
    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

    console.log('Login successful:', { userId: user.id, token });

    // Devolver el token, userId, username y email
    return NextResponse.json({
      token,
      userId: user.id,
      username: user.username, // Asumo que el nombre de usuario se encuentra en la propiedad 'username'
      email: user.email,
    }, { status: 200 });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.error({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req, res) {
  if (req.method !== 'GET') {
    console.error('Method Not Allowed');
    return NextResponse.error({ error: 'Method Not Allowed' }, { status: 405 });
  }

  // Implementar lógica para manejar solicitudes GET

  return NextResponse.json({ message: 'GET request handled' });
}
