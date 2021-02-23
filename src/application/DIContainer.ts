import { Container, interfaces } from 'inversify';
import { ILogger } from '../logger/ILogger';
import { Logger } from '../logger/Logger';
import { EnvironmentManager } from './EnvironmentManager';
import { IUseCase } from '../core/IUseCase';
import { ContextManager } from './ContextManager';

export const DIContainer = new Container({ autoBindInjectable: true });
DIContainer.bind<ILogger>('Logger').to(Logger).inSingletonScope();
DIContainer.bind(EnvironmentManager).to(EnvironmentManager).inSingletonScope();
DIContainer.bind(ContextManager).to(ContextManager).inSingletonScope();
DIContainer.bind<interfaces.Factory<IUseCase<any, any>>>('Factory<IUseCase>').toFactory<IUseCase<any, any>>(
  (context: interfaces.Context) => {
    return (serviceIdentifier: interfaces.ServiceIdentifier<IUseCase<any, any>>) => {
      return context.container.get(serviceIdentifier);
    };
  }
);
