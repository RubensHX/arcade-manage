import { Cliente } from './cliente';

describe('Cliente', () => {
  it('should be defined', () => {
    expect(new Cliente()).toBeDefined();
  });
});
