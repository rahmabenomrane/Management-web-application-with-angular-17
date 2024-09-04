import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenarioService {

  constructor(private http: HttpClient) { }
  api = environment.apiUrl 
  getScenarioList(nbPage: number, nbLines: number, scenario: any[]): Observable<any> {
    console.log("scenario.scenarioName ", scenario);
    return this.http.post<any>(this.api + "8685ca9de835ff8ec31494ecf4ff70dd", { query:  { paginate: [{ currentPage: nbPage, numberLine: nbLines }], scenarios: scenario }  });
  }
  getScenarioActionsListById(nbPage: number, nbLines: number, scenarioAction: any): Observable<any> {
    return this.http.post<any>(this.api + "8685ca9de835ff8ec31435ec9c9c35ca", { query:  { paginate: [{ currentPage: nbPage, numberLine: nbLines }], scenarioActions: [scenarioAction] }  });
  }
  saveScenario(scenario): Observable<any> {
    return this.http.post<any>(this.api+ "ff46f112b0116798c314e15229c8fff9", { query: {scenarios: [scenario] }});
  }
  deleteScenario(scenario): Observable<any> {
    return this.http.post<any>(this.api+ "ff46f112b0116798c314e152f4d502fa", { query: {scenarios: [scenario] }});
  }
  duplicateScenario(scenario): Observable<any> {
    return this.http.post<any>(this.api+ "d5d89f3555df5193c31485bcc8911950", { query: {scenarios: [scenario] }});
  }
}
