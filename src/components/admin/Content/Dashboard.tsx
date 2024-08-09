import '../../../assets/style/admin/Content/Dashboard.css'
import DataTable from './Datatable'
export const Dashboard = () => {
    return (
        <section className="home">
            <div className="text">
                Dashboard 
            </div>
            <div>
                <p className='Users'>Users</p>
                <DataTable />
            </div>
        </section>
    )
}

