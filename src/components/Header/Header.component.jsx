import React from 'react'
import logo from '../../assets/images/logo-nlc.jpeg'; // 
import mannequinInternational from '../../assets/images/mannequin-international.jpeg'; // 
import './header.scss';

const Header = () => {
    return (
        <div className='navigation'>
            <div className="navigation-left">
                <div className="navigation-left-title navigation-title">
                    new level corporation
                </div>
            </div>
            <div className="navigation-center">
                <img src={logo} alt="logo new level generation" height="80" width="80" className='img-fluid img-circle' />
                <img src={mannequinInternational} alt="logo mannequin photo" height="90" width="90" className='img-fluid img-circle' />
            </div>
            <div className="navigation-right">

                <div className="navigation-title navigation-right-title">
                    mannequin photo international cameroun
                </div>
            </div>

        </div>
        // <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        //     <div class="container-fluid">
        //         <div class="navbar-brand">
        //             <a class="stretched-link" href="#">
        //                 <img src={logo} width="50" height="50" alt="Boosted - Back to Home" loading="lazy" />
        //             </a>
        //         </div>
        //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span class="navbar-toggler-icon"></span>
        //         </button>

        //     </div>
        // </nav>
    )
}

export default Header;