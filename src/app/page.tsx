
'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {deleteNote, getNotesList, saveNotes, updateNote} from "./actions"
import Gallery from "../components/Gallery"
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      
      <Link href="/about"> <h1> Notes </h1> </Link>
      <Gallery />
    </main>
  );
}
