import { prisma, Role } from '@prisma/client';
import {Configuration, Constant, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import {config, rootDir} from "./config";
import passport from "passport";
import { Property } from "@tsed/schema";
import session from 'express-session';
import { Env } from "@tsed/core";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { Prisma, Session } from ".prisma/client";
import { PrismaService } from './services/PrismaService';

class CustomUserInfoModel {
  @Property()
  userID: number;
  
  @Property()
  email: string;

  @Property()
  username: string;

  @Property()
  role: Role 
}

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  port:  process.env.PORT || 8083, // CHANGE
  componentsScan: [
    `${rootDir}/protocols/*.ts` // scan protocols directory
  ],
  passport: {
    userInfoModel: CustomUserInfoModel
    /**
     * Set a custom user info model. By default Ts.ED use UserInfo. Set false to disable Ts.ED json-mapper.
     */
    // userInfoModel: CustomUserInfoModel
  },
  mount: {
    "/": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  statics: {
    "/": [
      {
        root: `${rootDir}/public`,
        // ... statics options
      }
    ]
  },
  views: {
    root: `${rootDir}/views`,
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  @Constant('env')
  env: Env; 
  
  @Inject()
  prisma: PrismaService;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(session({
        cookie: {
         maxAge: 7 * 24 * 60 * 60 * 1000 // ms
        },
        secret: 'a santa at nasa',
        resave: true,
        saveUninitialized: true,
        store: new PrismaSessionStore(
          this.prisma,
          {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
          }
        )
      }))
      .use(passport.initialize())
      .use(passport.session());
  }
}
