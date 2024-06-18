import React from 'react';
import { useState } from 'react';
function Note({id, text, deleteFunc, noteEditFunc, noteChangeStatusFunc, editing}) {
  const keyboardHandler = (event) => { 
    if (event.key === 'Enter') {
      noteChangeStatusFunc(id);
    } 
  }
  if (editing == 0) {
    return (
      <div className = "note" onClick={e => noteChangeStatusFunc(id)}>
        <p> {text}</p>
      </div>
    )
  } else {
    return (
      <div className = "note" onClick={e => noteChangeStatusFunc(id)}>
        <input id="new_note_text"
         className="new_note_text"
          type="text" 
          onClick = {e => e.stopPropagation()} 
          value = {text} 
          onChange={x=>noteEditFunc(id, x.target.value)}
          onKeyDown={x=> keyboardHandler(x)}
          />
        <button onClick={()=>deleteFunc(id)}/>
      </div>
    )
  }
}
function AddNoteNote({stateChanger}) {
  let text = "new note";
  return (<div 
    className="note"
    onClick={() => stateChanger(text)}> <p>add note</p>
    </div>)
}
function Gallery() {
  const [n, setN] = useState(1);
  const [notes, setNotes] = useState( [{noteid:0,text:"example", modified:false}]);
  function AddNotes(text) {
    setNotes(notes => [...notes, {noteid:n, text:text, modified:true}]);
    setN(n => n + 1);
  }
  function noteDelete(note_id) {
    alert(typeof(note_id))
    setNotes(notes.filter(x => x.noteid != note_id));
  }
  function noteChangeStatus(note_id) {
    setNotes(notes.map(x => {
      if (x.noteid == note_id) {
        x.modified = !x.modified;
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
export default function App() {
  return (
    <div>
      <h1> Notes </h1>
      <Gallery />
    </div>
    
  )
}

