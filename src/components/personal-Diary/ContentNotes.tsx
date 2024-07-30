import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../../assets/style/personalDiary/contentNonte.css';

export const ContentNotes: React.FC = () => {
  const editorRef = useRef<any>(null);

  const [note, setNote] = useState('');
  const [title, setTitle] = useState('Titulo de la Nota 1');
  const [noteCount, setNoteCount] = useState(1);

  const log = () => {
    if (editorRef.current) {
      setNote(editorRef.current.getContent());
    }
    console.log("Título de la nota:", title);
    console.log("Contenido de la nota:", note);

    // Incrementa el número de la nota para el próximo título
    const nextNoteCount = noteCount + 1;
    setNoteCount(nextNoteCount);
    setTitle(`Titulo de la Nota ${nextNoteCount}`);
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
      <button className='mt-4' onClick={log}>Completar</button>
    </div>
  );
}
