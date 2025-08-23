import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import Nav from 'react-bootstrap/Nav';

function Signup() {
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form>
                    <label>Full name</label>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>

                    <div className="form-outline mb-3" data-mdb-input-init>
                        <i className="far fa-eye trailing fa-fw pe-auto" id="show-password-toggle-icon"></i>
                        <input type="password" id="show-password-input-1" className="form-control form-icon-trailing" />
                        <label className="form-label" for="show-password-input-1">Example label</label>
                    </div>                    

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Repeat password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                    </div>

                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">I agree to the terms and conditions</label>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary" data-mdb-ripple-init>Register</button>                        
                    </div>
                </form>
                
                <small id="accountExists" className="form-text text-muted">Already have an account?</small>
                <div className="d-grid gap-2">
                    <button type="button" className="btn btn-secondary" data-mdb-ripple-init>Login</button>
                </div>
                
            </div>
        </div>
    );
}

export default Signup;