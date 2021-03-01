# README

Para ejecutar la aplicación:

- npm install
- npm run watch

Si se desea trabajar con cds directamente:

- npm install
- npm run build
- cds watch

Si se activa el auto-attach del debug:

- npm install
- npm run watch
- debug (activamos el debug)

Deploy (Node 12)

- npm install -g npm
- npm install -g mbt
- brew install cloudfoundry/tap/cf-cli@7
- cf install-plugin multiapps
- npm install app/**/package.json
- mbt build
- cf login (API Endpoint: api.cf.eu10.hana.ondemand.com)
- cf deploy mta_archives/sfc_1.0.0.mtar

Logs SCF
- cf logs sfc-srv --recent

Mock de autentication xsuaa cloud en local
- en .cdsrc.json:
```
{
    "auth": {
        "passport": {
            "strategy": "JWT"
        }
    }
}
```
- en default-env.json, actualizar VCAP_SERVICES > xsuaa > credentials con las credenciales obtenidas de ejecutar:
```
cf service-key sfc-xsuaa-service sfc-uaa-key
```


Usuarios mocked en local
- en .cdsrc.json:
```
{
  "auth": {
      "passport": {
          "strategy": "mock",
          "users": {
              "user": {
                  "password": "",
                  "ID": "user",
                  "roles": [
                      "user"
                  ],
                  "tenant": "999ef85a-aef2-464b-89f6-6a3ce64f2e99",
                  "userAttributes": {
                      "currency": [
                          "USD"
                      ],
                      "tenant": "999ef85a-aef2-464b-89f6-6a3ce64f2e99",
                      "email": "user@seidor.es"
                  }
              }
          }
      }
  }
}
```
### Importe

- [Nomenclaturas a utilizar en el modelado](https://seidor.sharepoint.com/:p:/t/ShopFloorControlConsultingESP/EZ6gD5IkBi9Mq_6MiRr9iXsBRCBV5vNPUTpeWju7Yn02iQ?e=YZ8Tad)
- [Cómo realizar búsquedas en typescript contra el CDS](https://cap.cloud.sap/docs/cds/cqn)
- [Libería utilizada para usar Typescript con CAP](https://github.com/mrbandler/cds-routing-handlers#readme)
- [Ejemplos de CAP](https://github.com/SAP-samples/cloud-cap-samples)
- Los servicios de srv en .js son sobrescritos.
- Todo DB debe tener información fake en la carpeta data para las pruebas.

### Carpetas en /src

- application: clases necesarias para la gestión de la aplicación
- core: clases bases técnicas
- features: características de la aplicación formada por Handlers (captura de eventos) + Lógica de negocio (use case) + Lógica de acceso a datos (repositorio)
- logger: clases para los logs
- persistence: clases relacionadas con la gestión o uso de la BBDD
- remote: clases relacionadas con la gestión o uso de llamadas remotas
- results: resultados (Either) disponibles
- services: servicios CAP (CUIDADO: el contenido de esta carpeta se copia a /srv)
- shared: clases transversales (contexto de trabajo)
- utils: clases con utilidades

### Logs

Estos son los niveles de log por defecto para cada nivel:

- Log.i = Handler/UseCase
- Log.d = Repository
- Log.v = Datasource
- Log.w = Errores controlados
- Log.e = Errores no controlados
- Log.wtf = Error del programa

Todos los niveles se pueden utilizar en cualquier capa si se necesita dar más detalle.
