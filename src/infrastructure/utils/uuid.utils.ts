import { v4, v5 } from 'uuid';

export class UuidUtils {
  public static getUuidFromFirebaseUid(uid: string, namespace: string): string {
    const uuid = v5(uid, namespace);
    return uuid;
  }

  public static generateToken(): string {
    const uuid = v4();
    return uuid;
  }
}
