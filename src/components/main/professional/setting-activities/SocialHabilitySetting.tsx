import React, { useEffect, useState } from 'react';
import'../../../../assets/style/activities/SocialHabilitySetting.css';

export const SocialHabilitySetting = () => {
    const [selectState, setSelectState] = useState({
        age: "",
        genre: "",
        Complejidad: ""
    });
    const [ages, _setAges] = useState<Array<number>>(Array.from({ length: 80 }, (_, i) => i + 1));

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        setSelectState(prevstate => ({...prevstate, [name]: value}));
        console.log(selectState);
        
    };

    return (
        <div className="text-center">
            <div className="row d-flex justify-content-center">
                <label className='text-center' htmlFor="age">Edad</label>
                <select onChange={handleSelect} className="form-select w-25 mt-1 text-center select-settingSocialHability" name="age" id="age">
                    <option value="">Selecciona una edad...</option>
                    {
                        ages.map((age) => (
                            <option key={age} value={age}>{age}</option>
                        ))
                    }
                </select>
                <label htmlFor="genre">Género</label>
                <select onChange={handleSelect} className="form-select w-25 text-center" name="genre" id="genre">
                    <option value="Masculino">
                        Masculino
                    </option>
                    <option value="Femenino">
                        Femenino
                    </option>
                </select>
                <label htmlFor="complexity">Complejidad</label>
                <select name="complexity" className="form-select w-25 text-center" id="complexity">
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                </select>
            </div>
            <button className="btn btn-primary">Guardar</button>
        </div>
    );
};