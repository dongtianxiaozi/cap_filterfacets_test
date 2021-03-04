import { DIContainer } from '@Application/DIContainer';
import { ContextManager } from '@Application/ContextManager';
import { ILogger } from '@Logger/ILogger';

const contextManager: ContextManager = DIContainer.get(ContextManager);
const logger: ILogger = DIContainer.get('Logger');

export function ExecuteInContext() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    return execute(target, propertyKey, descriptor);
  };
}

function execute(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
  // target === Employee.prototype
  // propertyName === "greet"
  // propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "greet")
  const method = propertyDesciptor.value;

  propertyDesciptor.value = async function (...args: any[]) {
    //const name = target.constructor.name + "." + propertyName
    const req = args.find(arg => arg.req != undefined && arg.res != undefined && arg.event != undefined)
    return contextManager.startContextWithPromise(req, async () => {
      try {
        return await method.apply(this, args);
      } catch (e) {
        logger.e(`${this.constructor.name}`, () => `CODE: ${e.code} MESSAGE: ${e.message}`);
        req.reject();
      }
    });
  };
  return propertyDesciptor;
}
