import { ChangeDetectionStrategy, Component } from '@angular/core'
import { type FormArray, type FormControl, NonNullableFormBuilder, Validators } from '@angular/forms'

import { dateValidator } from 'src/app/common/validators/date.validator'

@Component({
  selector: 'yt-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddItemFormComponent {
  public maxDate = new Date()
  public itemForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    imageLink: ['', [Validators.required]],
    videoLink: ['', [Validators.required]],
    creationDate: [this.maxDate, [Validators.required, dateValidator]],
    tags: this.fb.array([this.fb.control('', [Validators.required, Validators.minLength(3)])], Validators.required),
  })

  constructor(private fb: NonNullableFormBuilder) {}

  public onSubmit(): void {
    this.onReset()
  }

  public onReset(): void {
    this.itemForm.reset()
    this.tagsControl.clear()
    this.addTagControl()
    this.itemForm.markAsUntouched()
  }

  public trackByIndex(index: number): number {
    return index
  }

  public removeTagControl(index: number): void {
    this.tagsControl.removeAt(index)
  }

  public addTagControl(): void {
    this.tagsControl.push(this.fb.control('', [Validators.required, Validators.minLength(3)]))
  }

  public get titleControl(): FormControl<string> {
    return this.itemForm.controls.title
  }

  public get descriptionControl(): FormControl<string> {
    return this.itemForm.controls.description
  }

  public get imageLinkControl(): FormControl<string> {
    return this.itemForm.controls.imageLink
  }

  public get videoLinkControl(): FormControl<string> {
    return this.itemForm.controls.videoLink
  }

  public get creationDateControl(): FormControl<Date> {
    return this.itemForm.controls.creationDate
  }

  public get tagsControl(): FormArray<FormControl<string>> {
    return this.itemForm.controls.tags
  }
}
