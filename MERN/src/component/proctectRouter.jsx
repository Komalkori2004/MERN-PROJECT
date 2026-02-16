
import { Navigate } from "react-router-dom";


const Protected=({children,role})=>{
    const token=localStorage.getItem("token")
        const UserRole=localStorage.getItem("role")

if(!token){
return <Navigate to= "/login"/>
}
if(role&&UserRole!==role){
    return <Navigate to= "/login"/>

}
return children
}
export default Protected