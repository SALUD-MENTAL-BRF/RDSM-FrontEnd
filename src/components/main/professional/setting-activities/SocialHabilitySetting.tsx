import React, { useEffect, useState } from 'react';
import'../../../../assets/style/activities/SettingActivities.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { socialHabilitySettingDto } from '../../../../types/activity/socialHability.dto';

export const SocialHabilitySetting = () => {
    const [selectState, setSelectState] = useState<socialHabilitySettingDto>({
        age: "",
        genre: "",
        complexity: "",
        personality: ""
    });
    const [ages, _setAges] = useState<Array<number>>(Array.from({ length: 80 }, (_, i) => i + 1));
    const {professionalId, patientId} = useParams()
    const [settingId, setSettingId] = useState<number>()

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        setSelectState(prevstate => ({...prevstate, [name]: value})); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let url:string;
        let method: string;

        if(settingId){
            url=`${import.meta.env.VITE_API_URL}social-hability/setting/${settingId}`;
            method='PUT';
        } else {
            url=`${import.meta.env.VITE_API_URL}social-hability/setting/${professionalId}/${patientId}`;
            method='POST';
        };

        const response = await fetch(url,{
            method: method,
            body: JSON.stringify(selectState),
            headers: {
                'content-type':'application/json'
            }
        });

        const data = await response.json();

        if(data.statusCode == 400){
            return Swal.fire({
                title: "Error",
                text: data.message[0],
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "ok",
              })
        };

        return Swal.fire({
              title: "Guardado",
              text: "Configuración guardada.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "ok",
        })
        
    };

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${import.meta.env.VITE_API_URL}social-hability/setting/${professionalId}/${patientId}`);
                const setting: socialHabilitySettingDto = await response.json();
                if(setting){
                    setSettingId(setting.id)
                    setSelectState({
                        age: setting.age,
                        complexity: setting.complexity,
                        genre: setting.genre,
                        personality: setting.personality
                    })
                };
            }
        )();
    },[]);

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <div className="row d-flex justify-content-center">
                <label className='text-center' htmlFor="age">Edad</label>
                <select onChange={handleSelect} value={selectState.age} className="form-select w-25 mt-1 text-center select-setting" name="age" id="age">
                    <option value="">Selecciona una edad...</option>
                    {
                        ages.filter(age => age > 4).map((age) => (
                            <option key={age} value={age}>{age}</option>
                        ))
                    }
                </select>
                <label htmlFor="genre">Género</label>
                <select onChange={handleSelect} value={selectState.genre} className="form-select w-25 text-center select-setting" name="genre" id="genre">
                <option value="">Selecciona un género...</option>
                    <option value="Masculino">
                        Masculino
                    </option>
                    <option value="Femenino">
                        Femenino
                    </option>
                </select>
                <label htmlFor="complexity">Complejidad</label>
                <select onChange={handleSelect} value={selectState.complexity} name="complexity" className="form-select w-25 text-center select-setting" id="complexity">
                <option value="">Selecciona la complejidad...</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                </select>
                <label htmlFor="personality">Personalidad</label>
                <select onChange={handleSelect} value={selectState.personality} name="personality" className='form-select w-25 text-center select-setting' id="">
                    <option value="">Selecciona una personalidad...</option>
                    <option value="Introvertido">Introvertido</option>
                    <option value="Extrovertido">Extrovertido</option>
                </select>
            </div>
            <button type='submit' className="btn btn-primary mt-4">Guardar</button>
            <section className='ms-5'>
                <h4 className='text-start mt-5 title-setting'>Descripción:</h4>
                <p className='text-start ms-5 text-setting'>Estas configuraciones afectaran la respuesta que le dara la Inteligencia Artificial al paciente, por lo tanto,
                    asegurece de ajustarlo según el paciente lo necesite.
                </p>
            </section>
        </form>
    );
};