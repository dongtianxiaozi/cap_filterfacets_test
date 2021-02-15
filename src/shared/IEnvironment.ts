import { Request } from "express";

export interface IEnvironment {
  __UUID: string;
  __REQUEST: Request
}
