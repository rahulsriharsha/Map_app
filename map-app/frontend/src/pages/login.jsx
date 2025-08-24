import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/login", {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                setSuccess(true);
                setTimeout(() => {
                    navigate('/maps');
                }, 1500);
            }
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            {/* Success alert */}
            {success && (
                <div class="alert alert-success" role="alert">
                    Login successful. Redirecting...
                </div>                    
            )}

            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                <div className="bg-white p-3 rounded w-25">
                    <h2>Login</h2>

                    

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" data-mdb-ripple-init>Login</button>                        
                        </div>
                    </form>
                    
                    <small id="accountExists" className="form-text text-muted">Don't have an account?</small>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-secondary" data-mdb-ripple-init onClick={() => navigate("/register")}>Register</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Login;