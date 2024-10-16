import { CustomFetch } from "../../../api/CustomFetch";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";


export const AssignedProfessionals = () => {
    const {authState} = useAuth();

    useEffect(() => {
        (
            async () => {
                const user = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET');
        
            }
        )();
    },[]);
    return (
        <>
        
        </>
    )
}