// images
import { Link } from 'react-router-dom';
import header_logo from '../../../assets/imgs/header_logo.svg';

import { MenuTop } from './MenuTop';

export function Top() {
    return (
        <section className="top">
            <div className="container">
                <Link to="/" className="logo">
                    <img src={header_logo} alt="company logo" />
                </Link>

                <MenuTop/>
                
            </div>
        </section>
    );
}