import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  form: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private  readonly _postsService: PostsService,
    private readonly _router: Router,
  ) {
    this.form = this._fb.group({
      'title': [null, [Validators.required]],
      'body': [null],
    });
  }

  onSubmit() {
    // Envoye du formulaire si il est valide
    if (this.form.valid) {
      this._postsService.create(this.form.value).subscribe({
        next: (newPost) => {
          // Redirection vers le nouveau post, si tout c'est bien passé
          this._router.navigate(['/posts', newPost.id]);
        },
        error: (err) => {
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
