import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { activityXPatientDto } from "../../../../types/activity.dto";
import { unlinkActivityWithPatient, findActivitiesLinked } from "./Request/fetchActivity";
import Swal from "sweetalert2";
import { CardActivity } from "../../activities/CardActivity";

export const AssignActivity: React.FC<{professionalId: number}> = ({professionalId}) => {
    const navigate = useNavigate();
    const {patientId} = useParams();
    const [activitiesLinkedState, setActivitiesLinkedState] = useState<Array<activityXPatientDto>>([]);
    const [reloadPage, setReloadPage] = useState<boolean>(false)

    useEffect(() => {
        (
            async () => {
                if(professionalId){
                    setActivitiesLinkedState((await findActivitiesLinked(patientId!, professionalId)))
                }
            }
        )();
    },[reloadPage, professionalId]);

    const unlinkActivity = async (patientXactivityId: number) => {
        Swal.fire({
            text: "¿Seguro que quiere eliminar esta actividad?",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonColor: "#d33"
          }).then(async (result) => {
            if (result.isConfirmed) {
                await unlinkActivityWithPatient(patientXactivityId)
                return Swal.fire({
                    title: "Se elimino la actividad.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "ok",
                }).then(() => {
                    return setReloadPage(!reloadPage)
                })
            }
          });
    }

    return(
        <div className="activitiesAssign-container mt-5 rounded-5">
            <h3 className="text-center">Actividades</h3>
            <CardActivity patientId={patientId!} professionalId={professionalId.toString()} professional={true} activitieState={activitiesLinkedState} unlinkActivity={unlinkActivity}/>
        </div>
    );
};