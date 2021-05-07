# Getting Started
 
This project has been developed to test the FilterFacets annotation.

## Lecciones aprendidas

  Lecciones aprendidas sobre la configuración del “Adapt Filters” en una app Odata V4:

  - siempre aparece un grupo de filtros que hace referencia a la entidad e incluyn todos los campos de esta

  - si no añades la anotación FilterFacets, también se muestran agrupaciones por cada FieldGroups que tengas definido

  - si añades FilterFacets, puedes indicar un field group y este se mostrará junto con el de de entidadFilterFacets                    
      FilterFacets                    : [ {
        Label : '{i18n>filterfacetlabel}',
        Target : '@UI.FieldGroup#Test2Details'
      } ],
  - si añades FilterFacets sin ninguna referencia a field group, sólo aparecerá el grupo de la entidadFilterFacets                    : [],
      FilterFacets                    : [],
  - Las Label que indiques prevalecen sobre los títulos que hayas puesto y son los textos que se van a mostrar en el Adapt Filters.    

Lecciones aprendidas sobre la configuración del “Adapt Filters” en una app Odata V2:

  - Se añaden por defecto tantos grupos de filtros como asociaciones tenga la entidad, también se añaden para localized y para tipos (currency por ejemplo)

## Setup and deploy

```bash
npm install
cds build
```

For local testing, create a new default-env.json file with your hana service credentials:  
```
{  
  "VCAP_SERVICES": {  
    "hana": [  
      {  
        "name": "cap_filterfacets_test-db",  
        "tags": [  
          "hana"  
        ],  
        "credentials": {  
          "certificate":   
          .....  
          "user": ...  
        }  
      }  
    ]  
  }  
}  
``` 

To deploy to BTP run the following commands:  
```bash
mbt build  
cf deploy ....  
```

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
