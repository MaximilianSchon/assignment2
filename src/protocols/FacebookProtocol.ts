import {Inject, $log, Req} from "@tsed/common";
import {Args, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, StrategyOption} from "passport-facebook";
import { RoleService } from "../services/RoleService";
import { UserService } from "../services/UserService";

@Protocol<StrategyOption>({
  name: "facebook",
  useStrategy: Strategy,
  settings: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "https://intricate-school-assignment-2.herokuapp.com/auth/facebook/callback",
    profileFields: ["id", "emails", "name"]
  }
})
export class FacebookProtocol implements OnVerify, OnInstall {
  @Inject()
  private userService: UserService;

  async $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
    profile.refreshToken = refreshToken;
    const user = await this.userService.findUnique({where: {userID: Math.random() > 0.5 ? 3 : 4}, include: {role: true}});
    return user ? user : false;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}