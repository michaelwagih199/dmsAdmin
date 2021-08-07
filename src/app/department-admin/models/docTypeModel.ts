import { DeparmentModel } from '../../admin-home/models/Department';

export class DocTypeModel {
    id!:          string;
    type!:        string;
    department!:  DeparmentModel;
    isArchived!:  boolean;
    createdDate!: string;
}

