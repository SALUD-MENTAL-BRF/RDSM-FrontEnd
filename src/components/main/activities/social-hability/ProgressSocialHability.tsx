import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


export const ProgressSocialHability = () => {
    const navigate = useNavigate()

    return (
        <main className="container-fluid d-flex">
            <div className="col-1 mt-1 ms-5">
                <div role='button' onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                    </svg>
                    <h6 className='ms-1'>Atrás</h6>
                </div>
            </div>
            <div className="d-flex justify-content-center w-100 me-5">
                <table className='text-center' id="myTable">
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Complejidad</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td valign="top" width="200" align="center">    
                            <select style={{textTransform: "none"}} className="w-100 text-center" name="disorderId" id="">
                                <option value="0">--</option>
                                <option>Primera</option>
                                <option>Ultima</option>
                            </select>
                        </td>
                        <td valign="top" width="150" align="center">
                            <select style={{textTransform: "none"}} className="w-100 text-center"  name="categoryId" id="">
                                <option value="0">--</option>
                                <option value="">Facíl</option>
                                <option value="">Normal</option>
                                <option value="">Dificíl</option>
                            </select>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </main> 
    )
};