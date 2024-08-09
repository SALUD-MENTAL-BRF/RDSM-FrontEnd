import "../../../assets/style/professional/ProfessionalList.css";
import { Aside } from "../../aside/Aside";

export const ProfessionalList = () => {
    return(
        <main className="container-fluid container-ProfessionalList">
        <div className="row w-100">
            <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-color">
                <Aside/>
            </section>
            <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-1">
                <div className="row justify-content-center">
                    <div className="col">
                        <input type="text" id="myInput" placeholder="Busqueda Central" title="Busqueda Rapida" className="form-control"/>
                        <table id="myTable">
                                <th>Título</th>
                                <th>Especialización</th>
                        <tr>
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
                    <div className="col">

                    </div>
                </div>
            </section>
        </div>
    </main>
    )
}