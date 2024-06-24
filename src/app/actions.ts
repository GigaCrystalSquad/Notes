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
}
export async function getNotesList() {
  const notes_list = await prisma.note.findMany();
  console.log("getNotes");
  console.log(notes_list);
  console.log( notes_list.map((x) => {return({noteid:x.id, text:x.text, modified:false})}));
  return(
    Array(notes_list.map((x) => {return({noteid:x.id, text:x.text, modified:false})}))
)
}