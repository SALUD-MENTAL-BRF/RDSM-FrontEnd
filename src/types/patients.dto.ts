import { User } from "./user.dto";


export interface patient {
    id: number;
    fullname: string;
    user: User;
}

export interface FormPatient {
    nombreCompleto: string;
    edad: string;
    genero: string;
    estadoCivil: string;
    direccion: string;
    telefono: string;
    email: string;
    contactoEmergenciaNombre: string;
    contactoEmergenciaRelacion: string;
    contactoEmergenciaTelefono: string;
    motivoConsulta: string;
    descripcionProblema: string;
    duracionProblema: string;
    factoresDesencadenantes: string;
    diagnosticosPrevios: string;
    tratamientosAnteriores: string;
    hospitalizacionesPrevias: string;
    medicacionActual: string;
    historialConsumo: string;
    historialEnfermedades: string;
    historiaFamiliar: string;
  }
  