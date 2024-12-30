import { ReportValue } from "./reportValue";

export interface Report {
  id: number;
  version: number;
  name: string;
  chapter: string;
  values: ReportValue[];
}