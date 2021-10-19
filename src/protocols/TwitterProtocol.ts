import {Inject, $log, Req} from "@tsed/common";
import {Args, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {Strategy, IStrategyOption} from "passport-twitter";
import { RoleService } from "../services/RoleService";
import { UserService } from "../services/UserService";

@Protocol<IStrategyOption>({
  name: "twitter",
  useStrategy: Strategy,
  settings: {
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "https://intricate-school-assignment-2.herokuapp.com/auth/twitter/callback",
  }
})
export class TwitterProtocol implements OnVerify, OnInstall {
  @Inject()
  private userService: UserService;


  async $onVerify(@Req() req: Req, @Args() [accessToken, refreshToken, profile]: any) {
    profile.refreshToken = refreshToken;
    const user = await this.userService.findUnique({where: {userID: 1}, include: {role: true}});
    return user ? user : false;
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}