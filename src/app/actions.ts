'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
export async function saveNotes(text: string) {
    const newUser = await prisma.note.create({
        data: {
          text: text,
        },
      })
      
   // const users = await prisma.user.findMany()
    console.log("SaveNotes");
    return newUser.id;
}
export async function getNotesList() {
  const notes_list = await prisma.note.findMany();
  console.log("getNotes");
  return(
    notes_list.map((x) => {return({noteid:x.id, text:x.text, modified:false})})
)
}
export async function updateNote(id: number, text:string) {
  const updateUser = await prisma.note.update({
    where: {
      id: id,
    },
    data: {
      text: text,
    },
  })
}
export async function deleteNote(id:number) {
  const deleteUser = await prisma.note.delete({
    where: {
      id: id,
    },
  })
  
}