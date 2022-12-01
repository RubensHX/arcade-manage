interface ClientProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class Client {
  constructor(private props: ClientProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get phone(): string {
    return this.props.phone;
  }

  get address(): string {
    return this.props.address;
  }
}
