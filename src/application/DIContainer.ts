import { Container, interfaces } from 'inversify';
import { ILogger } from '@Logger/ILogger';
import { Logger } from '@Logger/Logger';
import { EnvironmentManager } from './EnvironmentManager';
import { IUseCase } from '@Core/IUseCase';

export const DIContainer = new Container({ autoBindInjectable: true });
DIContainer.bind<ILogger>('Logger').to(Logger).inSingletonScope();
DIContainer.bind(EnvironmentManager).to(EnvironmentManager).inSingletonScope();
DIContainer.bind<interfaces.Factory<IUseCase<any, any>>>('Factory<IUseCase>').toFactory<IUseCase<any, any>>(
  (context: interfaces.Context) => {
    return (serviceIdentifier: interfaces.ServiceIdentifier<IUseCase<any, any>>) => {
      return context.container.get(serviceIdentifier);
    };
  }
);
