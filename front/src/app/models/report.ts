import { ReportValue } from "./reportValue";

export interface Report {
  id: number;
  version: number;
  name: string;
  values: ReportValue[];
  authorId: number;
}