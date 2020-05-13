import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postId: string;
  post;
  comentarios;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.postId = params.id;
        this.post = this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${this.postId}`);
        this.comentarios = this.http.get<any[]>(`https://jsonplaceholder.typicode.com/posts/${this.postId}/comments`);
      }
    })

  }

}