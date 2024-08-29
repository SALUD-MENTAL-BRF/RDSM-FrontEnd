import React, { useState } from 'react';
import '../../assets/style/personalDiary/personalDiary.css';
import { ContentNotes } from './ContentNotes';
import { ListNotes } from './ListNotes';
import { useNavigate } from 'react-router-dom';
import { Note } from './interface/Notes';

export const PersonalDiary: React.FC = () => {
  const navigate = useNavigate();

  const [ selectedNote, setSelectedNotes ] = useState<Note | null>(null)

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNotes(note);
  }

  return (
    <>
      <main className='container py-5'>
        <button onClick={handleBackClick} className='btn btn-secondary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M19 12H5M12 19l-7-7 7-7' />
          </svg>
          Atrás
        </button>
        <h2 className='display-4 mb-4'>Bienvenido a tu espacio personal</h2>
        <p className='lead mb-5'>
          Aquí puedes escribir tus pensamientos, emociones y experiencias
          diarias.
        </p>

        <div className='row g-4'>
          <ContentNotes selectedNote={selectedNote}/>

          <ListNotes onEditNote={handleEditNote}/>
        </div>
      </main>
    </>
  );
};
