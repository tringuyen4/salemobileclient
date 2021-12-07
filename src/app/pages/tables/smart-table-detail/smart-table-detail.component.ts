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
  masanphammoi = ""
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
          this.router.navigateByUrl('/pages/tables/smart-table-don-hang-dang-xu-ly-admin')
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
    actions: { columnTitle: '', position: 'right', edit: false, add: false },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark" (click)="onClick()"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmCreate: true,
    // },

    columns: {

      masanpham: {
        title: 'Mã Sản Phẩm',
        type: 'string',
        width: '300px',
        filter: false,
      },
      loaimay: {
        title: 'Loại Máy',
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
        title: 'Tần số',
        type: 'string'
      },
      ram: {
        filter: false,
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
        filter: false,
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
        filter: false,
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
        filter: false,
        title: 'IMEI',
        type: 'string'
      },
      gia: {
        filter: false,
        title: 'Giá',
        type: 'string'
      },
      chitiet: {
        filter: false,
        title: 'Chi Tiết',
        type: 'string'
      },
    },
    // edit:false,
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    //   confirmSave: true,
    // },
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
  // onSaveConfirm(event) {
  //   if (window.confirm('Bạn có muốn thay đổi không?')) {
  //     this.service.deletedanhsachdonhangsanphamreal(
  //       [
  //         this.madonhangparam,
  //         event['data']['masanpham']
  //       ]
  //     )
  //       .subscribe(data => {

  //         console.log("POST Request is successful ", data);
  //         this.service.danhsachdonhang(
  //           [
  //             event['newData']['loaimay'],
  //             event['newData']['doimay'],
  //             event['newData']['manhinh'],
  //             event['newData']['chip'],
  //             event['newData']['tanso'],
  //             event['newData']['ram'],
  //             event['newData']['ocung'],
  //             event['newData']['nhom'],
  //             event['newData']['gia'],
  //             '',
  //             localStorage.getItem('sodienthoai'),
  //             localStorage.getItem('hoten'),
  //             'dangxuly',
  //             new Date(),
  //             event['newData']['masanpham'],
  //             this.madonhangparam,
  //             event['newData']['imei']
  //           ]
  //         )
  //           .subscribe(data => {

  //             console.log("POST Request is successful ", data);
  //           },
  //             error => {
  //               console.log("Error", error);

  //             })
  //       },
  //         error => {
  //           console.log("Error", error);

  //         })
  //   } else {
  //     event.confirm.reject();
  //   }
  // }



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
    let daban = false
    this.service.getquanlymay().subscribe(data => {
      const arraySanpham = data.filter(data => data.trangthai != '').map(data=>data.masanpham)
      console.log('test', arraySanpham)
      this.service.getdanhsachdonhangtheomadonhang([this.madonhangparam]).subscribe(val => {
        const sanpham = val
        console.log('test1', val)
        for (let i = 0; i < sanpham.length; i++) {
          console.log('testmasanpham',sanpham[i].masanpham,arraySanpham)
          if (arraySanpham.includes(sanpham[i].masanpham)) {
            daban = true
            alert('Sản phẩm ' + sanpham[i].masanpham + ' đã bán. Vui lòng thay thế bằng sản phẩm khác')
          }
        }
        if (daban != true) {
          this.service.updatetrangthaidonhang(
            [
              'thanhcong',
              this.madonhangparam,
            ]
          )
            .subscribe(data => {
              alert("Đơn Hàng Đã Xử Lý Thành Công")
              this.service.getdanhsachdonhangtheomadonhang([this.madonhangparam]).subscribe(data => {

                data.forEach(element => {
                  this.service.updatequanlymaynguoimua([element.tenkhachhang, element.masanpham]).subscribe(val => { console.log("POST Request is successful ", val) })
                });
              })
              this.router.navigateByUrl('/smart-table-don-hang-da-xu-ly-thanh-cong')
              console.log("POST Request is successful ", data);
            },
              error => {
                console.log("Error", error);

              })
        }
      })
      console.log("POST Request is successful ", data);
    },
      error => {
        console.log("Error", error);

      })







    // this.service.updatetrangthaidonhang(
    //   [
    //     'thanhcong',
    //     this.madonhangparam,
    //   ]
    // )
    //   .subscribe(data => {
    //     alert("Đơn Hàng Đã Xử Lý Thành Công")
    //     this.service.getdanhsachdonhangtheomadonhang([this.madonhangparam]).subscribe(data => {

    //       data.forEach(element => {
    //         this.service.updatequanlymaynguoimua([element.tenkhachhang, element.masanpham]).subscribe(val => { console.log("POST Request is successful ", val) })
    //       });
    //     })
    //     this.router.navigateByUrl('/smart-table-don-hang-da-xu-ly-thanh-cong')
    //     console.log("POST Request is successful ", data);
    //   },
    //     error => {
    //       console.log("Error", error);

    //     })


  }


  themsanpham() {
    this.service.getquanlymaytheomasanpham([this.masanphammoi]).subscribe(data => {



      this.service.danhsachdonhang([
        data[0].loaimay,
        data[0].doimay,
        data[0].manhinh,
        data[0].chip,
        data[0].tanso,
        data[0].ram,
        data[0].ocung,
        data[0].nhom,
        data[0].gia,
        data[0].soluong,
        localStorage.getItem('sodienthoai'),
        localStorage.getItem('hoten'),
        'dangxuly',
        new Date(),
        data[0].masanpham,
        this.madonhangparam,
        data[0].imei
      ]).subscribe(data => {
        this.service.getdanhsachdonhangtheomadonhang([this.madonhangparam]).subscribe(val => {

          this.source.load(val)
          console.log(this.sanphams)
        });
        console.log("POST Request is successful ", data);
      },
        error => {
          console.log("Error", error);

        })



      console.log("POST Request is successful ", data);
    },
      error => {
        console.log("Error", error);

      })
  }
}
