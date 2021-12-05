import { Component, OnInit, ɵɵngDeclareDirective } from '@angular/core';
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
  gia =''
  constructor(private service: NetworkserviceService) {
    this.role = localStorage.getItem('role')
    this.service.getquanlymay().subscribe(val => {
      // this.source.load(val)
      if (localStorage.getItem('role') == 'dailycap1') {
        const newArray = val.map(({ gia2, gia3, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray
        console.log(this.sanphams)
      }
      if (localStorage.getItem('role') == 'dailycap2') {
        const newArray = val.map(({ gia1, gia3, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray
        console.log(this.sanphams)
      }
      if (localStorage.getItem('role') == null) {
        const newArray = val.map(({ gia1, gia2, ...keepAttrs }) => keepAttrs)
        this.sanphams = newArray
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
    if(localStorage.getItem('role')=='dailycap1'){
      this.gia = item.gia1
    }
    if(localStorage.getItem('role')=='dailycap2'){
      this.gia = item.gia2
    }
    this.service.danhsachdonhangtemp(
      [
        item.loaimay, item.doimay, item.manhinh, item.chip, item.tanso, item.ram, item.ocung, item.nhom, this.gia, '0',
        localStorage.getItem('sodienthoai'),localStorage.getItem('hoten'),'',
        new Date(),item.masanpham,item.imei
      ]
    )
      .subscribe(data => {
alert("Sản phẩm đã được thêm vào giỏ hàng của bạn")
        console.log("POST Request is successful ", data);
      },
        error => {
          console.log("Error", error);

        })
  }
}