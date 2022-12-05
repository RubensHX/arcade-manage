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

  set id(value: string) {
    this.props.id = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  get address(): string {
    return this.props.address;
  }

  set address(value: string) {
    this.props.address = value;
  }
}
