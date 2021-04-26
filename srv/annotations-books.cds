annotate CatalogService.Books with @(
  UI: {
    SelectionFields: [ ID, price, currency_code, toAuthor_ID ],
    LineItem: [
      {Value: title, Label:'{i18n>Title}'},
      {Value: toAuthor.name, Label:'{i18n>Author}'},
      {Value: alias, Label:'{i18n>Alias}'},
      {Value: descr, Label:'{i18n>Description}'},
      {Value: toGenre.parent},
      {Value: price},
      {Value: toSales.units, Label:'{i18n>Units}'},
      {Value: currency.symbol, Label:' '},
    ]
  }
);