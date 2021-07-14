import React, { useState } from "react";

import "../styles/pages/sign-in.css";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = fetch("http://127.0.0.1:3001/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <main role="main" className="main">
      <div className="container__form">
        <h1 className="form__title">Login Cliente/Servidor</h1>

        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="fieldset fieldset__email">
            <label className="sr-only" htmlFor="email">
              Digite seu e-mail
            </label>

            <input
              className="form__input"
              type="email"
              id="email"
              inputMode="email"
              placeholder="E-mail"
              autoComplete="username"
              required
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
          </fieldset>

          <fieldset className="fieldset fieldset__password">
            <label className="sr-only" htmlFor="password">
              Digite sua senha
            </label>

            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Senha"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
            />
          </fieldset>

          <button className="button" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
