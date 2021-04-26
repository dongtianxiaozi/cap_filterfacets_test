using {
  Currency,
  managed,
  sap,
  cuid
} from '@sap/cds/common';

namespace sap.capire.bookshop;

@cds.search : {
  title,
  descr : false,
  author.name
}
entity Books : managed {
  key ID       : Integer;
      title    : localized String(111);
      descr    : localized String(1111);
      toAuthor : Association to Authors;
      toGenre  : Association to Genres;
      stock    : Integer;
      price    : Decimal(9, 2);
      currency : Currency;
}

entity Sales : cuid {
  units  : Integer;
  toBook : Association to Books;
}

entity Authors : managed {
  key ID    : Integer;
      name  : String(111);
      alias : String(10);
      toBooks : Association to many Books
                on toBooks.toAuthor = $self;
}

/**
 * Hierarchically organized Code List for Genres
 */
entity Genres : sap.common.CodeList {
  key ID       : Integer;
      parent   : Association to Genres;
      children : Composition of many Genres
                   on children.parent = $self;
}
