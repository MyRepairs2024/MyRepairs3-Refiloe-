import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, surname, email, address, password, contactnumber } = req.body;

  try {
    const existingProvider = await prisma.provider_reg.findUnique({
      where: { email },
    });

    if (existingProvider) {
      return res.status(409).json({ error: 'Email already exists for provider.' });
    }

    const provider = await prisma.provider_reg.create({
      data: {
        name,
        surname,
        email,
        address,
        password,
        contactnumber,
      },
    });

    return res.status(201).json({ message: 'Provider registered successfully', provider });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
