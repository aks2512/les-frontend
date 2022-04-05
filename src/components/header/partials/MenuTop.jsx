import { Search } from './Search';
import { Login } from './Login';
import { Cart } from './Cart';
import { MenuToggle } from './MenuToggle';

export function MenuTop() {
    return (
        <div className="menuTop">    
            <Search/>
            <Login/>
            <Cart/>
            <MenuToggle/>
        </div>
    );
}