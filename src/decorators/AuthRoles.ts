import {UseBefore} from "@tsed/common";
import {useDecorators, StoreSet} from "@tsed/core";
import { Forbidden } from "@tsed/exceptions";
import { Returns } from "@tsed/schema";
import { AuthRolesMiddleware } from "../middlewares/AcceptRolesMiddleware";

export function AuthRoles(...roles: string[]) {
  return useDecorators(
    UseBefore(AuthRolesMiddleware),
    StoreSet(AuthRolesMiddleware, roles),
    Returns(403, Forbidden).Description("Forbidden")
  );
}