'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {deleteNote, getNotesList, saveNotes, updateNote} from "../app/actions"
import Note from "./Note"
export default function AddNoteNote({stateChanger}:any) {
  let text = "new note";
  return (<Button variant="outline"
    onClick={() => stateChanger(text)}> <p>add note</p>
    </Button>)
}