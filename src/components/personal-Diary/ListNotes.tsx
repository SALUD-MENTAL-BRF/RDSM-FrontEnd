import React, { useEffect, useState } from 'react';
import '../../assets/style/personalDiary/listNotes.css';
import useAuth from "../../hooks/useAuth";
import { CustomFetch } from "../../api/CustomFetch";
import Swal from "sweetalert2";
import { Note } from './interface/Notes';

interface ListNotesProps {
  onEditNote: (note: Note) => void;
}

export const ListNotes: React.FC<ListNotesProps> = ({ onEditNote }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState.token) {
      CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
        .then((response) => {
          setUser(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [authState.token]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        if (user?.id) {
          const fetchedNotes = await CustomFetch(`${import.meta.env.VITE_API_URL}note?userId=${user.id}`, "GET");
          setNotes(fetchedNotes);
        }
      } catch (error) {
        console.error(`Fetch error: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [user?.id]);

  if (loading) {
    return <p>Cargando notas...</p>;
  }

  const handleDeleteNote = async (noteId: number) => {
    try {
      await CustomFetch(`${import.meta.env.VITE_API_URL}note?noteId=${noteId}`, "DELETE");
      setNotes(notes.filter(n => n.id!== noteId));
      Swal.fire({
        title: "Éxito",
        text: "Nota eliminada correctamente",
        icon: "success",
        width: "50%",
      });
    }
    catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  };

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className='col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 p-0 lista-de-notas'>
      <h5>Tus notas</h5>
      <ul className='list-group'>
        {notes.map((note) => (
          <li key={note.id} className='list-group-item'>
            <h6>{note.title}</h6>
            <p>{stripHtmlTags(note.content.substring(0, 40))}...</p>
            <div className="containerMainPersonalDiary__List-notes">
              <button
                className='btn btn-sm btn-warning mx-1'
                onClick={() => onEditNote(note)} // Llama a la función de edición
              >
                Editar
              </button>
              <button
                className='btn btn-sm btn-danger mx-1'
                onClick={() => handleDeleteNote(note.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
