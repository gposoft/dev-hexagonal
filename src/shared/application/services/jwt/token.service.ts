import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { format } from "date-fns";
import { envConfig } from "../../../../system/config";

export type Token = {
  token: string;
  duration: number;
  expireInDate: string;
  expireInMs: number;
  tokenId?: string;
};

export type TokenData = {
  tokenId: string;
  id: string;
  username: string;
};

export class TokenService {
  private static secret: Secret = envConfig?.security.jwt_pass!;

  static create(payload: any, expiresInMinutes: number): Token {
    const expiresIn = `${expiresInMinutes}m`;
    const durationIn: number = expiresInMinutes * 60 * 1000;
    const duration = Date.now() + durationIn;
    const token = jwt.sign(payload, TokenService.secret, { expiresIn });

    const result: Token = {
      tokenId: payload.tokenId || '',
      token: token,
      duration: durationIn,
      expireInDate: format(new Date(duration), "dd/MM/yyyy hh:mm:ss"),
      expireInMs: duration,
    };
    return result;
  }

  static getDecode(token: string): TokenData | null {
    try {
      const decode = jwt.decode(token);
      if (typeof decode === "object") {
        const payload = decode as JwtPayload;
        const tokenId = payload.tokenId;
        const id = payload.id;
        const username = payload.username;
        return { tokenId, id, username };
      } else {
        console.log("El token no es válido");
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  static verify(token: string): { valid: boolean; message: string; expired: boolean } {
    try {
      jwt.verify(token, this.secret);
      return {
        valid: true,
        message: "Valid",
        expired: false,
      };
    } catch (error: any) {
      return {
        valid: false,
        message: error.message.includes("expired") ? "Token expired" : "Token invalid",
        expired: false,
      };
    }
  }
}
