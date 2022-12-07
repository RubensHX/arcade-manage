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

  set id(id: string) {
    this.props.id = id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }
}
