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
  datadaxuly
  fileToUpload: File | null = null;
  constructor(private service: NetworkserviceService) {
    this.service.getquanlymay().subscribe(val => {
      this.source.load(val.filter(val => val.trangthai == ''))
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


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload)
  }

  taosanpham() {
    this.datadaxuly.forEach(element => {
      if (!this.data.some(el => el.masanpham === element.masanpham || el.imei === element.imei)) {
        this.service.quanlymay(
          [
            element.loaimay,
            element.doimay,
            element.manhinh,
            element.chip,
            element.tanso,
            element.ram,
            element.ocung,
            element.nhom,
            element.imei,
            element.gia1,
            element.gia2,
            element.gia3,
            '',
            element.masanpham,
            element.chitiet,
            '',
            element.mausac,
          ]
        )
          .subscribe(data => {
            this.service.getquanlymay().subscribe(val => {
              this.source.load(val.filter(val => val.trangthai == ''))
              this.data = val
            });
            console.log("POST Request is successful ", data);
          },
            error => {
              console.log("Error", error);

            })
      }
      else {
        alert('M?? s???n ph???m '+element.masanpham + ' ho???c imei '+ element.imei + ' ???? t???n t???i');
      }
    });

  }

  uploadExcel(e) {

    try {

      const fileName = e.target.files[0].name;

      import('xlsx').then(xlsx => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        // const file = ev.target.files[0];
        reader.onload = (event) => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});

          console.log(this.getData(jsonData[Object.keys(jsonData)[0]]));
          this.datadaxuly = this.getData(jsonData[Object.keys(jsonData)[0]])
        };
        reader.readAsBinaryString(e.target.files[0]);
      });

    } catch (e) {
      console.log('error', e);
    }
  }


  getData(input) {
    var output = [];
    for (var i = 0; i < input.length; i++) {
      output.push({
        'masanpham': input[i]['M?? s???n ph???m'],
        'loaimay': input[i]['Lo???i m??y'],
        'doimay': input[i]['?????i m??y'],
        'manhinh': input[i]['M??n h??nh'],
        'chip': input[i]['Chip'],
        'tanso': input[i]['T???n s???'],
        'ram': input[i]['Ram'],
        'ocung': input[i]['??? c???ng'],
        'nhom': input[i]['Nh??m'],
        'imei': input[i]['imei'],
        'gia1': input[i]['Gi?? ?????i l?? c???p 1'],
        'gia2': input[i]['Gi?? ?????i l?? c???p 2'],
        'gia3': input[i]['Gi?? kh??ch l???'],
        'chitiet': input[i]['Chi ti???t'],
        'mausac': input[i]['M??u s???c'],
      });
    }
    return output;
  }
}
