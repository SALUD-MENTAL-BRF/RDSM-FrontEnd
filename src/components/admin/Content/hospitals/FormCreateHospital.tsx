import { FC, useState } from "react"
import { Hospital } from "../../../../types/Hospital";
import Select from 'react-select'
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';

interface FormCreateHospitalProps {
  setShowList: (setShowList: boolean) => void;
}

export const FormCreateHospital:FC<FormCreateHospitalProps> = ({ setShowList }) => {

  const [stateForm, setStateForm] = useState<Hospital>({
    name: '',
    address: '',
    telephone: '',
    email: '',
    website: '',
    director: '',
    openingHours: '',
    typeHospital: '',
    specialities: [],
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setStateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const specialityOptions = [
    { value: 'Cardiología', label: 'Cardiología' },
    { value: 'Neurología', label: 'Neurología' },
    { value: 'Pediatría', label: 'Pediatría' },
    { value: 'Psiquiatría', label: 'Psiquiatría' },
    { value: 'Traumatología', label: 'Traumatología' },
  ];

  const typeHospitalOptions = [
    { value: 'Publico', label: 'Publico' },
    { value: 'Privado', label: 'Privado' },
  ]

  const handleSpecialitiesChange = (selectedOptions: any) => {
    const values = selectedOptions.map((option: any) => option.value);
    setStateForm((prevState) => ({
      ...prevState,
      specialities: values,
    }));
  };

  const handleTypeHospitalChange = (selectedOption: any) => {
    setStateForm((prevState) => ({
    ...prevState,
      typeHospital: selectedOption.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stateForm);

    setShowList(true);
    setStateForm({
      name: '',
      address: '',
      telephone: '',
      email: '',
      website: '',
      director: '',
      openingHours: '',
      typeHospital: '',
      specialities: [],
    });
  };


  return (
    <div className='card'>
    <div className='card-header'>
      <h5 className='card-title mb-0'>Crear Nuevo Hospital</h5>
    </div>
    <div className='card-body'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='hospitalName' className='form-label'>
            Nombre del Hospital
          </label>
          <input
            type='text'
            className='form-control'
            id='hospitalName'
            name='name'
            placeholder='Ingrese el nombre del hospital'
            value={stateForm.name}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalAddress' className='form-label'>
            Dirección
          </label>
          <input
            type='text'
            className='form-control'
            id='hospitalAddress'
            name='address'
            placeholder='Ingrese la dirección del hospital'
            value={stateForm.address}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalPhone' className='form-label'>
            Teléfono
          </label>
          <input
            type='tel'
            className='form-control'
            id='hospitalPhone'
            name='telephone'
            placeholder='Ingrese el teléfono del hospital'
            value={stateForm.telephone}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalEmail' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='hospitalEmail'
            name='email'
            placeholder='Ingrese el email del hospital'
            value={stateForm.email}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalWebsite' className='form-label'>
            Sitio Web
          </label>
          <input
            type='url'
            className='form-control'
            id='hospitalWebsite'
            name='website'
            placeholder='Ingrese el sitio web del hospital'
            value={stateForm.website}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalDirector' className='form-label'>
            Director
          </label>
          <input
            type='text'
            className='form-control'
            id='hospitalDirector'
            name='director'
            placeholder='Ingrese el director del hospital'
            value={stateForm.director}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='hospitalOpeningHours' className='form-label'>
            Horario de Atención
          </label>
          <input
            type='text'
            className='form-control'
            id='hospitalOpeningHours'
            name='openingHours'
            placeholder='Ingrese las horas en las que el hospital se encuentra abierto'
            value={stateForm.openingHours}
            onChange={onChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='typeHospital' className='form-label'>
            Tipo de Hospital
          </label>
          <Select
            name='typeHospital'
            options={typeHospitalOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            value={typeHospitalOptions.filter((option) => 
              stateForm.typeHospital.includes(option.value)
            )}
            onChange={handleTypeHospitalChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='specialities' className='form-label'>
            Especialidades
          </label>
          <Select
            isMulti
            name='specialities'
            options={specialityOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            value={specialityOptions.filter((option) =>
              stateForm.specialities.includes(option.value),
            )}
            onChange={handleSpecialitiesChange}
          />
        </div>
        <button
          type='submit'
          className={`btn btn-primary ${styles.customPurple}`}
        >
          Guardar Hospital
        </button>
      </form>
    </div>
  </div>
  )
}
