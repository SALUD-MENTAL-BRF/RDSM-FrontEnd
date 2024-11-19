import React, { useEffect, useState } from 'react';
import'../../../../assets/style/activities/SocialHabilitySetting.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logicalProblemSettingDto } from '../../../../types/activity/logicalProblem.dto';

export const LogicalProblemSetting = () => {
    const [selectState, setSelectState] = useState<logicalProblemSettingDto>({
        complexity:"",
        problem_type: "",
        theme: "",
    });
    const {professionalId, patientId} = useParams()
    const [settingId, setSettingId] = useState<number>()

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        setSelectState(prevstate => ({...prevstate, [name]: value})); 
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     let url:string;
    //     let method: string;

    //     if(settingId){
    //         url=`${import.meta.env.VITE_API_URL}social-hability/setting/${settingId}`;
    //         method='PUT';
    //     } else {
    //         url=`${import.meta.env.VITE_API_URL}social-hability/setting/${professionalId}/${patientId}`;
    //         method='POST';
    //     };

    //     const response = await fetch(url,{
    //         method: method,
    //         body: JSON.stringify(selectState),
    //         headers: {
    //             'content-type':'application/json'
    //         }
    //     });

    //     const data = await response.json();

    //     if(data.statusCode == 400){
    //         return Swal.fire({
    //             title: "Error",
    //             text: data.message[0],
    //             icon: "error",
    //             confirmButtonColor: "#3085d6",
    //             confirmButtonText: "ok",
    //           })
    //     };

    //     return Swal.fire({
    //           title: "Guardado",
    //           text: "Configuración guardada.",
    //           icon: "success",
    //           confirmButtonColor: "#3085d6",
    //           confirmButtonText: "ok",
    //     })
        
    // };

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}logical-problem/setting/${professionalId}/${patientId}`);
                const setting: logicalProblemSettingDto = await response.json();
                if(setting){
                    setSettingId(setting.id)
                    setSelectState({
                        complexity: setting.complexity,
                        problem_type: setting.problem_type,
                        theme: setting.theme,
                    })
                };
            }
        )();
    },[]);

    return (
        <form  className="text-center">
            <div className="row d-flex justify-content-center">
                <label className='text-center' htmlFor="complexity">Edad</label>
                <label htmlFor="complexity">Complejidad</label>
                <select onChange={handleSelect} value={selectState.complexity} className="form-select w-25 text-center select-settingSocialHability" name="complexity" id="complexity">
                <option value="">Selecciona una complejidad...</option>
                    <option value="Masculino">
                        Masculino
                    </option>
                    <option value="Femenino">
                        Femenino
                    </option>
                </select>
                <label htmlFor="theme">Tema</label>
                <select onChange={handleSelect} value={selectState.theme} name="theme" className="form-select w-25 text-center select-settingSocialHability" id="theme">
                <option value="">Selecciona un tema...</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                </select>
                <label htmlFor="problem_type">Tipo de problema</label>
                <select onChange={handleSelect} value={selectState.problem_type} name="problem_type" className='form-select w-25 text-center select-settingSocialHability' id="problem_type">
                    <option value="">Selecciona una personalidad...</option>
                    <option value="Introvertido">Introvertido</option>
                    <option value="Extrovertido">Extrovertido</option>
                </select>
            </div>
            <button type='submit' className="btn btn-primary mt-4">Guardar</button>
            <section className='ms-5'>
                <h4 className='text-start mt-5 title-settingSocialHability'>Descripción:</h4>
                <p className='text-start ms-5 text-settingSocialHability'>Estas configuraciones afectaran la respuesta que le dara la Inteligencia Artificial al paciente, por lo tanto,
                    asegurece de ajustarlo según el paciente lo necesite.
                </p>
            </section>
        </form>
    );
};