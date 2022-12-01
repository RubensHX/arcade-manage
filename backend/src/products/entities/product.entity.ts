interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
}

export class Product {
  constructor(private props: ProductProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get price() {
    return this.props.price;
  }

  get description() {
    return this.props.description;
  }
}
