import {Inject, Injectable} from "@tsed/di";
import {Prisma, User} from "@prisma/client";
import {PrismaService} from "./PrismaService";

@Injectable()
export class UserService {
  @Inject()
  prisma: PrismaService;

  async findUnique(args: Prisma.UserFindUniqueArgs): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }

  async findMany(args?: Prisma.UserFindManyArgs): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }

  async create(args: Prisma.UserCreateArgs): Promise<User> {
    return this.prisma.user.create(args);
  }

  async update(args: Prisma.UserUpdateArgs): Promise<User> {
    return this.prisma.user.update(args);
  }

  async delete(args: Prisma.UserDeleteArgs): Promise<User> {
    return this.prisma.user.delete(args);
  }
}