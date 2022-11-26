interface UsuarioInterface {
  id: string;
  name: string;
  email: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Usuario {
  constructor(private props: UsuarioInterface) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get senha(): string {
    return this.props.senha;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
