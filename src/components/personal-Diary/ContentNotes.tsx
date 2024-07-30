import React, { useRef, useState } from 'react';
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

  const { user } = useAuth()

  const [note, setNote] = useState('');
  const [title, setTitle] = useState('Titulo de la Nota');

  const handleCompleteNote = async() => {
    if (editorRef.current) {
      setNote(editorRef.current.getContent());
    }

    const payload = {
      title,
      content: note,
      userId: user?.id
    }

    CustomFetch('http://localhost:3000/note', 'POST', payload)
    .then(() => {
      Swal.fire({
        title: "Éxito",
        text: "Nota guardada correctamente",
        icon: "success",
        width: "50%",
        timer: 1500
      });
      onCompleteNote();
    })

    // Llamar a la función onCompleteNote para ocultar el cuadro de notas
    // onCompleteNote();
  }

  return (
    <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 containerMainPersonalDiary__Notes-contentNote">
      <input
        type="text"
        placeholder="Título de la nota"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-control mb-3"
      />
      <Editor
        apiKey="m0qegqqbmn8ufsv56zb9td6uc2fkp1wlvs7r51ew8nfqzy4p"
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue="Este es tu lugar seguro. Escribe todo lo que necesites."
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button className='mt-4' onClick={handleCompleteNote}>Completar</button>
    </div>
  );
}
