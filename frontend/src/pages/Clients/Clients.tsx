import "./Clients.css";
import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/clients/find-all")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      });
  });

  useEffect(() => {
    setFilteredClients(
      clients.filter((client) => {
        return client.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, clients]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Topbar title="Clientes" />
        <div className="clientContainer">
          <div className="inputDiv">
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Pesquisar"
              autoComplete="off"
            />
          </div>
          {filteredClients.length > 0 ? (
          <div className="clientCard">
            {searchText.length > 0 ? (
              <ul>
                {filteredClients.map((client) => (
                  <>
                    <li key={client.id}>{client.name}</li>
                    <li key={client.id}>{client.email}</li>
                    <li key={client.id}>{client.phone}</li>
                  </>
                ))}
              </ul>
            ) : (
              <ul>
                {clients.map((client) => (
                  <>
                    <li key={client.id}>{client.name}</li>
                    <li key={client.id}>{client.email}</li>
                    <li key={client.id}>{client.phone}</li>
                  </>
                ))}
              </ul>
            )}
          </div>
          ): (
            <p className="emptyMessage">Nenhum cliente encontrado</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
