import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-detail',
  templateUrl: './smart-table-detail.component.html',
  styleUrls: ['./smart-table-detail.component.scss']
})
export class SmartTableDetailComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  data
  constructor(private route: ActivatedRoute, private service: NetworkserviceService, private router: Router) { }
  sanphams
  madonhangparam
  capnhatdanhsachdonhang
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params.id[0]); // { orderby: "price" }
        if (params.id[0] == 'D') {
          this.router.navigateByUrl('/')
        }
        this.service.getdanhsachdonhangtheomadonhang([params.id[0]]).subscribe(val => {
          this.sanphams = [...new Map(val.map(item => [item.madonhang, item])).values()]
          this.source.load(val)
          this.data = val
          this.madonhangparam = params.id[0]
          console.log(this.sanphams)
        });
      }
      );
  }


  settings = {
    actions: { columnTitle: '', position: 'right' },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark" (click)="onClick()"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },

    columns: {
      masanpham: {
        title: 'Mã Sản Phẩm',
        type: 'string',
        width: '300px'
      },
      loaimay: {
        title: 'Loại Máy',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          }
        }
        ,
        width: '200px'
      },
      doimay: {
        title: 'Đời Máy',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            ]
          }
        }
        ,
        width: '200px'
      },
      manhinh: {
        title: 'Màn Hình',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            ]
          }
        }
      },
      chip: {
        title: 'Chip',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            ]
          }
        },
      },
      tanso: {
        title: 'Tần số',
        type: 'string'
      },
      ram: {
        title: 'Ram',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            ]
          }
        },
      },
      ocung: {
        title: 'Ổ cứng',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
            ]
          }
        },
      },
      nhom: {
        title: 'Nhóm',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: 'A', title: 'A' },
              { value: 'B', title: 'B' },
              { value: 'C', title: 'C' },
              { value: 'D', title: 'D' },
            ]
          }
        },
      },
      imei: {
        title: 'IMEI',
        type: 'string'
      },
      gia: {
        title: 'Giá',
        type: 'string'
      },
      chitiet: {
        title: 'Chi Tiết',
        type: 'string'
      },
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };


  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có chắc muốn xóa không ????')) {
      this.service.deletedanhsachdonhangsanphamreal(
        [
          this.madonhangparam,
          event['data']['masanpham']
        ]
      )
        .subscribe(data => {

          console.log("POST Request is successful ", data);
        },
          error => {
            console.log("Error", error);

          })
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    console.log("Create Event In Console")
    console.log(event);
    if (!this.data.some(el => el.masanpham === (event['newData']['masanpham']))) {
      this.service.danhsachdonhang(
        [
          event['newData']['loaimay'],
          event['newData']['doimay'],
          event['newData']['manhinh'],
          event['newData']['chip'],
          event['newData']['tanso'],
          event['newData']['ram'],
          event['newData']['ocung'],
          event['newData']['nhom'],
          event['newData']['gia'],
          '',
          localStorage.getItem('sodienthoai'),
          localStorage.getItem('hoten'),
          'dangxuly',
          new Date(),
          event['newData']['masanpham'],
          this.sanphams.madonhang,
          event['newData']['imei']
        ]
      )
        .subscribe(data => {

          console.log("POST Request is successful ", data);
        },
          error => {
            console.log("Error", error);

          })
      event.confirm.resolve();
    }
    else {
      alert('Dữ liệu đã tồn tại');
      event.confirm.reject();
    }
  }
  onSaveConfirm(event) {
    if (window.confirm('Bạn có muốn thay đổi không?')) {
      this.service.deletedanhsachdonhangsanphamreal(
        [
          this.madonhangparam,
          event['data']['masanpham']
        ]
      )
        .subscribe(data => {

          console.log("POST Request is successful ", data);
          this.service.danhsachdonhang(
            [
              event['newData']['loaimay'],
              event['newData']['doimay'],
              event['newData']['manhinh'],
              event['newData']['chip'],
              event['newData']['tanso'],
              event['newData']['ram'],
              event['newData']['ocung'],
              event['newData']['nhom'],
              event['newData']['gia'],
              '',
              localStorage.getItem('sodienthoai'),
              localStorage.getItem('hoten'),
              'dangxuly',
              new Date(),
              event['newData']['masanpham'],
              this.madonhangparam,
              event['newData']['imei']
            ]
          )
            .subscribe(data => {

              console.log("POST Request is successful ", data);
            },
              error => {
                console.log("Error", error);

              })
        },
          error => {
            console.log("Error", error);

          })
    } else {
      event.confirm.reject();
    }
  }



  huy() {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng không ???')) {
      this.service.deletedanhsachdonhangreal(
        [
          this.madonhangparam,
        ]
      )
        .subscribe(data => {

          console.log("POST Request is successful ", data);
        },
          error => {
            console.log("Error", error);

          })
    }
  }

  dongy() {

    this.service.updatetrangthaidonhang(
      [
        'thanhcong',
        this.madonhangparam,
      ]
    )
      .subscribe(data => {
        alert("Đơn Hàng Đã Xử Lý Thành Công")
        this.service.getdanhsachdonhangtheomadonhang([this.madonhangparam]).subscribe(data => {
          alert("Đơn Hàng Đã Xử Lý Thành Công")
          data.forEach(element => {
            this.service.deletequanlymay([element.masanpham]).subscribe(val => { console.log("POST Request is successful ", val) })
          });
        })
        this.router.navigateByUrl('/smart-table-don-hang-da-xu-ly-thanh-cong')
        console.log("POST Request is successful ", data);
      },
        error => {
          console.log("Error", error);

        })


  }
}
