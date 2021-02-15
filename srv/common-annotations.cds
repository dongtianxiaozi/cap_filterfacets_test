namespace com.seidor.sfc;

annotate cuid with {
    ID @(
        title : '{i18n>ID}',
        UI.HiddenFilter,
        Core.Computed
    );
}