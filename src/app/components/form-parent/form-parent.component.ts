import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Funnel, Step } from '../../data-model';

@Component({
  selector: 'app-form-parent',
  templateUrl: './form-parent.component.html',
  styleUrls: ['./form-parent.component.css']
})
export class FormParentComponent implements OnInit, OnChanges {
 funnelForm: FormGroup;
 @Input() funnel: Funnel;

  stepChangeLog = [];

  constructor( private fb: FormBuilder ) {
    this.funnel = this.funnel || new Funnel();
    this.createForm();
    this.funnel.steps.forEach(() => this.addStep());
    //this.addStep();
    //this.logStepChanges();
  }

  ngOnInit() {
    console.log('Parent - onInit()');
   }

  createForm(): void {
    console.log('Parent - createForm()');
    this.funnelForm = this.fb.group({
      funnelName: this.fb.control(''),
      steps: this.fb.array([])
    });
  }

  ngOnChanges() {
    console.log('Parent - ngOnChanges()');
    this.funnelForm.reset({
      funnelName: this.funnel.name,
      steps: this.funnel.steps
    });
    //this.setSteps(this.funnel.steps); //TODO: Check if it makes sense!*/
  }

  get steps(): FormArray {
    return this.funnelForm.get('steps') as FormArray;
  }

  setSteps(steps: Step[]): void {
    console.log('Parent: setSteps()');
    const stepFormGroup = steps.map(step => this.fb.group(step));
    const stepFormArray = this.fb.array(stepFormGroup);
    this.funnelForm.setControl('steps', stepFormArray);
  }

  addStep(): void {
   this.steps.push( this.fb.control({name: '', event: ''}) );
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
    this.funnel.steps.splice(index,1);
  }

  removeAllSteps(): void {
    for(let i = 0; i < this.steps.length; i++ ) {
      this.steps.removeAt(i);
    }
  }

  onSubmit(): void {
    console.log('Parent: onSubmit()');
    this.funnel = this.prepareSaveFunnel();
    console.log(this.funnel);
    //this.funnelService.updateFunnel(this.funnel).subscribe(/*Error Handling in here*/);
    this.ngOnChanges();
  }

  // TODO's: create a Funnel class and set return value type
  // of the below function to Funnel
  prepareSaveFunnel(): Funnel {
    const formModel = this.funnelForm.value;

    // Deep copy of form model steps
    const stepsDeepCopy: Step[] = formModel.steps.map(
      (steps: Step) => Object.assign({}, steps)
    );

    // Return new "Funnel" object containing a combination of original funnel value(s)
    // and deep copies of changed form model values.
    // TODO: set const tipe to be "Funnel"
    const saveFunnel: Funnel = {
      //_id: this.funnel.id,
      name: formModel.funnelName as string,
      steps: stepsDeepCopy 
    };
    return saveFunnel;
  }

  revert(): void {
    console.log('Parent: revert()');
    this.ngOnChanges();
  }

  logStepChanges() {
    const stepControl = this.funnelForm.get('steps');
    stepControl.valueChanges.forEach( val => this.stepChangeLog = val );
  }

}