
'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {deleteNote, getNotesList, saveNotes, updateNote} from "./actions"
function Note({id, text, deleteFunc, noteEditFunc, noteChangeStatusFunc, editing}) {
  const keyboardHandler = (event) => { 
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
function AddNoteNote({stateChanger}) {
  let text = "new note";
  return (<Button variant="outline"
    onClick={() => stateChanger(text)}> <p>add note</p>
    </Button>)
}
function Gallery() {
  const [n, setN] = useState(1);
  const [notes, setNotes] = useState( [{noteid:0,text:"example", modified:false}]);
  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getNotesList();
      setNotes(fetchedNotes); 
    }
    fetchNotes();
  }, []);
  function AddNotes(text: string) {
    setNotes(notes => [...notes, {noteid:n, text:text, modified:true}]);
    saveNotes(text);
    setN(n => n + 1);

  }
  function noteDelete(note_id) {
    setNotes(notes.filter(x => x.noteid != note_id));
    deleteNote(note_id);
  }
  function noteChangeStatus(note_id) {
    setNotes(notes.map(x => {
      if (x.noteid == note_id) {
        x.modified = !x.modified;
        updateNote(note_id, x.text);
      } 
      return x;
    }
    ))
  }
  function noteOnEditing(note_id, note_text) {
    setNotes(notes.map(x => {
      if (x.noteid == note_id) {
        x.text = note_text;
      } 
      updateNote(note_id, note_text);
      return x;
    }
    ))
  }
  let outp = notes.map(x => <Note
//   key = {x.id} 
    id = {x.noteid} 
    text={x.text} 
    deleteFunc ={noteDelete} 
    noteEditFunc = {noteOnEditing}
    noteChangeStatusFunc = {noteChangeStatus}
    editing = {x.modified} />);

 // notes.push(Note("example note"));
  return (<div>
    {outp}
    <AddNoteNote stateChanger={AddNotes} /> 
  </div>)
}
export default function Home() {
  return (
    <main>
      <h1> Notes </h1>
      <Gallery />
    </main>
  );
}
