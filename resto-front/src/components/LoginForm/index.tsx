import styles from "./LoginForm.module.css"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUserRol, setUserRolLogout } from "@/redux"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, signInWithEmailAndPassword } from "firebase/auth"
import Swal from 'sweetalert2';
import { validateLoginForm } from "../../utils"

const loginInitialState = {
    email: "",
    password: ""
}

export const LoginForm = () => {
    const provider = new GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ authorizedUser, setAuthorizedUser ] = useState<any>(false || sessionStorage.getItem("accessToken"))
    const [ error, setError ] = useState(loginInitialState)   
    const [ login, setLogin ] = useState(loginInitialState)

    const handleGoogleSignIn = async () => {
        try {
            let userRole;
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            if(user){
                const userId = user.uid;
                const accessToken = await user.getIdToken();
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("userId", userId);
                setAuthorizedUser(true);

                const response = await fetch(`http://resto-back-production-2867.up.railway.app/users/${userId}/role`, {
                    headers:{
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                if (!response.ok) {
                    if (response.status === 401) userRole = 'client';
                } else {
                    userRole = await response.json()
                }
            }
            dispatch(setUserRol(userRole))

            if (!['employee', 'admin'].includes(userRole)){
                sessionStorage.setItem('isClient', 'true')
            } else {
                sessionStorage.setItem('isClient', 'false')
            }
            
            userRole === "admin" ? navigate("/admin") : navigate("/")
        } catch (error) {
            Swal.fire({
                title: 'Mal',
                text: 'Error al iniciar sesión con Google',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            let userRole;
            const result = await signInWithEmailAndPassword(auth, login.email, login.password);
            const user = result.user;
            
            if(user){
                const userId = user.uid;
                const accessToken = await user.getIdToken();
                sessionStorage.setItem("accessToken", accessToken);
                sessionStorage.setItem("userId", userId);
                setAuthorizedUser(true);

                const response = await fetch(`http://resto-back-production-2867.up.railway.app/users/${userId}/role`, {
                        headers:{
                            'Authorization': `Bearer ${accessToken}`
                        },
                    })
                userRole = await response.json()
            }

            dispatch(setUserRol(userRole))

            if (!['employee', 'admin'].includes(userRole)){
                sessionStorage.setItem('isClient', 'true')
            } else {
                sessionStorage.setItem('isClient', 'false')
            }
            
            userRole === "admin" ? navigate("/admin") : navigate("/")

        } catch (error) {
            Swal.fire({
                title: 'Mal',
                text: 'Usuario o contraseña equivocada',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        }
      };

    const logoutUser = () => {
        signOut(auth).then(() => {
            sessionStorage.clear()
            setAuthorizedUser(false);

            Swal.fire({
                title: 'Bien',
                text: 'Has cerrado sesión correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
        })
        dispatch(setUserRolLogout())
    }

    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            [event.target.name]: event.target.value
        })
        setError(validateLoginForm({ ...login, [event.target.name]: event.target.value }));
    }
    const protectRoute = async () => {
        if (authorizedUser && sessionStorage.getItem('isClient') === 'false') {
            const response = await fetch(`http://resto-back-production-2867.up.railway.app/users/${sessionStorage.getItem('userId')}/role`, {
                headers:{
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            const role = await response.json()
            dispatch(setUserRol(role))
        }
    }
    
    useEffect(() => {
        protectRoute()
    }, [login])

    return (

        <div>

            {authorizedUser ? (
                // TODO: darle estilo a este bloque <p> y <button>
                // TODO: poner un boton de volver y otro boton de ir a carrito o algo y darle estilos

                <div className={styles.logout}>
                    <p>Usuario autorizado como cliente</p>
                    <button onClick={logoutUser}>CERRAR SESIÓN</button>
                    
                </div>
            ): (

            <>
                <form className={styles.contenedorLoginForm}>

                    <label htmlFor="email">Email</label>
                    <input type="text" value={login.email} name="email" onChange={handleChange} placeholder="EMAIL"></input>
                    <div className={styles.mensajeError}> {error.email !== "" ? <p>{error.email}</p> : ""}</div>
            
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" value={login.password} name="password" onChange={handleChange} placeholder="CONTRASEÑA"></input>

                    <div className={styles.mensajeError}> {error.password !== "" ? <p>{error.password}</p> : ""} </div>
            
                    <button type="button" onClick={handleLogin}>LOG IN</button>
            
                </form>
                <div>
                    <button className={styles.loginGoogle} onClick={handleGoogleSignIn}>LOG IN CON GOOGLE</button>
                </div>
            </>  
            
        )}

        </div>
    )

}