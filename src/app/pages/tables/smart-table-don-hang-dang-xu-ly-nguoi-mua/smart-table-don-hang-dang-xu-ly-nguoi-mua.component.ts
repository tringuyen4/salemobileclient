import { Component, OnInit } from '@angular/core';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-don-hang-dang-xu-ly-nguoi-mua',
  templateUrl: './smart-table-don-hang-dang-xu-ly-nguoi-mua.component.html',
  styleUrls: ['./smart-table-don-hang-dang-xu-ly-nguoi-mua.component.scss']
})
export class SmartTableDonHangDangXuLyNguoiMuaComponent implements OnInit {

  sanphams = []
  constructor(private service: NetworkserviceService) {
    this.service.getdanhsachdonhangtheonguoimuareal([localStorage.getItem('sodienthoai')]).subscribe(val => {
  
      this.sanphams = [...new Map(val.map(item => [item.madonhang, item])).values()]
    });
  
  }

  ngOnInit(): void {
  }

}
