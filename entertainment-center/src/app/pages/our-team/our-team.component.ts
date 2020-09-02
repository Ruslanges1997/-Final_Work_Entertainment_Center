import { Component, OnInit } from '@angular/core';
import { IOurTeam } from '../../shared/interfaces/our-team.interface';
import { OurTeamService } from '../../shared/services/our-team.service';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {

  ourTeamArr: Array<IOurTeam> = [];

  constructor(
    private ourTeamService: OurTeamService
  ) { }

  ngOnInit(): void {
    this.getOurTem();
  }

  private getOurTem(): void {
    this.ourTeamService.getFireCloudOurTeam().subscribe(data => {
      this.ourTeamArr = data.map(document => {
        const data = document.payload.doc.data() as IOurTeam;
        const id = document.payload.doc.id;
        return { id, ...data }
      })
    })
  }


}
