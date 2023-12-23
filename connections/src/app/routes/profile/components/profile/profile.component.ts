import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NonNullableFormBuilder, Validators } from '@angular/forms'

import { ProfileFacade } from '../../profile-store/services/profile-facade.service'
import { nameValidator } from 'src/app/common/validators/name.validator'

@Component({
  selector: 'cn-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  public profile$ = this.profileFacade.profile$
  public isLoading$ = this.profileFacade.isLoading$
  public error$ = this.profileFacade.error$
  public isEditing = false

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40), nameValidator]],
  })

  constructor(
    private fb: NonNullableFormBuilder,
    private profileFacade: ProfileFacade,
  ) {
    profileFacade.getProfile()
  }

  public edit(name: string): void {
    this.form.patchValue({ name }, { emitEvent: false })
    this.isEditing = true
  }

  public cancelEdit(): void {
    this.isEditing = false
  }

  public changeName(): void {
    if (this.form.valid) {
      this.profileFacade.changeName(this.form.getRawValue().name)
      this.cancelEdit()
    }
  }
}
