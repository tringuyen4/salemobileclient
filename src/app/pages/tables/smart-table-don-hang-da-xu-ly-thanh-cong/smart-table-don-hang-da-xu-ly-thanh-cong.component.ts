import { Component, OnInit } from '@angular/core';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-don-hang-da-xu-ly-thanh-cong',
  templateUrl: './smart-table-don-hang-da-xu-ly-thanh-cong.component.html',
  styleUrls: ['./smart-table-don-hang-da-xu-ly-thanh-cong.component.scss']
})
export class SmartTableDonHangDaXuLyThanhCongComponent implements OnInit {
  show = false
    sanphams = []
    sanphamsdangxuly
    chitietdonhang
    constructor(private service: NetworkserviceService) {
      this.service.getdanhsachdonhang().subscribe(val => {
    
        this.sanphams = [...new Map(val.map(item => [item.madonhang, item])).values()]
        this.sanphamsdangxuly = this.sanphams.filter(val=>val.trangthaidonhang == 'thanhcong')
      });
    
    }
  
    ngOnInit(): void {
    }
  
   
  
    click(sanpham){
      console.log('aaaa',sanpham)
      this.service.getdanhsachdonhangtheomadonhang([sanpham.madonhang]).subscribe(val => {
    
        this.chitietdonhang = val
        this.show=true
      });
    }
  }