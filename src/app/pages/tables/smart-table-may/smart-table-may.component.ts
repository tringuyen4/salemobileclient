import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-may',
  templateUrl: './smart-table-may.component.html',
  styleUrls: ['./smart-table-may.component.scss']
})
export class SmartTableMayComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();
  datachip = []
  datadoimay = []
  dataloaimay = []
  datamanhinh = []
  dataram = []
  dataocung = []
  data
  constructor(private service: NetworkserviceService) {
    this.service.getquanlymay().subscribe(val => {
      this.source.load(val)
      this.data = val
    });
    this.service.getdoimay().subscribe(val => {
      let data = val.map(val => val.doimay)
      data.forEach(data => {
        this.datadoimay.push({ "value": data, "title": data })
      });
      this.settings.columns.doimay.editor.config.list = this.datadoimay
      this.settings = Object.assign({}, this.settings);
    });
    this.service.getloaimay().subscribe(val => {
      let data = val.map(val => val.loaimay)
      data.forEach(data => {
        this.dataloaimay.push({ "value": data, "title": data })
      });
      this.settings.columns.loaimay.editor.config.list = this.dataloaimay
      this.settings = Object.assign({}, this.settings);
    });
    this.service.getmanhinh().subscribe(val => {
      let data = val.map(val => val.manhinh)
      data.forEach(data => {
        this.datamanhinh.push({ "value": data, "title": data })
      });
      this.settings.columns.manhinh.editor.config.list = this.datamanhinh
      this.settings = Object.assign({}, this.settings);
    });
    this.service.getocung().subscribe(val => {
      let data = val.map(val => val.ocung)
      data.forEach(data => {
        this.dataocung.push({ "value": data, "title": data })
      });
      this.settings.columns.ocung.editor.config.list = this.dataocung
      this.settings = Object.assign({}, this.settings);
    });
    this.service.getram().subscribe(val => {
      let data = val.map(val => val.ram)
      data.forEach(data => {
        this.dataram.push({ "value": data, "title": data })
      });
      this.settings.columns.ram.editor.config.list = this.dataram
      this.settings = Object.assign({}, this.settings);
    });
    this.service.getchip().subscribe(val => {
      let data = val.map(val => val.chip)
      data.forEach(data => {
        this.datachip.push({ "value": data, "title": data })
      });
      this.settings.columns.chip.editor.config.list = this.datachip
      this.settings = Object.assign({}, this.settings);
    });
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
      gia1: {
        title: 'Giá 1',
        type: 'string'
      },
      gia2: {
        title: 'Giá 2',
        type: 'string'
      },
      gia3: {
        title: 'Khách lẻ',
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

  ngOnInit(): void {
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Bạn có chắc muốn xóa không ????')) {
      this.service.deletequanlymay(
        [
          event['data']['masanpham'],
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
      this.service.quanlymay(
        [
          event['newData']['loaimay'],
          event['newData']['doimay'],
          event['newData']['manhinh'],
          event['newData']['chip'],
          event['newData']['tanso'],
          event['newData']['ram'],
          event['newData']['ocung'],
          event['newData']['nhom'],
          event['newData']['imei'],
          event['newData']['gia1'],
          event['newData']['gia2'],
          event['newData']['gia3'],
          '',
          event['newData']['masanpham'],
          event['newData']['chitiet'],
          ''
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
    this.service.deletequanlymay(
      [
        event['newData']['masanpham'],
      ]
    )
      .subscribe(data => {

        console.log("POST Request is successful ", data);
        this.service.quanlymay(
          [
            event['newData']['loaimay'],
            event['newData']['doimay'],
            event['newData']['manhinh'],
            event['newData']['chip'],
            event['newData']['tanso'],
            event['newData']['ram'],
            event['newData']['ocung'],
            event['newData']['nhom'],
            event['newData']['imei'],
            event['newData']['gia1'],
            event['newData']['gia2'],
            event['newData']['gia3'],
            '',
            event['newData']['masanpham'],
            event['newData']['chitiet'],
            '',
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
}