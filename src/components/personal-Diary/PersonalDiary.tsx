import React from "react";
import { Aside } from "../aside/Aside";
import "../../assets/style/personalDiary/personalDiary.css";

export const PersonalDiary: React.FC = () => {
  return (
    <>
      <main className="container-fluid p-0">
        <div className="row w-100 containerMainPersonalDiary">
          {/* aside */}
          <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 p-0 d-flex flex-column justify-content-start align-items-center text-center containerMainPersonalDiary__Aside">
            <Aside />
          </section>
          {/*  */}

          {/* section notes */}
          <section className="container col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 p-0 containerMainPersonalDiary__Notes">
            <div className="row w-100 m-0">
              {/* list of notes */}
              <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4 p-0 containerMainPersonalDiary__Notes-listNotes">
                <h1>lista de notas</h1>
              </div>
              {/* contenido de nota */}
              <div className="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8 p-0 containerMainPersonalDiary__Notes-contentNote">
                <h1>contenido de notas</h1>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
