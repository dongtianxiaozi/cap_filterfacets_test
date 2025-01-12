using { sap.capire.bookshop as my } from '../db/data-model';

service AdminService @(_requires:'authenticated-user') {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
}