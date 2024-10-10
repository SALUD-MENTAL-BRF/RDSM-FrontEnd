import Select from 'react-select';
import styles from '../../../../assets/style/admin/Content/Hospitals.module.css';
import { FC, useState } from "react";
import { Hospital } from "../../../../types/Hospital";
import { useFetchTypesHospitals } from "../../../../hooks/useFetchTypesHospitals";
import { useFetchSpecialityHospital } from "../../../../hooks/useFetchSpecialityHospital";
import { useFetchServiceHospital } from "../../../../hooks/useFetchServiceHospital";
import { specialityHospitalOptions } from "../../../../types/SpecialtyHospitals.type";
import { serviceHospitalOptions } from "../../../../types/ServiceHospital.type";
import { SubmitCreateHospital } from "./SubmitCreateHospital";
import { FormCreateSpecialtyHospital } from './FormCreateSpecialtyHospital';
import { FormCreateServiceHospital } from './FormCreateServiceHospital';
import { useFetchUserHospitals } from '../../../../hooks/useFetchUserHospitals';

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
    userId: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // type Hospitals -------------------------------
  const { typesHospitals } = useFetchTypesHospitals();
  const typeHospitalOptions = typesHospitals?.map((type: string) => ({
    value: type,
    label: type,
  }));
  const handleTypeHospitalChange = (selectedOption: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      type: selectedOption.value,
    }));
  };
  // ---------------------------------------------

  // specialties Hospitals -----------------------
  const { specialityHospital } = useFetchSpecialityHospital();
  const specialityHospitalOptions = specialityHospital?.map((specialty: specialityHospitalOptions) => ({
    value: specialty.id,
    label: specialty.name,
  }));
  const handleSpecialityHospitalChange = (selectedOptions: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      specialties: selectedOptions.map((option: any) => option.value),
    }));
  };
  // ---------------------------------------------

  // services Hospitals --------------------------
  const { serviceHospital } = useFetchServiceHospital();
  const serviceHospitalOptions = serviceHospital?.map((service: serviceHospitalOptions) => ({
    value: service.id,
    label: service.name,
  }));
  const handleServiceHospitalChange = (selectedOptions: any) => {
    setStateForm((prevState) => ({
      ...prevState,
      services: selectedOptions.map((option: any) => option.value),
    }));
  };

  const [showSpecialtyModal, setShowSpecialtyModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  // -----------------------------------------------

  // users hospitals -------------------------------

  const { usersHospitals } = useFetchUserHospitals();

  const userHospitalOptions = usersHospitals?.map((user: any) => ({
    value: user.id,
    label: user.username,
  }));
  const handleUserHospitalChange = (selectedOption: any) => {
    setStateForm((prevState) => ({
    ...prevState,
      userId: selectedOption.value,
    }));
  };


  const openServiceModal = () => {
    setShowServiceModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
  };
  // ---------------------------------------------

  const openSpecialtyModal = () => {
    setShowSpecialtyModal(true);
  };

  const closeSpecialtyModal = () => {
    setShowSpecialtyModal(false);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Crear Nuevo Hospital</h5>
      </div>
      <div className='card-body'>
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
            className={`form-control ${styles.formEmail}`}
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
          <div className={styles.containerSelect}>
            <Select
              className={styles.select}
              isMulti
              options={specialityHospitalOptions}
              onChange={handleSpecialityHospitalChange}
            />
            <button className={`btn btn-success ${styles.button}`} onClick={openSpecialtyModal}>Crear</button>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='services' className='form-label'>Servicios</label>
          <div className={styles.containerSelect}>
            <Select
              className={styles.select}
              isMulti
              options={serviceHospitalOptions}
              onChange={handleServiceHospitalChange}
            />
            <button className={`btn btn-success ${styles.button}`} onClick={openServiceModal}>Crear</button>
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor="user" className='form-label'>Usuario Asignado <small>(se debe crear un usuario con rol hospital antes de asignar)</small></label>
          <Select
            options={userHospitalOptions}
            onChange={handleUserHospitalChange}
          />
        </div>
        <SubmitCreateHospital stateForm={stateForm} setStateForm={setStateForm} setShowList={setShowList}/>
      </div>
      <FormCreateSpecialtyHospital showSpecialtyModal={showSpecialtyModal} closeSpecialtyModal={closeSpecialtyModal} setShowSpecialtyModal={setShowSpecialtyModal} specialityHospital={specialityHospital}/>
      <FormCreateServiceHospital showServiceModal={showServiceModal} closeServiceModal={closeServiceModal} setShowServiceModal={setShowServiceModal} serviceHospital={serviceHospital}/>
    </div>
  );
}
