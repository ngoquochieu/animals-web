import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        client_id:"",
        client_secret:""
    })
    const [err, setErr] = useState({})

    function handleErrUsername () {
        if(err.client_id) 
            return <span className="err">{err.client_id}</span>
    }

    function handleErrPassword () {
        if(err.client_secret) 
            return <span className="err">{err.client_secret}</span>
    }

    const handleInputs = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputs(state => ({...state, [name]: value}))
    }

    function handleSubmit (event){
        event.preventDefault()
        let frag = true;
        let errs = {}
        if(inputs.client_id === "") {
            frag = false
            errs.client_id = 'Enter your Client ID'
        }
        if(inputs.client_secret === "") {
            frag = false
            errs.client_secret = 'Enter your Client Secrect'
        }
        if(!frag) {
            setErr(errs)
        } else {
            setErr("")
            const data = {
                grant_type: 'client_credentials',
                client_id: inputs.client_id,
                client_secret: inputs.client_secret
            }
            const url = 'https://api.petfinder.com/v2/oauth2/token'
            axios.post(url, data) 
                .then(data => {
                    localStorage.setItem('access_token', data.data.access_token)
                    navigate('/home')
                })
                .catch(err => {alert("Wrong ClientID or Client Secrect")})
        }
    }
    return <>
        <div className="containerLogin">
            <div className="left-content">
                <p>PANDAS</p>
                <h1>Giant pandas: Living proof that conservation works</h1>
                <span>The charismatic giant panda WWFs famous symbol is a conservation icon turned conservation success.</span>
            </div>
            <div className="right-content">
                <form onSubmit={handleSubmit}>
                    <h1>LOGIN</h1>
                    <div className="txt_field">
                        <label>Client ID</label>
                        <input type="text" name="client_id" onChange={handleInputs}/>
                        
                    </div>
                    {handleErrUsername()}
                    <div className="txt_field">
                        <label>Client Secrect</label>
                        <input type="password" name="client_secret" onChange={handleInputs}/>
                    </div>
                    {handleErrPassword()}
                    <button type="submit" className="btn-login">Login</button>
                </form>
            </div>
        </div>
    </>
}
export default Login