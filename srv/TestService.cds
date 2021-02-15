using {com.seidor.sfc.md as model, } from '../db/data-model';

service TestService @(requires : ['user']) {
    action hello2(to : String) returns String;
    function hello(to : String) returns String;
    entity Person as projection on model.Person
}
