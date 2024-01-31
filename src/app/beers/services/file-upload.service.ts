import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl= 'https://photoshare-gyao.onrender.com';
  // private baseUrl = 'http://localhost:8000';
  fileName = '';

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    this.fileName = file.name;

    const req = new HttpRequest('POST', `${this.baseUrl}/image`, formData);

    return this.http.request(req);
  }

  getFile(filename: String | any): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/image/${filename}`, { responseType: 'blob' });
  }

}
