interface AuthInterface {
  id: string;
  email: string;
  password: string;
  name?: string;
}

export class Auth {
  constructor(private props: AuthInterface) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
