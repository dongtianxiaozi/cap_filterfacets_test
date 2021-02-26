namespace com.seidor.sfc;

using {OrderService} from '../order-service';

annotate OrderService.Roles with {
    ID
    @UI.Hidden;
    code
    @title : '{i18n>rolesCode}';
    /*@(Common : {
        Text            : description,
        TextArrangement : #TextLast
    });*/
    description
    @title : '{i18n>rolesDescription}';

}

annotate OrderService.Roles with @(
    Common.SemanticKey : [code],
    UI                 : {
        Identification           : [{
            $Type : 'UI.DataField',
            Value : code
        }],
        SelectionFields          : [],
        LineItem                 : [
            {Value : code},
            {Value : description},

        ],
        HeaderInfo               : {
            TypeName       : '{i18n>role}',
            TypeNamePlural : '{i18n>roles}',
            Title          : {Value : code},
            Description    : {Value : description}
        },
        Facets                   : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#RolesDetails'
        }],
        FieldGroup #RolesDetails : {
            Label : '{i18n>details}',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : code
                    
                },
                {
                    $Type : 'UI.DataField',
                    Value : description
                },
            ]
        }
    }
);
