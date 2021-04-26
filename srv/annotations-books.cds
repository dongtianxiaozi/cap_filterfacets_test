annotate CatalogService.Books with @(UI : {
  /*   SelectionFields                 : [
      ID,
      price,
      currency_code,
      toAuthor_ID
    ], */
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
    {Value : toGenre.parent},
    {Value : price},
    {
      Value : toSales.units,
      Label : '{i18n>Units}'
    },
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
    {
      $Type  : 'UI.ReferenceFacet',
      Label  : '{i18n>facetlabel2}',
      Target : '@UI.FieldGroup#Test2Details'
    }
  ],

  /* Lecciones aprendidas:
  - siempre tienen de unos filtros que hacen referencia a la entidad e incluyen todos los campos de esta
  - si no añades FilterFacets, también se muestras agrupados los campos según tengas los FieldGroups
  - si añades FilterFacets, puedes indicar un field group y este se mostrará junto con el de de entidad
    FilterFacets                    : [ {
      Label : '{i18n>filterfacetlabel}',
      Target : '@UI.FieldGroup#Test2Details'
    } ],
  - si añades FilterFacets sin ninguna referencia a field group, sólo aparecerá el grupo de la entidad
    FilterFacets                    : [],
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
