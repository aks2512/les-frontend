import menuToggle from '../../../assets/imgs/menuToggle.svg';

export function MenuToggle() {
    return (
        <div 
            className="menuToggle" 
            onClick={() => {
                let menu = document.querySelector('.primary-menu');

                menu.classList.toggle('active');
            }}
        >
            <div className="image">
                <img src={menuToggle} />
            </div>
        </div>
    );
}