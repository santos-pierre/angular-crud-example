import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/post.model";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit{
  post!: Post;
  form: FormGroup;
  isLoading: boolean = false;

  postID?: number;
  constructor(
    private readonly _postsService: PostsService,
    private readonly _activatedRouter: ActivatedRoute,
    private readonly _router: Router,
    private readonly _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      'title': [null, [Validators.required]],
      'body': [null, []],
    });
  }

  ngOnInit() {
    this.postID= this._activatedRouter.snapshot.params['id'];

    this.isLoading = true;

    this._postsService.getOne(this.postID!).subscribe({
      next: (post) => {
        this.post = post;
        // Mise à jour du formulaire avec les informations du post récupérer plus haut
        this.form.patchValue(post);
        this.isLoading = false;
      },
      error: (err) => {
        // Ici je fais une simple redirection, mais à vous de gérer les code status
        this._router.navigate(['/posts']);
      }
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this._postsService.update(this.postID!, this.form.value).subscribe({
        next: (newPost) => {
          // Redirection vers le nouveau post, si tout c'est bien passé
          this._router.navigate(['/posts', newPost.id]);
        },
        error: (err) => {
          // Pour set une erreur du formulaire on peur utiliser setError sur un control
          // this.form.get('title')?.setErrors({'requires': true, 'custom': true })
          console.log("Gestion de l'erreur s'il y en a une");
        }
      });
    }
  }

  /**
   * Méthode me permettan de savoir si input possède une erreur et si il à déjà été touché
   * @param myForm le formulaire en question
   * @param inputName l'input qu'on doit vérifier
   * @param validator le nom du validator à tester
   *
   */
  hasErrorAndTouched(myForm: FormGroup, inputName: string, validator: string) {
    return myForm.get(inputName)?.hasError(validator)
      && (myForm.get(inputName)?.touched || myForm.get(inputName)?.dirty);
  }
}
