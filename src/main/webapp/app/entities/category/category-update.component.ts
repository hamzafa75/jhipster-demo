import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory, Category } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'jhi-category-update',
  templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
  category: ICategory;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected categoryService: CategoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
      this.category = category;
    });
  }

  updateForm(category: ICategory) {
    this.editForm.patchValue({
      id: category.id,
      name: category.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }

  private createFromForm(): ICategory {
    const entity = {
      ...new Category(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
    result.subscribe((res: HttpResponse<ICategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
