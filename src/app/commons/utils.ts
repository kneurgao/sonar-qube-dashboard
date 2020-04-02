export class Utils {
  static getNameFromEmail(email: string) {
    const nameArray = email.split('@')[0].split('\.');
    return nameArray[0].charAt(0).toUpperCase() + nameArray[0].substring(1);
  }
}
