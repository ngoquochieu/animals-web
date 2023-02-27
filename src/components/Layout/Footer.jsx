import {FaFacebookF} from 'react-icons/fa'
import {BsTwitter, BsInstagram} from 'react-icons/bs'
import {FiYoutube} from 'react-icons/fi'

function Footer(props) {
    return  <div className="footer">
                <div className="content-footer">
                    <div className="left-footer">
                        @2023 Animals.com Coppyright Ngo Quoc Hieu
                    </div>
                    <div className="right-footer">
                        <ul>
                            <li><FaFacebookF size={20}/></li>
                            <li><BsTwitter size={20}/></li>
                            <li><BsInstagram size={20}/></li>
                            <li><FiYoutube size={25}/></li>
                        </ul>
                    </div>
                </div>
            </div>
}
export default Footer