import { FC, useState } from "react"
import { Hospital } from "../../../../types/Hospital";
import Select from 'react-select'
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { useFetchTypesHospitals } from "../../../../hooks/useFetchTypesHospitals";
import { useFetchSpecialityHospital } from "../../../../hooks/useFetchSpecialityHospital";
import { SpecialtyHospital } from "../../../../types/SpecialtyHospitals.type";

interface FormCreateHospitalProps {
  setShowList: (setShowList: boolean) => void;
}

export const FormCreateHospital:FC<FormCreateHospitalProps> = ({ setShowList }) => {

  const [stateForm, setStateForm] = useState<Hospital>({
    id: 0,
    name: '',
    address: '',
    telephone: '',
    email: '',
    website: '',
    director: '',
    openingHours: '',
    type: '',
    specialties: [],
    services: [],
  });
  const { typesHospitals } = useFetchTypesHospitals();
  const { specialityHospital } = useFetchSpecialityHospital();
  console.log(specialityHospital);

  const typeHospitalOptions = typesHospitals?.map((type: string) => ({
    value: type,
    label: type,
  }));

  const specialityOptions = specialityHospital?.map((specialty: SpecialtyHospital) => ({
    value: specialty.id,
    label: specialty.name,
  }));

  const serviceOptions = [
    { value: 'Terapia Individual', label: 'Terapia Individual' },
    { value: 'Terapia de Grupo', label: 'Terapia de Grupo' },
    { value: 'Cirugía General', label: 'Cirugía General' },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSpecialitiesChange = (selectedOptions: any) => {
    const values = selectedOptions.map((option: any) => option.value);
    setStateForm((prevState) => ({
      ...prevState,
      specialties: values.map((value: any) => ({
        specialty: { name: value },
      })),
    }));
  };

  const handleServicesChange = (selectedOptions: any) => {
    const values = selectedOptions.map((option: any) => option.value);
    setStateForm((prevState) => ({
      ...prevState,
      services: values.map((value: any) => ({
        service: { name: value },
      })),
    }));
  };

  const handleTypeHospitalChange = (selectedOption: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      type: selectedOption.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stateForm);

    setShowList(true);
    setStateForm({
      id: 0,
      name: '',
      address: '',
      telephone: '',
      email: '',
      website: '',
      director: '',
      openingHours: '',
      type: '',
      specialties: [],
      services: [],
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
          <label htmlFor='typeHospital' className='form-label'>Tipo de Hospital</label>
          <Select
            name='typeHospital'
            options={typeHospitalOptions}
            className='basic-multi-select'
            classNamePrefix='select'
            value={typeHospitalOptions.find(option => option.value === stateForm.type)}
            onChange={handleTypeHospitalChange}
          />
        </div>
          <div className='mb-3'>
            <label htmlFor='specialties' className='form-label'>Especialidades</label>
            <Select
              isMulti
              name='specialties'
              options={specialityOptions}
              className='basic-multi-select'
              classNamePrefix='select'
              value={specialityOptions.filter((option) =>
                stateForm.specialties.map((s) => s.specialty.name).includes(option.value)
              )}
              onChange={handleSpecialitiesChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='services' className='form-label'>Servicios</label>
            <Select
              isMulti
              name='services'
              options={serviceOptions}
              className='basic-multi-select'
              classNamePrefix='select'
              value={serviceOptions.filter((option) =>
                stateForm.services.map((s) => s.service.name).includes(option.value)
              )}
              onChange={handleServicesChange}
            />
          </div>
          <button type='submit' className={`btn btn-primary ${styles.customPurple}`}>
            Guardar Hospital
          </button>
        </form>
    </div>
  </div>
  )
}
