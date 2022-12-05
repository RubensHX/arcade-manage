import "./Clients.css";
import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useId, useMemo, useState, FormEvent } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { v4 as uuid } from "uuid";
import { WhatsappLogo } from "phosphor-react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useMemo(() => {
    fetch("http://localhost:3000/clients/find-all")
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      });
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter((client) => {
        return client.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [searchText, clients]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleNewClient = (event: FormEvent) => {
    event.preventDefault();
    axios("http://localhost:3000/clients/create", {
      method: "POST",
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
      },
    });
    closeModal();
    toast.success("Cliente cadastrado com sucesso!");
  };

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
            <div className="listContainer">
              {searchText.length > 0 ? (
                <ul>
                  {filteredClients.map((client) => (
                    <>
                      <li key={uuid()}>
                      <div className="cardClient">
                          <p>{client.name}</p>
                          <p>{client.email}</p>
                          <p>
                            {client.phone}{" "}
                            <a
                              href={`https://wa.me/55${client.phone}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <WhatsappLogo
                                size={16}
                                color="green"
                                style={{ cursor: "pointer" }}
                              />{" "}
                            </a>
                          </p>
                          <p>{client.address}</p>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <ul>
                  {clients.map((client) => (
                    <>
                      <li key={uuid()}>
                      <div className="cardClient">
                          <p>{client.name}</p>
                          <p>{client.email}</p>
                          <p>
                            {client.phone}{" "}
                            <a
                              href={`https://wa.me/55${client.phone}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <WhatsappLogo
                                size={16}
                                color="green"
                                style={{ cursor: "pointer" }}
                              />{" "}
                            </a>
                          </p>
                          <p>{client.address}</p>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <p className="emptyMessage">Nenhum cliente encontrado</p>
          )}
        </div>
        <footer>
          <div className="newClientDiv">
            <button className="newClientButton" onClick={openModal}>
              Cadastrar novo cliente
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "#fff",
                border: "none",
                overflowY: "hidden",
                color: "#000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
              },
            }}
            contentLabel="Cadastro de cliente"
          >
            <h1>Cadastrar cliente</h1>
            <form onSubmit={handleNewClient} className="createClientForm">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Telefone"
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Endereço"
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="off"
              />
              <button type="submit">Cadastrar</button>
            </form>
          </Modal>
        </footer>
      </IonContent>
    </IonPage>
  );
}
