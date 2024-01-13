import EditMap from "@/components/editMap";
import WithAuth from "@/wrappers/auth"
const Admin = () => {
    return <div>
        <EditMap />
    </div>
}

export default WithAuth(Admin);