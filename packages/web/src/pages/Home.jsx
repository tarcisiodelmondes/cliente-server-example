import React, { useState } from "react";
import { ClientList } from "../components/ClientList";
import { ClientEdit } from "../components/ClientEdit";

export function Home() {
  const [clientId, setClientId] = useState(null);

  return (
    <main>
      <ClientList onSelectClient={setClientId} />
      <ClientEdit clientId={clientId} />
    </main>
  );
}
