import React /*, { useEffect, useState }*/ from 'react';
import '../../assets/style/personalDiary/listNotes.css';
// import useAuth from "../../hooks/useAuth";
// import { CustomFetch } from "../../api/CustomFetch";
// import Swal from "sweetalert2";

// interface Note {
//   id: number;
//   title: string;
//   content: string;
// }

export const ListNotes: React.FC = () => {
  // const { authState } = useAuth();
  // const [user, setUser] = useState<any>(null);
  // const [notes, setNotes] = useState<Note[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (authState.token) {
  //     CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
  //       .then((response) => {
  //         setUser(response);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   }
  // }, [authState.token]);

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       if (user?.id) {
  //         const fetchedNotes = await CustomFetch(`${import.meta.env.VITE_API_URL}note?userId=${user.id}`, "GET");
  //         setNotes(fetchedNotes);
  //       }
  //     } catch (error) {
  //       console.error(`Fetch error: ${error}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotes();
  // }, [user?.id]);

  // if (loading) {
  //   return <p>Cargando notas...</p>;
  // }

  // const handleDeleteNote = async (noteId: number) => {
  //   try {
  //     await CustomFetch(`${import.meta.env.VITE_API_URL}note?noteId=${noteId}`, "DELETE");
  //     setNotes(notes.filter(n => n.id!== noteId));
  //     Swal.fire({
  //       title: "Éxito",
  //       text: "Nota eliminada correctamente",
  //       icon: "success",
  //       width: "50%",
  //     });
  //   }
  //   catch (error) {
  //     console.error(`Fetch error: ${error}`);
  //   }
  // };

  return (
    <>
      <div className='col-md-4'>
        <div className='card' style={{ height: '100%' }}>
          <div className='card-header'>
            <h3 className='card-title'>Entradas recientes</h3>
          </div>
          <div className='card-body overflow-auto'>
            <ul className='list-unstyled'>
              <li className='mb-3 pb-3 border-bottom'>
                <h4 className='h6 text-success'>sdfa</h4>
                <p className='small text-muted mb-0'>asdfas...</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
