annotate CatalogService.Books with @(
  UI: {
    SelectionFields: [ ID, price, currency_code ],
    LineItem: [
      {Value: title},
      {Value: author.name, Label:'{i18n>Author}'},
      {Value: alias, Label:'{i18n>Alias}'},
      {Value: descr, Label:'{i18n>Description}'},
      {Value: genre.name},
      {Value: price},
      {Value: currency.symbol, Label:' '},
    ]
  }
);