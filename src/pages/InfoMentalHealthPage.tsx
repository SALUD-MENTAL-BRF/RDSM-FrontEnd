import React from "react";
import { TypesDisorders } from "../components/main/DocsMentalHealth/TypesDisorders";
import { Header } from "../components/headers/Header";

export const InfoMentalHealthPage: React.FC = () => {


    return(
        <>  
            <Header/>
            <TypesDisorders/>
        </>
    );
};
