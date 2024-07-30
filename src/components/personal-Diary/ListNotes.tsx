import React from "react";
import "../../assets/style/personalDiary/listNotes.css";

interface ListNotesProps {
  onAddNote: () => void;
}

export const ListNotes: React.FC<ListNotesProps> = ({ onAddNote }) => {
  return (
    <>
      <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 p-0 containerMainPersonalDiary__Notes-listNotes">
        <h3>Notas</h3>

        <div className="containerMainPersonalDiary__Notes-listNotes-options">
          <div className="containerMainPersonalDiary__Notes-listNotes-options-left">
            <p>3 notas</p>
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

        {/* lista de notas */}
        <div className="containerMainPersonalDiary__Notes-listNotes-notes">
          <div className="containerMainPersonalDiary__Notes-listNotes-notes-item">
            <h4>Título de la nota 1</h4>
            <p>Contenido de la primera nota.</p>
            <span className="material-symbols-outlined">edit</span>
            <span className="material-symbols-outlined" role="button">
              delete
            </span>
          </div>

          <div className="containerMainPersonalDiary__Notes-listNotes-notes-item">
            <h4>Título de la nota 2</h4>
            <p>Contenido de la segunda nota.</p>
            <span className="material-symbols-outlined">edit</span>
            <span className="material-symbols-outlined" role="button">
              delete
            </span>
          </div>

          <div className="containerMainPersonalDiary__Notes-listNotes-notes-item">
            <h4>Título de la nota 3</h4>
            <p>Contenido de la tercera nota.</p>
            <span className="material-symbols-outlined">edit</span>
            <span className="material-symbols-outlined" role="button">
              delete
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
