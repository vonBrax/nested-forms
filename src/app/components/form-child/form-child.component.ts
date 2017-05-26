import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


/*export class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}*/

/*export class Step {
  name: string;
  event: string;

  constructor(name?: string, event?: string) {
    this.name = new FormControl(name);
    this.event = new FormControl(event);
  }
}*/

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormChildComponent,
      multi: true
    }
  ]
})
export class FormChildComponent implements OnInit, ControlValueAccessor {

@Input() childGroup: FormGroup;
  /*myControl = new FormControl();
  myControl2 = new FormControl();

  options = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five'
  ];
  filteredOptions: Observable<string[]>;
  
  users = [
    new User('Mary'),
    new User('Shelley'),
    new User('Igor')
  ];
  filteredUsers: Observable<User[]>;*/

  constructor(private fb: FormBuilder ) {

    this.childGroup = fb.group({
      name: '',
      event: ''
    });
   }

   writeValue(value: any) {
    console.log('Child - Write Value');
    if(value) {
      this.childGroup.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => {} ) {
    console.log('Child - registerOnChange');
    this.childGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched() {}

   /*registerOnChange(fn) {
    console.log('Child - RegisterOnChange');
    this.propagateChange = fn;
  }

  propagateChange = (_: any) => {};*/

  /*createFormGroup(): void {
    this.childGroup = this.fb.group({
      name: new FormControl(),
      event: new FormControl()
    });
  }
*/
 /* setSteps(steps: Step[]): void {
    const stepFormGroup = steps.map(step => this.fb.group(step));
    const stepFormArray = this.fb.array(stepFormGroup);
    this.childForm.setControl('steps', stepFormArray);
  }*/


  

 /* registerOnChange(fn: (value: any) => void) {
    console.log('Child -Register on changes');
    this.childGroup.valueChanges.subscribe(fn);
  }*/

 /* registerOnChange(fn) {
    this.propagateChange = fn;
  }

  propagateChange = (_: any) => {};

  registerOnTouched() {}*/


/*  get name() {
    console.log('Child: get name()');
    return this.childGroup.get('name');
  }

  set name(value) {
    console.log('Child: set name()');
    this.childGroup.patchValue({name: value});
    this.propagateChange(this.childGroup);
  }

  get event() {
    console.log('Child: get event()');
    return this.childGroup.get('event');
  }

  set event(value) {
    console.log('Child: set event()');
    this.childGroup.patchValue({event: value});
    this.propagateChange(this.childGroup);
  }*/

  ngOnInit() {
  }

  /*filter(val: string): string[] {
    return this.options.filter(option => new RegExp(`${val}`, 'gi').test(option));
  }

  filterUsers(name: string): User[] {
    return this.users.filter(option => new RegExp(`^${name}`, 'gi').test(option.name));
  }

  displayFn(user: User): string {
    return user ? user.name : '';
  }*/

}
