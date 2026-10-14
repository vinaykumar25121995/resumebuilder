import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const exists = await prisma.user.findUnique({
      where: { email }
    })

    if (exists) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // Automatically create empty profile
    await prisma.profile.create({
      data: {
        userId: user.id
      }
    })

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
