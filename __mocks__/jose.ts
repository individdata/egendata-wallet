export const JWT = jest.fn();

export const importJWK = jest.fn().mockImplementation(() => Promise.resolve(''));

export const exportJWK = jest.fn().mockImplementation(() => Promise.resolve(''));

export const generateKeyPair = jest.fn().mockImplementation(() => Promise.resolve(''));

export class SignJWT {
  obj: object;

  constructor(obj: object) {
    this.obj = obj;
  }

  setProtectedHeader(obj: object) {
    return this;
  }

  setIssuedAt() {
    return this;
  }

  sign(key: any) {
    return this;
  }
}
