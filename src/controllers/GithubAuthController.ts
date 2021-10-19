import {Controller, Get} from "@tsed/common";
import passport from "passport";

@Controller("/auth/github")
export class GithubAuthController {
    @Get("/callback")
    get() {
      return passport.authenticate('github', {
          successRedirect: "/researcher",
          failureRedirect: "/"
      })
    }

    @Get("/")
    initialize() {
        return passport.authenticate('github',  { scope: [ 'user:email' ] })
    }

}
