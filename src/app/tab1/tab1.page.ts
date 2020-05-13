import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab1Page implements OnInit {

  noticias;
  noticiasOriginal = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.noticias = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map(noticias => {
        this.noticiasOriginal = noticias;
        noticias.map(noticia => {
          // Gerando um numero aleatório para as curtidas
          noticia.curtidasQnt = Math.floor(Math.random() * 1000);
          // Obtendo a quantidade de comentários
          this.http.get<Comentario[]>(`https://jsonplaceholder.typicode.com/posts/${noticia.id}/comments`).subscribe(comentarios => {
            noticia.comentariosQnt = comentarios.length;
          });
        });
        return noticias;
      }));
  }

  search(item) {
    const key = item.detail.value;
    const noticiasFiltradas = this.noticiasOriginal.filter(noticia => {
      if (noticia.title.toLowerCase().includes(key)) {
        return noticia;
      }
    })
    const obs = new Observable((observer) => {
      observer.next(noticiasFiltradas)
      observer.complete()
    })
    this.noticias = obs;
  }
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comentariosQnt: number;
  curtidasQnt: number;
}

interface Comentario {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
