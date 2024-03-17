import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TdaSingle } from '../../models/tda-single';
import { TdaFilesComponent } from '../../components/tda-files/tda-files.component';
import { TdaContentListComponent } from '../../components/tda-content-list/tda-content-list.component';
import { Tda } from '../../models/tda';


@Injectable({
  providedIn: 'root'
})
export class TdaService {

  private baseUrl = 'http://localhost:8080';
  private filesUrl = 'files';
  private filteredContentUrl = 'filter'


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

  getContentById(id: string, searchBy: string): Observable<any> {
    return this.http.get<TdaContentListComponent[]>(`${this.baseUrl}/${this.filesUrl}/${id}/${searchBy}`);
  }

  getFiles(): Observable<any> {
    return this.http.get<TdaSingle[]>(`${this.baseUrl}/${this.filesUrl}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getFilteredContent(fileId: number, searchTerm: string, searchBy: string): Observable<any> {
    return this.http.get<Tda[]>(`${this.baseUrl}/${this.filteredContentUrl}/${fileId}/${searchTerm.length < 1 ? '!' : searchTerm}/${searchBy}`);
  }

  updateRow(id: number, user: Tda): Observable<Tda> {
    return this.http.put<Tda>(`${this.baseUrl}/${id}`, user);
  }

  deleteRow(id: number) : Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}