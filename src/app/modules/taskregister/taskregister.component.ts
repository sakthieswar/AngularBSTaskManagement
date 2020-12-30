import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { first } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-taskregister',
  templateUrl: './taskregister.component.html',
  styleUrls: ['./taskregister.component.css']
})
export class TaskregisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null],
      attachment: [null],
      priority: [null],
      startdate: [null],
      enddate: [null],
      status: [null]
    });
  }
  get r() { return this.registerForm.controls; }
  onSave() {
    this.taskService.register(this.r.name.value, this.r.description.value, this.r.attachment.value, this.r.priority.value, this.r.startdate.value, this.r.enddate.value, '1')
      .pipe(first())
      .subscribe(
        data => {
          //alert('test');
          this.hideModals();
          this.router.navigate(['/admin']);
          //console.log(data);
          //this.loading = false;
          //this.hideModal();
          //this.alertService.success("Successfully login");
          //alert(data);
          //  this.router.navigate([this.returnUrl]);
        },
        error => {
          alert(error);
          //this.alertService.error(error);
          //this.loading = false;
        });
  }

  hideModals(): void {
    document.getElementById('taskModal').click();
  }

}
