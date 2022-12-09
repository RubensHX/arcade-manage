import "./Clients.css";
import { IonPage, IonContent } from "@ionic/react";
import { useEffect, useMemo, useState, FormEvent } from "react";
import Topbar from "../../components/Topbar/Topbar";
import { Pencil, Trash, WhatsappLogo } from "phosphor-react";
import Modal from "react-modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface IFormInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isOpenNewClient, setIsOpenNewClient] = useState(false);
  const [isOpenEditClient, setIsOpenEditClient] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const { handleSubmit, register } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch(`http://localhost:3000/clients/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      }),
    }).then(() => {
      toast.success("Cliente atualizado com sucesso!");
      closeModalEditClient();
      window.location.reload();
    })
  }

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
    setIsOpenNewClient(true);
  }

  function closeModal() {
    setIsOpenNewClient(false);
  }

  function openModalEditClient(client: Client) {
    setIsOpenEditClient(true);
    setId(client.id);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
  }

  function closeModalEditClient() {
    setIsOpenEditClient(false);
  }

  async function handleClientRemove(client: Client) {
    fetch(`http://localhost:3000/clients/delete/${client.id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Cliente removido com sucesso!");
        setClients(clients.filter((c) => c.id !== client.id));
      })
      .catch(() => {
        toast.error("Não foi possível remover o cliente!");
      });
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
    window.location.reload();
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
                      <li key={client.id}>
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
                          <div className="separateDiv">
                            <div className="buttonGrid">
                              <button
                                className="action-button-danger"
                                onClick={() => handleClientRemove(client)}
                              >
                                <Trash size={16} color="white" />
                              </button>
                              <button
                                className="action-button"
                                onClick={() => openModalEditClient(client)}
                              >
                                <Pencil size={16} color="white" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <ul>
                  {clients.map((client) => (
                    <>
                      <li key={client.id}>
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
                          <div className="separateDiv">
                            <div className="buttonGrid">
                              <button
                                className="action-button-danger"
                                onClick={() => handleClientRemove(client)}
                              >
                                <Trash size={16} color="white" />
                              </button>
                              <button
                                className="action-button"
                                onClick={() => openModalEditClient(client)}
                              >
                                <Pencil size={16} color="white" />
                              </button>
                            </div>
                          </div>
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
            isOpen={isOpenNewClient}
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
        <Modal
          isOpen={isOpenEditClient}
          onRequestClose={closeModalEditClient}
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
          <h1>Editar cliente</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="createClientForm">
            <input
              type="text"
              id="name"
              defaultValue={name}
              {...register("name", { required: false })}
              placeholder="Nome"
              autoComplete="off"
            />
            <input
              type="text"
              id="email"
              defaultValue={email}
              {...register("email", { required: false })}
              placeholder="Email"
              autoComplete="off"
            />
            <input
              type="text"
              id="phone"
              defaultValue={phone}
              {...register("phone", { required: false })}
              placeholder="Telefone"
              autoComplete="off"
            />
            <input
              type="text"
              id="address"
              defaultValue={address}
              {...register("address", { required: false })}
              placeholder="Endereço"
              autoComplete="off"
            />
            <button type="submit">Editar</button>
          </form>
        </Modal>
        <ToastContainer />
      </IonContent>
    </IonPage>
  );
}
