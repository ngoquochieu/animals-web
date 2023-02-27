import { useNavigate } from "react-router-dom"
import dog from "../../image/DOG.PNG"

function Header(props) {
    const {animals} = props
    const navigate = useNavigate()
    
    function logOut() {
        localStorage.clear()
        navigate('/')
    }
    return  <div className="header">
                <div className="content-header">
                    <div className="left-header">
                        <img src={dog} alt="" />
                        <p>{animals} animals</p>
                    </div>
                    <div className="right-header">
                        <button onClick={logOut}>Log out</button>
                    </div>
                </div>
            </div>
}
export default Header