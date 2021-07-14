import React from "react";

import "../styles/pages/sign-in.css";

export function SignIn() {
  return (
    <main role="main" class="main">
      <div class="container__form">
        <h1 class="form__title">Login Cliente/Servidor</h1>

        <form class="form" action="/authenticate" method="POST">
          <fieldset class="fieldset fieldset__email">
            <label class="sr-only" for="email">
              Digite seu e-mail
            </label>

            <input
              class="form__input"
              type="email"
              name="email"
              id="email"
              inputmode="email"
              placeholder="E-mail"
              autocomplete="username"
              required
            />
          </fieldset>

          <fieldset class="fieldset fieldset__password">
            <label class="sr-only" for="password">
              Digite sua senha
            </label>

            <input
              class="form__input"
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              autocomplete="current-password"
              required
            />
          </fieldset>

          <button class="button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
