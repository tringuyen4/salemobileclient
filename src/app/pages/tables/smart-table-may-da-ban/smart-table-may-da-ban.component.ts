import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NetworkserviceService } from '../../../services/networkservice.service';

@Component({
  selector: 'ngx-smart-table-may-da-ban',
  templateUrl: './smart-table-may-da-ban.component.html',
  styleUrls: ['./smart-table-may-da-ban.component.scss']
})
export class SmartTableMayDaBanComponent implements OnInit {

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
      this.source.load(val.filter(val=>val.trangthai!=''))
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
    actions: false,
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark" (click)="onClick()"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },

    columns: {
      masanpham: {
        title: 'M?? S???n Ph???m',
        type: 'string',
        width: '300px'
      },
      loaimay: {
        title: 'Lo???i M??y',
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
        title: '?????i M??y',
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
        title: 'M??n H??nh',
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
        title: 'T???n s???',
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
        title: '??? c???ng',
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
        title: 'Nh??m',
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
        title: 'Gi?? 1',
        type: 'string'
      },
      gia2: {
        title: 'Gi?? 2',
        type: 'string'
      },
      gia3: {
        title: 'Kh??ch l???',
        type: 'string'
      },
      mausac: {
        title: 'M??u S???c',
        type: 'string'
      },
      chitiet: {
        title: 'Chi Ti???t',
        type: 'string'
      },
      trangthai: {
        title: 'T??n Ng?????i Mua',
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
    if (window.confirm('B???n c?? ch???c mu???n x??a kh??ng ????')) {
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
          '',
          event['newData']['mausac'],
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
      alert('D??? li???u ???? t???n t???i');
      event.confirm.reject();
    }
  }





onSaveConfirm(event) {
  if (window.confirm('B???n c?? mu???n thay ?????i kh??ng?')) {
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
            event['newData']['mausac'],
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