import { Component, OnInit, ╔Á╔ÁngDeclareDirective } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-san-pham',
  templateUrl: './smart-table-san-pham.component.html',
  styleUrls: ['./smart-table-san-pham.component.scss']
})
export class SmartTableSanPhamComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  datachip = []
  datadoimay = []
  dataloaimay = []
  datamanhinh = []
  dataram = []
  dataocung = []
  sanphams = []
  role = ''
  gia = ''
  danhsachdonhangtam = []
  constructor(private service: NetworkserviceService) {
    this.role = localStorage.getItem('role')
    this.service.getquanlymay().subscribe(val => {
      // this.source.load(val)
      if (localStorage.getItem('role') == 'dailycap1') {
        const newArray = val.map(({ gia2, gia3, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray.filter(val=>val.trangthai == '')
        console.log(this.sanphams)
      }
      if (localStorage.getItem('role') == 'dailycap2') {
        const newArray = val.map(({ gia1, gia3, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray.filter(val=>val.trangthai == '')
        console.log(this.sanphams)
      }
      if (localStorage.getItem('role') == null) {
        const newArray = val.map(({ gia1, gia2, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray.filter(val=>val.trangthai == '')
        console.log(this.sanphams)
      }
      if (localStorage.getItem('role') == 'admin') {

        this.sanphams = val
        console.log(this.sanphams)
      }
    });

  }




  ngOnInit(): void {

  }





  click(item) {

    if (localStorage.getItem('role') == 'dailycap1') {
      this.gia = item.gia1
    }
    if (localStorage.getItem('role') == 'dailycap2') {
      this.gia = item.gia2
    }
    if (!this.danhsachdonhangtam.includes(item.masanpham)) {
      this.danhsachdonhangtam.push(item.masanpham)
      this.service.danhsachdonhangtemp(
        [
          item.loaimay, item.doimay, item.manhinh, item.chip, item.tanso, item.ram, item.ocung, item.nhom, this.gia, '0',
          localStorage.getItem('sodienthoai'), localStorage.getItem('hoten'), '',
          new Date(), item.masanpham, item.imei
        ]
      )
        .subscribe(data => {
          alert("Sß║ún phß║ęm ─Ĺ├ú ─ĹĂ░ß╗úc th├¬m v├áo giß╗Ć h├áng cß╗ža bß║ín")
          console.log("POST Request is successful ", data);
        },
          error => {
            console.log("Error", error);

          })
    }
    else {
      alert("Sß║ún phß║ęm vß╗źa rß╗ôi ─Ĺ├ú ─ĹĂ░ß╗úc chß╗Źn")
    }
  }

}