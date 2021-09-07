import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin } from '../../actions/authAction';
import { useForm } from '../../hooks/useForm';

const Login = () => {

    const [values, handleInputChange] = useForm({
        email:'',
        password:''
    })
    const {email, password} = values;

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('iniciar sesion', email, password);
    }
    const dispatch = useDispatch()

    return (
        <div className="Registro py-5 container text-center">

            <form className="form-signin" onSubmit={handleLogin}>
                <h1 className="h4 mb-3 font-weight-normal">
                    Inicio de sesión
                </h1>

                <input
                    type="email"
                    id="inputEmail"
                    className="form-control mt-1"
                    placeholder="Email"
                    required=""
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    id="inputPassword"
                    className="form-control mt-1"
                    placeholder="Contreña"
                    required=""
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"

                >
                    Login
                </button>

                <div className="">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn btn-primary"
                        onClick={() => dispatch(startGoogleLogin())}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <div
                    className="google-btn btn-primary"
                    
                >
                    <div className="google-icon-wrapper">
                        <img className="google-icon"
                            src="https://image.flaticon.com/icons/png/512/20/20673.png"
                            alt="google button"
                            width="30px" />
                    </div>
                    <p className="btn-text">
                        <b>Sign in with Facebook</b>
                    </p>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </div>
    )
}

export default Login
