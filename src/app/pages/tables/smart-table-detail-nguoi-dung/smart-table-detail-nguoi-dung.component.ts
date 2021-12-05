import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-detail-nguoi-dung',
  templateUrl: './smart-table-detail-nguoi-dung.component.html',
  styleUrls: ['./smart-table-detail-nguoi-dung.component.scss']
})
export class SmartTableDetailNguoiDungComponent implements OnInit {

  data
  constructor(private route: ActivatedRoute, private service: NetworkserviceService, private router:Router) { }
  sanphams
  madonhangparam
  capnhatdanhsachdonhang
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params.id[0]); // { orderby: "price" }
        if(params.id[0]=='D'){
          this.router.navigateByUrl('/')
        }
        this.service.getdanhsachdonhangtheomadonhang([params.id[0]]).subscribe(val => {
          this.sanphams = [...new Map(val.map(item => [item.madonhang, item])).values()]

          this.data = val
          this.madonhangparam = params.id[0]
          console.log(this.sanphams)
        });
      }
      );
  }

}
