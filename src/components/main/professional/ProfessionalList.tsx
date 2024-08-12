import "../../../assets/style/professional/ProfessionalList.css";
import { Aside } from "../../aside/Aside";
import { useNavigate } from "react-router-dom";

export const ProfessionalList = () => {
    const navigate = useNavigate()
    return(
        <main className="container-fluid container-ProfessionalList">
        <div className="row w-100">
            <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-color">
                <Aside/>
            </section>
            <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-1">
                <div className="row justify-content-center">
                    <div className="col">
                        <input type="text" id="myInput" placeholder="Busqueda de profesionales..." title="Busqueda Rapida" className="form-control"/>
                        <table id="myTable">
                                <th>Centros hopitalarios</th>
                                <th>Título</th>
                                <th>Especialización</th>
                        <tr>
                            <td valign="top" width="200" align="center">
                                <select className="w-100" name="" id=""></select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select className="w-100" name="" id=""></select>
                            </td>
                            <td valign="top" width="150" align="center">
                                <select className="w-100" name="" id=""></select>
                            </td>
                        </tr>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-3">
                        <div className="card card-profesional">
                            <img className="card-img-top" src="/image-example/imageUser.jpg" alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Nombre</h5>
                                    <p className="card-text">Titulo</p>
                                    <p className="card-text">Especialización</p>
                                <button onClick={() => navigate("/profile-professional")} className="btn btn-primary">Ver más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
    )
}