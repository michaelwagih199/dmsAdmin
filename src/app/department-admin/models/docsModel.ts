import { CodePlacesModel } from "src/app/setting/models/docPlaces";
import { DocTypeModel } from "./docTypeModel";

export class DocsModel {
    id!:           string;
    docCode!:      string;
    docTitle!:     string;
    docOwner!:     string;
    fileName!:     string;
    parentId!:     string;
    comment!:     string;
    docsPlaces!: CodePlacesModel;
    docsType!:   DocTypeModel;
    departmentId!: string;
    isArchived!:   boolean;
    createdDate!:  string;
    fileExtensionType!:string;
}


