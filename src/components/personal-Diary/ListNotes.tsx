import React, { useEffect, useState } from "react";
import "../../assets/style/personalDiary/listNotes.css";
import useAuth from "../../hooks/useAuth";
import { CustomFetch } from "../../api/CustomFetch";
import Swal from "sweetalert2";

interface Note {
  id: number;
  title: string;
  content: string;
}

interface ListNotesProps {
  onAddNote: () => void;
}

export const ListNotes: React.FC<ListNotesProps> = ({ onAddNote }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (authState.token) {
      CustomFetch(`http://localhost:3000/users/token/${authState.token}`, 'GET')
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
          const fetchedNotes = await CustomFetch(`http://localhost:3000/note?userId=${user.id}`, "GET");
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

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await CustomFetch(`http://localhost:3000/note?noteId=${noteId}`, "DELETE");
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

  return (
    <>
      <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 p-0 containerMainPersonalDiary__Notes-listNotes">
        <h3>Notas</h3>

        <div className="containerMainPersonalDiary__Notes-listNotes-options">
          <div className="containerMainPersonalDiary__Notes-listNotes-options-left">
            <p>{notes.length} {notes.length === 1 ? 'nota' : 'notas'}</p>
          </div>
          <div className="containerMainPersonalDiary__Notes-listNotes-options-right">
            <span className="material-symbols-outlined m-1" role="button">
              unfold_less_double
            </span>
            <span className="material-symbols-outlined" role="button" onClick={onAddNote}>
              add
            </span>
          </div>
        </div>

        <div className="containerMainPersonalDiary__Notes-listNotes-notes">
          {notes.map(note => (
            <div key={note.id} className="containerMainPersonalDiary__Notes-listNotes-notes-item">
              <h4>{note.title}</h4>
              <p>{stripHtmlTags(note.content)}</p>
              <span className="material-symbols-outlined">edit</span>
              <span className="material-symbols-outlined" role="button" onClick={()=> {
                handleDeleteNote(note.id);
              }}>
                delete
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
