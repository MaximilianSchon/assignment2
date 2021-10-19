import {Controller, Get} from "@tsed/common";
import passport from "passport";

@Controller("/auth/twitter")
export class TwitterAuthController {
    @Get("/callback")
    get() {
      return passport.authenticate('twitter', {
          successRedirect: "/physician",
          failureRedirect: "/"
      })
    }

    @Get("/")
    initialize() {
        return passport.authenticate('twitter')
    }

}
