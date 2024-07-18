import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import '../../assets/style/personalDiary/contentNonte.css';

export const ContentNotes: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  }

  const loadEditor = () => {
    setEditorLoaded(true);
  }

  return (
    <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 containerMainPersonalDiary__Notes-contentNote">
      {editorLoaded ? (
        <Editor
          apiKey="m0qegqqbmn8ufsv56zb9td6uc2fkp1wlvs7r51ew8nfqzy4p"
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue="<p>Este es tu lugar seguro. Escribe todo lo que necesites.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      ) : (
        <button onClick={loadEditor}>Load Editor</button>
      )}
      <button onClick={log}>Log editor content</button>
    </div>
  );
}
