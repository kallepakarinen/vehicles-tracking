import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ToolbarOptions} from './toolbar-options';
import {ToolbarService} from './toolbar.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // @Output() MenuClick: EventEmitter<any>;
  options: ToolbarOptions;

  constructor(private location: Location, private toolbar: ToolbarService, private route: Router) {
    //this.MenuClick = new EventEmitter<any>();
  }

  ngOnInit() {
    this.toolbar.getToolbarOptions().subscribe((options: ToolbarOptions) => {
      this.options = options;
    });
  }

  /* onMenuClick() {
     this.MenuClick.emit();
   }*/
  infoPage() {
    alert('toimii');
    // this.router.navigate(['/info']);
  }

  onNavigateBack() {
    this.location.back();
  }

}
