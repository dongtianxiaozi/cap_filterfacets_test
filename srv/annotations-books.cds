annotate CatalogService.Books with {
  toAuthor @title:'{i18n>AuthorTitle}' @Common.Label:'{i18n>AuthorLabel}';
  toAuthor_ID @title:'{i18n>AuthorTitle}' @Common.Label:'{i18n>AuthorLabel}';
}

annotate CatalogService.Books with @(UI : {
   SelectionFields                 : [
      currency_code,
      toAuthor.ID
    ],  
  LineItem                        : [
    {
      Value : title,
      Label : '{i18n>Title}'
    },
    {
      Value : toAuthor.name,
      Label : '{i18n>Author}'
    },
    {
      Value : alias,
      Label : '{i18n>Alias}'
    },
    {
      Value : descr,
      Label : '{i18n>Description}'
    },
    {Value : toGenre.parent_ID},
    {Value : price},
/*     {
      Value : toSales.units,
      Label : '{i18n>Units}'
    }, */
    {
      Value : currency.symbol,
      Label : ' '
    },
  ],
  Facets                          : [
    {
      $Type  : 'UI.ReferenceFacet',
      Label  : '{i18n>facetlabel}',
      Target : '@UI.FieldGroup#ResponsiblesDetails'
    },
  ],

  /* 
  Lecciones aprendidas sobre la configuración del “Adapt Filters”

  - siempre aparece un grupo de filtros que hace referencia a la entidad e incluyn todos los campos de esta

  - si no añades la anotación FilterFacets, también se muestran agrupaciones por cada FieldGroups que tengas definido

  - si añades FilterFacets, puedes indicar un field group y este se mostrará junto con el de de entidadFilterFacets                    : [ {Label : '{i18n>filterfacetlabel}',Target : '@UI.FieldGroup#Test2Details'} ],
      FilterFacets                    : [ {
        Label : '{i18n>filterfacetlabel}',
        Target : '@UI.FieldGroup#Test2Details'
      } ],
  - si añades FilterFacets sin ninguna referencia a field group, sólo aparecerá el grupo de la entidadFilterFacets                    : [],
      FilterFacets                    : [],
  - Las Label que indiques prevalecen sobre los títulos que hayas puesto y son los textos que se van a mostrar en el Adapt Filters.    
  */

  FilterFacets                    : [],

  FieldGroup #ResponsiblesDetails : {
    Label : '{i18n>fieldgrouplabel}',
    Data  : [
      {
        $Type : 'UI.DataField',
        Value : descr
      },
      {
        $Type : 'UI.DataField',
        Value : toSales.units,
      }
    ]
  },
  FieldGroup #Test2Details        : {
    Label : '{i18n>secondfgrouplabel}',
    Data  : [
      {
        $Type : 'UI.DataField',
        Value : title
      },
      {
        $Type : 'UI.DataField',
        Value : toSales.units,
      }
    ]
  },
});
