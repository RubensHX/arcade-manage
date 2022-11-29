import { Usuario } from './usuario';
import { randomUUID } from 'crypto';

describe('Usuario', () => {
  it('should be defined', () => {
    expect(
      new Usuario({
        id: randomUUID(),
        name: 'Teste',
        email: '',
        senha: '',
        createdAt: new Date(),
        updatedAt: null,
      }),
    ).toBeDefined();
  });
});
