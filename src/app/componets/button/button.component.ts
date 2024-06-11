import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() title: string = ''; // Truyền title qua prop Input
  @Output() buttonClick: EventEmitter<any> = new EventEmitter(); // Output event

  handleClick() {
    console.log('Button clicked!');
    // Đoạn mã xử lý sự kiện khác có thể được thêm ở đây
    this.buttonClick.emit(); // Kích hoạt sự kiện buttonClick
  }
}
