using {
    com.seidor.sfc.md as md,
    com.seidor.sfc.td as td,
    com.seidor.sfc.view as view
} from '../db/data-model';

service UserService {


    @cds.persistence.skip
    entity checkUser {
        key username   : String;
        roles: association to roles;

        email: String;
        is_admin: Boolean;
        is_user: Boolean;
        is_dummy: Boolean;
        is_superadmin: Boolean;
        is_authenticated_user: Boolean;
        token: String;
        tenant: UUID;
        environment: String;
    }
    entity roles {
        key roleName: String;
        assigned: Boolean;
    }
}