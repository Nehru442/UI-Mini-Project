import { Link } from "react-router-dom";

export function UserLoginError(){
    return(
        <div className="text">
            <h3>User Doesn't Exist</h3>
            <Link to="/user-login">Try again</Link>
        </div>
    )
}