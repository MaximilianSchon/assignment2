import {Inject, Injectable} from "@tsed/di";
import {Prisma, Role} from "@prisma/client";
import {PrismaService} from "./PrismaService";

@Injectable()
export class RoleService {
  @Inject()
  prisma: PrismaService;

  async findUnique(args: Prisma.RoleFindUniqueArgs): Promise<Role | null> {
    return this.prisma.role.findUnique(args);
  }

  async findMany(args?: Prisma.RoleFindManyArgs): Promise<Role[]> {
    return this.prisma.role.findMany(args);
  }

  async create(args: Prisma.RoleCreateArgs): Promise<Role> {
    return this.prisma.role.create(args);
  }

  async update(args: Prisma.RoleUpdateArgs): Promise<Role> {
    return this.prisma.role.update(args);
  }

  async delete(args: Prisma.RoleDeleteArgs): Promise<Role> {
    return this.prisma.role.delete(args);
  }
}