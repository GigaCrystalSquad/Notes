'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {deleteNote, getNotesList, saveNotes, updateNote} from "../app/actions"
import { Textarea } from "@/components/ui/textarea"

export default function Note({id, text, deleteFunc, noteEditFunc, noteChangeStatusFunc, editing}:{id:number, text: string | null,  deleteFunc:any, noteEditFunc:any, noteChangeStatusFunc:any, editing:any}) {
  const keyboardHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { 
    if (event.key === 'Enter') {
      noteChangeStatusFunc(id);
    } 
  }
  if (editing == 0) {
    return (
        <div className='note_container'>
        <div className='note' onClick={e => noteChangeStatusFunc(id)}>
            <p> {text}</p>
      </div>
      </div>
    )
  } else {
    return (
    <div className='note' onClick={e => noteChangeStatusFunc(id)}>
        <Textarea id="new_note_text"
         className="new_note_text"
          onClick = {e => e.stopPropagation()} 
          value = {text ?? ""} 
          onChange={x=>noteEditFunc(id, x.target.value)}
          onKeyDown={x=> keyboardHandler(x)}
          />
          <Button variant="destructive"> OK</Button>
        <Button variant="destructive" onClick={(e)=>{e.stopPropagation();deleteFunc(id)}}>Delete </Button>
    </div>
    )
  }
}