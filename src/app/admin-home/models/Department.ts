import { UserModel } from '../../setting/models/user';

export class DeparmentModel {
  id!: string;
  departmentName!: string;
  users!: UserModel[];
}
