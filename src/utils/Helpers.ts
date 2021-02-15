export class Helpers {
  static checkNullOrUndefined(value: any): boolean {
    if (value === null || typeof value === 'undefined') {
      return true;
    }
    return false;
  }
}
