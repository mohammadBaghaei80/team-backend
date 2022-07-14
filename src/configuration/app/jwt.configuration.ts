import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";

export class JwtConfiguration implements JwtOptionsFactory{
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    const options:JwtModuleOptions=
      {
        secret:process.env.JWT_SECRET_KEY
      }
      return options
  }

}