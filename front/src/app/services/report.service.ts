import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Report} from "../models/report"
import { ReportValue } from "../models/reportValue";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ReportService {
  private readonly REPORTS_URL = environment.gatewayUrl + "/reports";

  constructor(private http: HttpClient, private router: Router) {
  }

  public getReports() {
    return this.http.get<Report[]>(this.REPORTS_URL + "/getReports");
  }
  
    public getReportById(id: number) {
      return this.http.get<Report>(this.REPORTS_URL + "/getReportById/" + id);
    }
  
    public createReport(name: string, values: ReportValue[]) {
      return this.http.post<Report>(this.REPORTS_URL + "/createReport", { name: name, values: values}, httpOptions);
    }
  
    deleteReport(id: number) {
      return this.http.delete(this.REPORTS_URL + "/deleteReport/" + id);
    }
  
    updateReport(id: number, name: string, values: ReportValue[]) {
      return this.http.put<Report>(this.REPORTS_URL + "/updateReport", {
        id: id,
        name: name,
        values: values
      }, httpOptions);
    }
}
