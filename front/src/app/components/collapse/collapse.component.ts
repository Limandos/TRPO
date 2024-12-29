import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  standalone: false,
})
export class CollapseComponent {
    @Input() header: string = '';

    collapsed = false;
  
    toggle() {
      this.collapsed = !this.collapsed;
    }
  
    expand() {
      this.collapsed = false;
    }
  
    collapse() {
      this.collapsed = true;
    }
}