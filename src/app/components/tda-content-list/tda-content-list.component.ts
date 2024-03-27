import { Component, Input, OnInit } from '@angular/core';
import { TdaService } from '../../services/tda/tda.service';

@Component({
  selector: 'app-tda-content-list',
  templateUrl: './tda-content-list.component.html',
  styleUrl: './tda-content-list.component.css'
})
export class TdaContentListComponent implements OnInit {
  people: any[] = [];
  @Input() selectedFile: string | null = null;


  constructor(private tdaService: TdaService) { }

  ngOnInit(): void {
    this.tdaService.getContentById(this.selectedFile!, 'firstName', 1, 10).subscribe(result => {
      this.people = result.data;
    });
  }
}
