
export class DepartmentPayloadModel {
  departmentModel!: Dep;
  usersIds: string[] = [];
}

export class Dep{
  departmentName!: string;
}