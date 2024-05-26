import bcrypt from "bcryptjs";
import { publicEncrypt, privateDecrypt } from "crypto";

export class EncryptedService {
  static hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static verifyPassword(providedPassword: string, hashedPassword: string): boolean {
    const isCorrect = bcrypt.compareSync(providedPassword, hashedPassword);
    return isCorrect;
  }

  static encrypt(text: string, publicKeyStr: string): string {
    const buffer = Buffer.from(text, "utf8");
    const encrypted = publicEncrypt(publicKeyStr, buffer);
    return encrypted.toString("base64");
  }

  static encryptObject<T>(object: T, publicKeyStr: string): string {
    const jsonStr = JSON.stringify(object);
    return EncryptedService.encrypt(jsonStr, publicKeyStr);
  }

  static decrypt(encryptedText: string, privateKeyStr: string): string {
    const buffer = Buffer.from(encryptedText, "base64");
    const decrypted = privateDecrypt(privateKeyStr, buffer);
    return decrypted.toString("utf8");
  }

  static decryptObject<T>(object: string, privateKeyStr: string): T {
    const decrypted = EncryptedService.decrypt(object, privateKeyStr);
    return JSON.parse(decrypted);
  }
}
