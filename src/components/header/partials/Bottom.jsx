import { Link } from "react-router-dom";

export function Bottom() {
    return (
        <section className="bottom">
            <nav className="container">
                <ul className="primary-menu">
                    <li className="playstation">
                        <p>playstation</p>
                        <ul className="sub-menu">
                            <li><Link to="/playstation/playstation3">playstation 3</Link></li>
                            <li><Link to="/playstation/playstation4">playstation 4</Link></li>
                            <li><Link to="/playstation/playstation5">playstation 5</Link></li>
                        </ul>
                    </li>
                    <li className="xbox">
                        <p>xbox</p>
                        <ul className="sub-menu">
                            <li><Link to="/xbox/xbox360">xbox 360</Link></li>
                            <li><Link to="/xbox/xboxone">xbox one</Link></li>
                            <li><Link to="/xbox/xboxseriesxs">xbox series x/s</Link></li>
                        </ul>
                    </li>
                    <li className="nintendo">
                        <p>nintendo</p>
                        <ul className="sub-menu">
                            <li><Link to="/nintendo/nintendowii">nintendo wii</Link></li>
                            <li><Link to="/nintendo/nintendo3ds">nintendo 3ds</Link></li>
                            <li><Link to="/nintendo/nintendoswitch">nintendo switch</Link></li>
                        </ul>
                    </li>
                    <li className="pc">
                        <p>pc</p>
                        <ul className="sub-menu">
                            <li><Link to="/pc/perifericos">periferico</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </section>
    );
}