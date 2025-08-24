import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:4000/register', {firstname, lastname, email, password1, password2})
        .then(result => {
            console.log(result)
            Swal.fire({
                title: 'Registration successful',
                icon: 'success',
                text: 'Welcome to the Maps'
            })
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>Full name</label>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" onChange={(e) => setFirstname(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" onChange={(e) => setLastname(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>

                    {/* <div className="form-outline mb-3" data-mdb-input-init>
                        <i className="far fa-eye trailing fa-fw pe-auto" id="show-password-toggle-icon"></i>
                        <input type="password" id="show-password-input-1" className="form-control form-icon-trailing" onChange={(e) => setPassword1(e.target.value)} />
                        <label className="form-label" for="show-password-input-1">Example label</label>
                    </div>                     */}

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Repeat password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" onChange={(e) => setPassword2(e.target.value)} />
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">I agree to the terms and conditions</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" data-mdb-ripple-init onClick={() => navigate("/login")}>Register</button>                        
                    </div>
                </form>
                
                <small id="accountExists" className="form-text text-muted">Already have an account?</small>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-secondary" data-mdb-ripple-init onClick={() => navigate("/login")}>Login</button>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;