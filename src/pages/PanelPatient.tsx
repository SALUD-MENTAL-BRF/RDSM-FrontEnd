import React from "react";
import { Options } from "../components/mains/patient/OptionsPatient";
import { Header } from "../components/headers/Header";
export const PanelPatient : React.FC = () => {
    return(
        <>  
            <Header/>
            <Options/>
        </>
    );
};