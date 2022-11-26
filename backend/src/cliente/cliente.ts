interface ClienteProps {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export class Cliente {
  constructor(private props: ClienteProps) {}

  get nome() {
    return this.props.nome;
  }

  get email() {
    return this.props.email;
  }

  get telefone() {
    return this.props.telefone;
  }

  get endereco() {
    return this.props.endereco;
  }
}
