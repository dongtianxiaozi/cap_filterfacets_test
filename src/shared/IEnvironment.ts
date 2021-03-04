import { Request } from "@sap/cds/apis/services";

export interface IEnvironment {
  __UUID: string;
  __REQUEST?: Request;
}
