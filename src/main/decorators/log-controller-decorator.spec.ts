/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log-controller-decorator';
import { serverError, ok } from '../../presentation/helpers/http/http-helper';
import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository';
import { AccountModel } from '../../domain/models/account';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise((resolve) => resolve(ok(makeFakeAccount())));
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepositoryStub {
    async logError(_stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new LogErrorRepositoryStub();
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});
const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error();
  fakeError.stack = 'any_stack';
  return serverError(fakeError);
};
interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogController Decorator', () => {
  // Deve chamar o identificador do controlador
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(makeFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
  });
  // Deve retornar o mesmo resultado do controlador
  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });
});
// Deve chamar LogErrorRepository com erro correto se o controlador retornar um erro de servidor
test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
  const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
  const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
  jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeServerError())));
  await sut.handle(makeFakeRequest());
  expect(logSpy).toHaveBeenCalledWith('any_stack');
});
