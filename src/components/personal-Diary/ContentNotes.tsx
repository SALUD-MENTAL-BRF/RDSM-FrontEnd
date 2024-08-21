import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../../assets/style/personalDiary/contentNonte.css';
import useAuth from '../../hooks/useAuth';
import { CustomFetch } from '../../api/CustomFetch';
import Swal from 'sweetalert2';

interface ContentNotesProps {
  onCompleteNote: () => void;
}

export const ContentNotes: React.FC<ContentNotesProps> = ({ onCompleteNote }) => {
  const editorRef = useRef<any>(null);
  
  const { authState } = useAuth();
  const [user, setUser] = useState<any>(null)

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

  const [title, setTitle] = useState('');

  const handleCompleteNote = async () => {

    const newContent = editorRef.current.getContent(); // Obtener el contenido directamente

    if (!newContent || !title) {
      Swal.fire({
        title: "Error",
        text: "Por favor, complete todos los campos",
        icon: "error",
        width: "50%",
        timer: 1500
      });
      return;
    }

    const payload = {
      title,
      content: newContent, // Usar el nuevo contenido
      userId: user?.id
    };

    CustomFetch(`${import.meta.env.VITE_API_URL}note`, 'POST', payload)
      .then(() => {
        Swal.fire({
          title: "Éxito",
          text: "Nota guardada correctamente",
          icon: "success",
          width: "50%",
          timer: 1500
        });
        onCompleteNote();
        setTimeout(() => {
          window.location.reload();
        },1000)
      });
  };

  return (
    <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 containerMainPersonalDiary__Notes-contentNote">
      <input
        type="text"
        placeholder="Título de la nota"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control containerMainPersonalDiary__Notes-contentNote-inputTitle"
      />
      <Editor
        apiKey="m0qegqqbmn8ufsv56zb9td6uc2fkp1wlvs7r51ew8nfqzy4p"
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue=""
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          resize: false
        }}
      />
      <button className='mt-2 btn btn-success' onClick={handleCompleteNote}>Completar</button>
    </div>
  );
}
