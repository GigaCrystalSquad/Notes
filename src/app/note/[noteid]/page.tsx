
'use client'
import React, { useEffect } from 'react';

export default function One_note({params,}:
  {params: {noteid:number}}
) {
  return (
    <main>
      <h1> Заметочка {params.noteid}, ничего необычного </h1>
    </main>
  );
}
