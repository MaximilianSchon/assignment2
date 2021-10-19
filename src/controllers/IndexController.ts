import { Prisma, Test, Test_Session, Therapy, Therapy_List, User } from ".prisma/client";
import {Controller, Get, Inject, PathParams, Req, Res, View} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import { response } from "express";
import path from "path";
import { AuthRoles } from "../decorators/AuthRoles";
import {UserService} from "../services/UserService";
import fs from "fs";
import { Forbidden } from "@tsed/exceptions";
import got from 'got';
import parser from "fast-xml-parser";

@Controller("/")
export class IndexController {

    @Inject()
    private userService : UserService;

    @Get('/')
    @View('login.ejs')
    get() {
        return {user: false}
    }

    @Authenticate("facebook")
    @Get("/patient")
    @View("patient.ejs")
    user(@Req()request : any) {

        const videos = [
            "https://www.youtube.com/embed/cRLB7WqX0fU",
            "https://www.youtube.com/embed/ckn9zybpYZ8",
            "https://www.youtube.com/embed/BNzIaABFAMc",
            "https://www.youtube.com/embed/Hu5KVfFnrh0",
            "https://www.youtube.com/embed/NAfQoviLFR8",
            "https://www.youtube.com/embed/KWVJBg6SCoY"

        ];

        return {
            user: JSON.parse(request.session.passport.user),
            videos: videos
        }
    }

    @Authenticate("twitter")
    @Get("/physician")
    @View("physician.ejs")
    async physician(@Req()request : any) {
        const session = JSON.parse(request.session.passport.user)
        const {user, patients} = await this.getUserWithPatients(session.userID);
        return {
            user,
            patients
        }
    }

    @Authenticate("github")
    @Get("/researcher")
    @View("researcher.ejs")
    async researcher(@Req()request : any) {
        const session = JSON.parse(request.session.passport.user)
        const {user, patients} = await this.getUserWithPatients(session.userID);
        const feed = await this.fetchRSSFeed("https://www.news-medical.net/tag/feed/Parkinsons-Disease.aspx")
        return {
            user,
            patients,
            feed
        }
    }
    
    @Get("/data/:data")
    @AuthRoles('researcher', 'physician')
    async data(
        @PathParams("data") data: string,
        @Req() request: any,
        @Res() response: Res
    ) {
        const session = JSON.parse(request.session.passport.user)
        const {patients} = await this.getUserWithPatients(session.userID)
        const files = patients
        //@ts-ignore checks permissions
        .reduce((acc: string[], p: UserWithTherapies[]) => [...acc, ...p.patient_therapies
        .reduce((acc: string[], th: TherapyWithTests) => [...acc, ...th.tests
        .reduce((acc: string[], t: TestWithSessions) => [...acc, ...t.test_sessions
        .reduce((acc: string[], ts: Test_Session) => [...acc, `${ts.dataURL}.csv`], [])], [])], [])], [])
        if (!files.includes(data)) {
            throw new Forbidden("You do not have access to that file")
        }
        const file = await fs.promises.readFile(path.join(__dirname, `../data/${data}`));
        return response.send(file)
    }

    async fetchRSSFeed(feed: string) {
        const buffer = await got(feed, {
            responseType: "buffer",
            resolveBodyOnly: true,
            timeout: 5000,
            retry: 5,
            
        });
        return parser.parse(buffer.toString(), {ignoreAttributes : false});
    }

    async getUserWithPatients(userID: number) {
        const user: any = await this
        .userService
        .findUnique({
            where: {
                userID: userID
            },
            include: {
                treater_therapies: {
                    include: {
                        patient: {
                            include: {
                                patient_therapies: {
                                    include: {
                                        tests: {
                                            include: {
                                                test_sessions: {
                                                    include: {
                                                        notes: {
                                                            include: {
                                                                user_med: true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        therapyList: {
                                            include: {
                                                medicine: true
                                            }
                                        },
                                    }
                                }

                            }
                        },
                    }
                }
            }
        });

        const patients = user.treater_therapies.reduce((acc: UserWithTherapies[], therapy: TherapyWithPatient) => {
            const index = acc.findIndex(p => p.userID === therapy.user_IDpatient);
            if (index === -1) {
                return [...acc, therapy.patient];
            } 
        }, [])
        return {user, patients}
    }
}

const therapyWithPatient = Prisma.validator<Prisma.TherapyArgs>()({
    include: { patient: true },
  })

type TherapyWithPatient = Prisma.TherapyGetPayload<typeof therapyWithPatient>


const userWithTherapies = Prisma.validator<Prisma.UserArgs>()({
    include: { patient_therapies: true },
  })

type UserWithTherapies = Prisma.UserGetPayload<typeof userWithTherapies>


const testWithSessions = Prisma.validator<Prisma.TestArgs>()({
    include: { test_sessions: true },
  })

type TestWithSessions = Prisma.TestGetPayload<typeof testWithSessions>

const therapyWithTests = Prisma.validator<Prisma.TherapyArgs>()({
    include: { tests: true },
  })

type TherapyWithTests = Prisma.TherapyGetPayload<typeof therapyWithTests>
