using { sap.capire.bookshop as my } from '../db/data-model';
service CatalogService @(path:'/browse') {

  entity Books as SELECT from my.Books {
      *,
      toAuthor : redirected to Authors,
      toSales : redirected to Sales,
      toAuthor.alias as alias
  } excluding { createdBy, modifiedBy };

  @readonly entity Authors as SELECT from my.Authors {
      *
  } excluding { createdBy, modifiedBy };

  @requires_: 'authenticated-user'
  action submitOrder (book: Books:ID, amount: Integer);

  entity Sales as projection on my.Sales;
}
