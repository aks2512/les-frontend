import './style.scss'

import { Top } from './partials/Top';
import { Bottom } from './partials/Bottom';

export function Footer(){
    return(
        <footer className="footer">
            <div className="container">
                <Top/>
                <Bottom/>
            </div>
        </footer>
    );
}