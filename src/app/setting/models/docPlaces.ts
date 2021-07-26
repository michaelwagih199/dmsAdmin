import { DeparmentModel } from "src/app/admin-home/models/Department";

export class CodePlacesModel {
    id!:          string;
    codePlace!:   string;
    department!:  DeparmentModel;
    isArchived!:  boolean;
    createdDate!: string;
}

