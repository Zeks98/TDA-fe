import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TdaService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  uploadExcel(file: File): Observable<any> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.http.post<any>(`${this.baseUrl}/upload`, { excelFile: base64String }).subscribe(
          (response) => {
            observer.next(response);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
    });

  }
  
  getContentById(uploadExcel: string): Observable<any> {
    return this.http.get<Tda[]>(`${this.baseUrl}/${contentById}`);
  }

  getFiles(): Observable<any>{
    return this.http.get<TdaSingle[]>(`${this.baseUrl}/${files}`);
  }

}