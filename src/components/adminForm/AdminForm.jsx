import './style.scss';

export function AdminForm() {
    return (
        <div className="admin-form">
             <form>

                 <fieldset>
                     <label htmlFor="email">Email</label>
                     <input type="email" id="email" />
                 </fieldset>

                 <fieldset>
                    <label htmlFor="password">Senha</label>
                     <input type="password" id="password" />
                 </fieldset>
                 
                 <button type="submit">Login</button>
                 
             </form>
        </div>
    );
}