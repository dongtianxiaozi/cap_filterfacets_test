using { sap.capire.bookshop as my } from '../db/data-model';
service CatalogService @(path:'/browse') {

  @readonly entity Books as SELECT from my.Books {
      *,
      author : redirected to Authors,
      author.alias as alias
  } excluding { createdBy, modifiedBy };

  @readonly entity Authors as SELECT from my.Authors {
      *
  } excluding { createdBy, modifiedBy };

  @requires_: 'authenticated-user'
  action submitOrder (book: Books:ID, amount: Integer);
}
