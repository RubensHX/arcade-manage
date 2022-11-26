interface ProdutoProps {
  id?: string;
  name: string;
  price: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  image?: string;
}

export class Produto {
  constructor(private props: ProdutoProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get description(): string {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get image(): string {
    return this.props.image;
  }
}
