'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {deleteNote, getNotesList, saveNotes, updateNote} from "../app/actions";
import Note from "./Note";
import AddNoteNote from './AddNoteNote';

export default  function Gallery() {
  const [n, setN] = useState(1);
  const [notes, setNotes] = useState< {
    noteid: number;
    text: string | null;
    modified: boolean;
}[]>( [{noteid:0,text:"example", modified:false}]);
  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getNotesList();
      setNotes(fetchedNotes); 
    } 
    fetchNotes();
  }, []);
  async function AddNotes(text: string) {
    const newNoteId = await saveNotes(text);
    setNotes(notes => [...notes, { noteid: newNoteId, text: text, modified: true }]);
    setN(n => n + 1);
  }
  function noteDelete(note_id: number) {
    setNotes(notes.filter(x => x.noteid != note_id));
    deleteNote(note_id);
  }
  function noteChangeStatus(note_id: number) {
    setNotes(notes.map(x => {
      if (x.noteid == note_id) {
        x.modified = !x.modified;
        updateNote(note_id, x.text);
      } 
      return x;
    }
    ))
  }
  function noteOnEditing(note_id: number, note_text: string ) {
    setNotes(notes.map(x => {
      if (x.noteid == note_id) {
        x.text = note_text;
      } 
//      updateNote(note_id, note_text);
      return x;
    }
    ))
  }
  let outp = notes.map(x => <Note
   key = {x.noteid} 
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