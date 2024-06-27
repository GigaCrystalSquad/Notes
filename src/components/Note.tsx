'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {deleteNote, getNotesList, saveNotes, updateNote} from "../app/actions"
export default function Note({id, text, deleteFunc, noteEditFunc, noteChangeStatusFunc, editing}) {
  const keyboardHandler = (event: React.KeyboardEvent<HTMLInputElement>) => { 
    if (event.key === 'Enter') {
      noteChangeStatusFunc(id);
    } 
  }
  if (editing == 0) {
    return (
      <Button variant="default" onClick={e => noteChangeStatusFunc(id)}>
        <p> {text}</p>
      </Button>
    )
  } else {
    return (
      <Button variant="default" onClick={e => noteChangeStatusFunc(id)}>
        <input id="new_note_text"
         className="new_note_text"
          type="text" 
          onClick = {e => e.stopPropagation()} 
          value = {text} 
          onChange={x=>noteEditFunc(id, x.target.value)}
          onKeyDown={x=> keyboardHandler(x)}
          />
          <Button variant="destructive"> OK</Button>
        <Button variant="destructive" onClick={(e)=>{e.stopPropagation();deleteFunc(id)}}>Delete </Button>
        </Button>
    )
  }
}