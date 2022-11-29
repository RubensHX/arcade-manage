import { Cliente } from './cliente';

describe('Cliente', () => {
  it('should be defined', () => {
    expect(
      new Cliente({
        nome: 'Teste',
        email: '',
        telefone: '',
        endereco: '',
      }),
    ).toBeDefined();
  });
});
