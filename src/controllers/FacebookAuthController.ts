import {Controller, Get} from "@tsed/common";
import passport from "passport";

@Controller("/auth/facebook")
export class FacebookAuthController {
    @Get("/callback")
    get() {
      return passport.authenticate('facebook', {
          successRedirect: "/patient",
          failureRedirect: "/"
      })
    }

    @Get("/")
    initialize() {
        return passport.authenticate('facebook')
    }

}
