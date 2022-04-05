import "./style.scss";

export function LoginForm() {
    return (
        <form className="login-form" action="">
            <h3>Já sou cadastrado</h3>

            <fieldset>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" />
            </fieldset>

            <fieldset>
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" />
            </fieldset>

            <button type="submit">Entrar</button>

        </form>
    );
}