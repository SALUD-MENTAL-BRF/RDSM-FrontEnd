import React, { useState } from 'react';
import'../../../../assets/style/activities/SocialHabilitySetting.css';

export const SocialHabilitySetting = () => {
    const [selectState, setSelectState] = useState({
        age: "",
        genre: "",
        complexity: "",
        personality: ""
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
                <select onChange={handleSelect} value={selectState.age} className="form-select w-25 mt-1 text-center select-settingSocialHability" name="age" id="age">
                    <option value="">Selecciona una edad...</option>
                    {
                        ages.map((age) => (
                            <option key={age} value={age}>{age}</option>
                        ))
                    }
                </select>
                <label htmlFor="genre">Género</label>
                <select onChange={handleSelect} value={selectState.age} className="form-select w-25 text-center select-settingSocialHability" name="genre" id="genre">
                <option value="">Selecciona un género...</option>
                    <option value="Masculino">
                        Masculino
                    </option>
                    <option value="Femenino">
                        Femenino
                    </option>
                </select>
                <label htmlFor="complexity">Complejidad</label>
                <select onChange={handleSelect} value={selectState.complexity} name="complexity" className="form-select w-25 text-center select-settingSocialHability" id="complexity">
                <option value="">Selecciona la complejidad...</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                </select>
                <label htmlFor="personality">Personalidad</label>
                <select onChange={handleSelect} value={selectState.personality} name="personality" className='form-select w-25 text-center select-settingSocialHability' id="">
                    <option value="">Selecciona una personalidad...</option>
                    <option value="Introvertido">Introvertido</option>
                    <option value="Extrovertido">Extrovertido</option>
                </select>
            </div>
            <button className="btn btn-primary mt-4">Guardar</button>
            <section className='ms-5'>
                <h4 className='text-start mt-5 title-settingSocialHability'>Descripción:</h4>
                <p className='text-start ms-5 text-settingSocialHability'>Estas configuraciones afectaran la respuesta que le dara la Inteligencia Artificial al paciente, por lo tanto,
                    asegurece de ajustarlo según el paciente lo necesite.
                </p>
            </section>
        </div>
    );
};