import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { logicalProblemHistoryDto } from "../../../../types/activity/logicalProblem.dto";
import "../../../../assets/style/activities/ProgressSocialHability.css";

export const ProgressLogicalProblem = () => {
    const [historyPatient, setHistoryPatient] = useState<Array<logicalProblemHistoryDto>>();
    const [filteredHistory, setFilteredHistory] = useState<Array<logicalProblemHistoryDto>>([]);
    const [dateFilter, setDateFilter] = useState("0");
    const [complexityFilter, setComplexityFilter] = useState("0");
    const [responseFilter, setResponseFilter] = useState("0"); 
    const { professionalId, patientId } = useParams();

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}logical-problem/history/${professionalId}/${patientId}`
            );
            const history: Array<logicalProblemHistoryDto> = await response.json();
            setHistoryPatient(history);
            setFilteredHistory(history); 
        })();
    }, []);

    const modifiedDate = (date: string) => {
        let newDate = new Date(date);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDate();
        let hour = newDate.getHours();
        let minutes = newDate.getMinutes();

        return `${day}/${month}/${year} ${hour}:${minutes}`;
    };

    const filterHistory = () => {
        if (!historyPatient) return;

        let filtered = [...historyPatient];

        // Filtrar y Ordenar por Fecha
        if (dateFilter !== "0") {
            filtered.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                return dateFilter === "Primera" ? dateA - dateB : dateB - dateA;
            });
        }

        // Filtrar por Complejidad
        if (complexityFilter !== "0") {
            filtered = filtered.filter((history) => history.complexity === complexityFilter);
        }

        // Filtrar por Respuesta
        if (responseFilter !== "0") {
            filtered = filtered.filter((history) => {
                if (responseFilter === "Correctas") {
                    return Number(history.correctResponse) === history.answer;
                } else if (responseFilter === "Incorrectas") {
                    return Number(history.correctResponse) !== history.answer;
                }
                return true;
            });
        }

        setFilteredHistory(filtered);
    };

    useEffect(() => {
        filterHistory();
    }, [dateFilter, complexityFilter, responseFilter]);

    return (
        <div className="row">
            <div className="d-flex justify-content-center w-100 me-5">
                <table className="text-center" id="myTable">
                    <thead>
                        <tr>
                            <th>Actividad</th>
                            <th>Complejidad</th>
                            <th>Respuesta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td valign="top" width="200" align="center">
                                <select
                                    style={{ textTransform: "none" }}
                                    className="w-100 text-center"
                                    onChange={(e) => setDateFilter(e.target.value)}
                                >
                                    <option value="0">--</option>
                                    <option value="Primera">Primera</option>
                                    <option value="Ultima">última</option>
                                </select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select
                                    style={{ textTransform: "none" }}
                                    className="w-100 text-center"
                                    onChange={(e) => setComplexityFilter(e.target.value)}
                                >
                                    <option value="0">--</option>
                                    <option value="Fácil">Fácil</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Difícil">Difícil</option>
                                </select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select
                                    style={{ textTransform: "none" }}
                                    className="w-100 text-center"
                                    onChange={(e) => setResponseFilter(e.target.value)}
                                >
                                    <option value="0">--</option>
                                    <option value="Correctas">Correctas</option>
                                    <option value="Incorrectas">Incorrectas</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <section>
                <div className="row">
                        <div className="col">
                            <div className="row justify-content-end text-end">
                                <h6>Respuesta incorrecta</h6>
                                <div className="recuadro responseIncorrect bg-danger">
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row justify-content-center text-center">
                                <h6>Respuesta correcta</h6>
                                <div className="recuadro bg-success">
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row justify-content-start text-start">
                                <h6>Respuesta del paciente</h6>
                                <div className="recuadro responseCorrect bg-primary">
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="row me-1 mt-5 d-flex justify-content-center">
                    {filteredHistory?.map((history) => (
                        <div key={history.id} className="card w-75 mt-5">
                            <div className="card-body text-center">
                                <h6 className="card-text">{history.problem}</h6>
                                <div className="list-group mt-5">
                                    {history.responses.map((option, index) => (
                                        <div key={index} className="d-flex">
                                            <p className="mt-4 me-2">{index + 1})</p>
                                            <button
                                                key={index}
                                                className={`text-white list-group-item list-group-item-action mt-3 mb-3 
                                                    ${
                                                        index + 1 !== Number(history.correctResponse) &&
                                                        index + 1 !== history.answer
                                                            ? "bg-danger"
                                                            : Number(history.correctResponse) === history.answer
                                                            ? "bg-primary"
                                                            : index + 1 === Number(history.correctResponse)
                                                            ? "bg-success"
                                                            : ""
                                                    } ${index + 1 === history.answer ? "bg-primary" : ""}`}
                                            >
                                                {option}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="explanation p-2 mb-3">
                                    <h6 className="mt-1">{history.explanation}</h6>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <div className="d-flex align-items-center">
                                        <h6>Fecha:</h6>
                                        <p className="mt-2 ms-1 me-3">{modifiedDate(history.createdAt)}</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <h6>Complejidad:</h6>
                                        <p className="mt-2 ms-1">{history.complexity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
