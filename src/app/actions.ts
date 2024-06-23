'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
export async function saveNotes(text: string) {
    const newUser = await prisma.Note.create({
        data: {
          text: text,
        },
      })
      
   // const users = await prisma.user.findMany()
    console.log("SaveNotes");
}