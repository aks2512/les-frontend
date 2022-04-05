import './style.scss';

import { Top } from './partials/Top';
import { Bottom } from './partials/Bottom';

export function Header() {

    return (
        <>
            <header className="header">
                <Top/>
                <Bottom/>
            </header>
        </>
    );
}