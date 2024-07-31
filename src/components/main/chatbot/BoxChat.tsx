import { Aside } from "../../aside/Aside"
export const BoxChat = () => {
    return (
            <main className="container-fluid container-chatbot">
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-patient">
                        <Aside/>
                    </section>
                    <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-5 options-container">
                        
                    </section>
                </div>
            </main>
    )
}