import {Context, Middleware, Req} from "@tsed/common";
import {Forbidden} from "@tsed/exceptions";

@Middleware()
export class AuthRolesMiddleware {
  use(@Req("user") user: any, @Context() ctx: Context) {
    if (user) {
      const roles = ctx.endpoint.get(AuthRolesMiddleware);

      if (!roles.includes(user.role.name)) {
        throw new Forbidden("Insufficient role");
      }
    }
  }
}
