import {Controller, Get, PlatformResponse, Req, Res} from "@tsed/common";

@Controller("/auth")
export class AuthController {
    @Get("/logout")
    get(@Req() req: Req, @Res() res: PlatformResponse) {
         req.logout();
         res.redirect(302, '/');
    }


    
}
