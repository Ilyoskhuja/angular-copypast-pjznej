import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  TreeGridComponent,
  RowDDService,
  SelectionService,
  SortService,
  EditService,
  ToolbarService,
  FilterService,
} from '@syncfusion/ej2-angular-treegrid';

import { Treerow } from './treerow';
import { v4 as uuidv4 } from 'uuid';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';

import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import {
  DataManager,
  WebApiAdaptor,
  Query,
  ReturnOption,
} from '@syncfusion/ej2-data';

import { addClass, removeClass } from '@syncfusion/ej2-base';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [
    RowDDService,
    SelectionService,
    SortService,
    ToolbarService,
    EditService,
    FilterService,
  ],

  encapsulation: ViewEncapsulation.None,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  @ViewChild('taskName')
  public taskNameM: CheckBoxComponent;
  @ViewChild('duration')
  public durationM: CheckBoxComponent;
  @ViewChild('startDate')
  public startDateM: CheckBoxComponent;
  @ViewChild('endDate')
  public endDateM: CheckBoxComponent;
  @ViewChild('priority')
  public priorityM: CheckBoxComponent;
  @ViewChild('progress')
  public progressM: CheckBoxComponent;

  // public sortSettings: Object;
  @ViewChild('Dialog')
  public dialogObj: DialogComponent;
  public isModal: boolean = true;
  public data: Object[] = [];
  public dm: DataManager;
  public customAttributes: Object;
  // public data: DataManager;
  public editSettings: EditSettingsModel;
  public Properties: boolean = false;
  public selectOptions: Object;
  public d1data: Object;
  public ddlfields: Object;
  public d2data: any;
  public d3data: any;
  public d4data: any;
  public d5data: any;
  public format: Object;
  public fields: Object;
  public selectedRow: any;
  public copiedRow: any;
  public pageSetting: Object;
  public ColType: string = '';
  ColAlign: string = '';
  ColChecked: boolean = false;
  ColMinWidth: number;
  ColFColor: string = '';
  ColBColor: string = '';
  checkNewEdit: string;
  public rowIndex: number;

  public selectionOptions: SelectionSettingsModel;

  public formatOptions: Object;
  public editOptions: Object;
  public stringRule: Object;
  public taskidRule: Object;
  public progressRule: Object;
  public dateRule: Object;
  /**buttons */
  public nde: boolean = false;
  /*** */
  @ViewChild('columns')
  public columns: NumericTextBoxComponent;
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  columnValue: number;
  columnField: string;
  public dateformat: Object;
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  public contextMenuItems: Object;
  public templateOptions: object;
  public sorting: boolean = false;
  public filtering: boolean = false;
  public showChooser: boolean = false;
  public MultiSelect: boolean = false;
  public textWrap: boolean = false;
  public allowResizing: boolean = false;
  public showEditColumn: boolean = false;
  public addNew: boolean = false;
  public ColName: string = '';
  public allowDAD: boolean = false;
  public allowReorder: boolean = false;
  public flag: boolean = false;
  public filterSettings: Object;
  public dropDownFilter: DropDownList;
  public toolbar: string[];

  public listHeadersC: any = [
    {
      field: 'TaskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      // editType: "defaultedit",
    },
    {
      field: 'TaskName',
      headerText: 'Task Name',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'StartDate',
      headerText: 'Start Date',
      type: 'date',
      format: 'dd/MM/yyyy',
      textAlign: 'Right',
      editType: 'datepickeredit',
    },
    {
      field: 'EndDate',
      headerText: 'End Date',
      format: 'yMd',
      textAlign: 'Right',
      editType: 'datepickeredit',
      type: 'date',
    },
    {
      field: 'Duration',
      headerText: 'Duration',
      textAlign: 'Right',
      editType: 'numericedit',
      type: 'number',
    },

    {
      field: 'Progress',
      headerText: 'Progress',

      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'Priority',
      headerText: 'Priority',
      editType: 'dropdownedit',
      type: 'string',
    },
  ];
  public listHeaders: any = [
    {
      field: 'TaskID',
      headerText: 'Task ID',
      isPrimaryKey: true,
      allowFiltering: false,
      allowSorting: false,
      // editType: "defaultedit",
    },
    {
      field: 'TaskName',
      headerText: 'Task Name',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'StartDate',
      headerText: 'Start Date',
      type: 'date',
      format: 'dd/MM/yyyy',
      textAlign: 'Right',
      editType: 'datepickeredit',
    },
    {
      field: 'EndDate',
      headerText: 'End Date',
      format: 'yMd',
      textAlign: 'Right',
      editType: 'datepickeredit',
      type: 'date',
    },
    {
      field: 'Duration',
      headerText: 'Duration',
      textAlign: 'Right',
      editType: 'numericedit',
      type: 'number',
    },

    {
      field: 'Progress',
      headerText: 'Progress',

      textAlign: 'Right',
      editType: 'stringedit',
      type: 'string',
    },
    {
      field: 'Priority',
      headerText: 'Priority',
      editType: 'dropdownedit',
      type: 'string',
    },
  ];

  public fieldData: any = [];
  // public flag: any = false;
  public cutRow: any;
  public cutRowBool: boolean = false;

  // public contextMenuItems: any;
  public treeColumns: any;
  @ViewChild('dropdown1')
  public dropdown1: DropDownListComponent;
  @ViewChild('dropdown2')
  public dropdown2: DropDownListComponent;

  @ViewChild('dropdown3')
  public dropdown3: DropDownListComponent;
  @ViewChild('dropdown4')
  public dropdown4: DropDownListComponent;
  @ViewChild('taskForm')
  public taskForm: FormGroup;
  public dataManager: DataManager = new DataManager({
    url: 'https://vom-app.herokuapp.com/tasks?limit=14000',
    updateUrl: 'https://vom-app.herokuapp.com/tasks',
    insertUrl: 'https://vom-app.herokuapp.com/tasks',
    removeUrl: 'https://vom-app.herokuapp.com/tasks',
    crossDomain: true,
    adaptor: new WebApiAdaptor(),
  });
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.customAttributes = { class: 'customcssa' };
    this.selectionOptions = {
      type: 'Multiple',
      mode: 'Row',
    };
    this.treeColumns = this.listHeaders;
    this.formatOptions = { format: 'M/d/y hh:mm a', type: 'dateTime' };
    this.progressRule = { number: true, min: 0 };
    this.taskidRule = { required: true, number: true };
    this.dateRule = { date: true };
    this.stringRule = { required: true };
    this.dataManager
      .executeQuery(new Query())
      .then((e: ReturnOption) => (this.data = e.result.data as object[]))
      .catch((e) => true);

    this.pageSetting = { pageCount: 3 };

    this.format = { format: 'M/d/yyyy', type: 'date' };

    this.ddlfields = { text: 'name', value: 'id' };
    (this.d1data = [
      { id: 'taskID', name: 'Task Id' },
      { id: 'taskName', name: 'Task Name' },
    ]),
      (this.d2data = [
        { id: 'string', type: 'string' },
        { id: 'number', type: 'number' },
        { id: 'boolean', type: 'boolean' },
        { id: 'datetime', type: 'datetime' },
        { id: 'date', type: 'date' },
      ]),
      (this.d3data = [
        { id: 'right', type: 'Right' },
        { id: 'left', type: 'Left' },
        { id: 'Center', type: 'Center' },
      ]),
      (this.d4data = [
        { id: '105px', type: '105px' },
        { id: '125px', type: '125px' },
        { id: '145px', type: '145px' },
        { id: '150px', type: '150px' },
        { id: '155px', type: '155px' },
        { id: '165px', type: '165px' },
      ]),
      (this.d5data = [
        { id: 'customcssa', type: 'BC:blue/FC:yellow/FS:20px' },
        { id: 'customcssb', type: 'BC:blue/FC:white/FS:20px' },
        { id: 'customcssc', type: 'BC:green/FC:white/FS:15px' },
        { id: 'customcssd', type: 'BC:green/FC:yellow/FS:15px' },
      ]),
      (this.fields = { text: 'type', value: 'id' });
    this.dateformat = { type: 'dateTime', format: 'dd/MM/yyyy' };
    this.contextMenuItems = [
      {
        text: 'Add/Delete/Edit (Dialog)  ',
        target: '.e-content',
        id: 'rndeDialog',
      },
      { text: 'Add/Delete/Edit (Row)  ', target: '.e-content', id: 'rndeRow' },

      { text: 'Multi-Select', target: '.e-content', id: 'rmultiSelect' },
      { text: 'Copy', target: '.e-content', id: 'rcopy' },

      { text: 'Paste Sibling', target: '.e-content', id: 'rsibling' },
      { text: 'Paste Child', target: '.e-content', id: 'rchild' },
      {
        id: 'cut',
        text: 'Cut',
        target: '.e-content',
        iconCss: 'e-cm-icons e-cut',
      },
    ];
    this.filterSettings = {
      type: 'FilterBar',
      hierarchyMode: 'Parent',
      mode: 'Immediate',
    };
    this.templateOptions = {
      create: (args: { element: Element }) => {
        let dd: HTMLInputElement = document.createElement('input');
        dd.id = 'duration';
        return dd;
      },
      write: (args: { element: Element }) => {
        let dataSource: string[] = ['All', '1', '3', '4', '5', '6', '8', '9'];
        this.dropDownFilter = new DropDownList({
          dataSource: dataSource,
          value: 'All',
          change: (e: ChangeEventArgs) => {
            let valuenum: any = +e.value;
            let id: any = <string>this.dropDownFilter.element.id;
            let value: any = <string>e.value;
            if (value !== 'All') {
              this.treegrid.filterByColumn(id, 'equal', valuenum);
            } else {
              this.treegrid.removeFilteredColsByField(id);
            }
          },
        });
        this.dropDownFilter.appendTo('#Duration');
      },
    };
  }
  closeP(data) {
    console.log('closeP:', data);
    if (data == 'sorting') {
      this.sorting = false;
    }
    if (data == 'showChooser') this.showChooser = false;
    if (data == 'filtering') {
      this.filtering = false;
    }
  }

  deleteColumnX() {
    this.treegrid.columns.filter((i, x) => {
      if (i.field == this.columnField) {
        this.treegrid.columns.splice(x, 1);
      }
    });

    this.treegrid.refreshColumns();
  }
  actionComplete(args: EditEventArgs) {
    if (args.requestType == 'save' && args.action == 'add') {
      const body = {
        TaskID: 0,
        TaskName: args.data.TaskName,
        StartDate: args.data.StartDate,
        EndDate: args.data.EndDate,
        Duration: args.data.Duration,
        Progress: args.data.Progress,
        Priority: args.data.Priority,
        ParentItem: null,
        isParent: args.data.isParent,
      };
      this.http
        .post<any>('https://vom-app.herokuapp.com/tasks', body)
        .subscribe((data) => {
          console.log(data);
          this.dataManager
            .executeQuery(new Query())
            .then((e: ReturnOption) => (this.data = e.result.data as object[]))
            .catch((e) => true);
        });
    }
    if (args.requestType == 'save' && args.action == 'edit') {
      const body = {
        TaskID: args.data.TaskID,
        TaskName: args.data.TaskName,
        StartDate: args.data.StartDate,
        EndDate: args.data.EndDate,
        Duration: args.data.Duration,
        Progress: args.data.Progress,
        Priority: args.data.Priority,
        isParent: args.data.isParent,
      };
      this.http
        .put<any>('https://vom-app.herokuapp.com/tasks', body)
        .subscribe((data) => {
          console.log(data);
          this.dataManager
            .executeQuery(new Query())
            .then((e: ReturnOption) => (this.data = e.result.data as object[]))
            .catch((e) => true);
        });

      // this.treegrid.refresh();
    }
    if (args.requestType == 'save') {
      var index = args.index;
      this.treegrid.selectRow(index); // select the newly added row to scroll to it
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'save') {
      console.log('actionBegin', args.requestType);
    }
  }
  toolabarclickHandler(args) {
    if (args.item.text === 'Add') {
      this.addNew = true;
    }
    if (args.item.text === 'Update') {
      this.treegrid.endEdit();

      if (this.addNew == true) {
        var rowInfo = this.treegrid.getCurrentViewRecords()[0];

        const body = {
          TaskID: 0,
          TaskName: rowInfo.TaskName,
          StartDate: rowInfo.StartDate,
          EndDate: rowInfo.EndDate,
          Duration: rowInfo.Duration,
          Progress: rowInfo.Progress,
          Priority: rowInfo.Priority,
          isParent: rowInfo.isParent,
          ParentItem:
            rowInfo.ParentItem != undefined ? rowInfo.ParentItem : null,
        };
        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log(data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });

        this.addNew = false;
        // this.treegrid.startEdit();
        this.treegrid.refresh();
      } else {
        this.treegrid.endEdit();

        var rowInfo =
          this.treegrid.getCurrentViewRecords()[this.selectedRow.rowIndex];
        const body = {
          TaskID: rowInfo.TaskID,
          TaskName: rowInfo.TaskName,
          StartDate: rowInfo.StartDate,
          EndDate: rowInfo.EndDate,
          Duration: rowInfo.Duration,
          Progress: rowInfo.Progress,
          Priority: rowInfo.Priority,
          isParent: rowInfo.isParent,
        };
        this.http
          .put<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log(data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);

        this.treegrid.refresh();
      }
    }

    if (args.item.text === 'Edit') {
      this.treegrid.startEdit(); //you can save a record by invoking endEdit
    }
    if (args.item.text === 'Delete') {
      var rowInfo = this.treegrid.getSelectedRecords()[0];

      this.http
        .delete<any>(`https://vom-app.herokuapp.com/tasks/${rowInfo.TaskID}`)
        .subscribe((data) => {
          console.log(data);
          this.treegrid.refresh();
        });
      this.dataManager
        .executeQuery(new Query())
        .then((e: ReturnOption) => (this.data = e.result.data as object[]))
        .catch((e) => true);

      // this.remove();
      this.treegrid.endEdit(); //you can save a record by invoking endEdit
    }
  }
  public insert(): void {
    this.treegrid.endEdit();
    var rowInfo = this.treegrid.getSelectedRecords()[0];

    const body = {
      TaskID: rowInfo.TaskID,
      TaskName: rowInfo.TaskName,
      StartDate: rowInfo.StartDate,
      EndDate: rowInfo.EndDate,
      Duration: rowInfo.Duration,
      Progress: rowInfo.Progress,
      Priority: rowInfo.Priority,
      isParent: rowInfo.isParent,
    };
    this.http
      .put<any>('https://vom-app.herokuapp.com/tasks', body)
      .subscribe((data) => {
        console.log(data);
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);
      });
  }
  public remove(): void {
    var rowInfo = this.treegrid.getRowInfo(
      this.treegrid.getRowByIndex(this.rowIndex)
    );

    this.dm.remove('TaskID', {
      TaskID: rowInfo.TaskID,
      TaskName: rowInfo.TaskName,
      StartDate: rowInfo.StartDate,
      EndDate: rowInfo.EndDate,
      Duration: rowInfo.Duration,
      Progress: rowInfo.Progress,
      Priority: rowInfo.Priority,
    });
    this.dm
      .executeQuery(new Query())
      .then((e: ReturnOption) => (this.data = e.result as object[]))
      .catch((e) => true);
  }
  getCurrentField() {
    console.log(
      'this.checkNewEdit:----------',
      this.checkNewEdit,
      'this.columnField:',
      this.columnField
    );
    if (this.checkNewEdit == 'edit') {
      this.ColName = this.treegrid.getColumnByField(
        this.columnField
      ).headerText;
      console.log(
        '-------this.ColName:----------',
        this.ColName,
        '---------this.columnField:-------------',
        this.columnField
      );
      this.ColType = this.treegrid.getColumnByField(this.columnField).type;
    } else {
      this.ColName = '';
      this.ColType = '';
    }
  }
  contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    this.rowIndex = arg.rowInfo.rowIndex;
    let elem: Element = arg.event.target as Element;

    if (arg.column.headerText == 'Task ID') {
      this.columnValue = 1;
      this.columnField = 'TaskID';
    }
    if (arg.column.headerText == 'Task Name') {
      this.columnValue = 2;
      this.columnField = 'TaskName';
    }
    if (arg.column.headerText == 'Start Date') {
      this.columnValue = 3;

      this.columnField = 'StartDate';
    }
    if (arg.column.headerText == 'End Date') {
      this.columnValue = 4;

      this.columnField = 'EndDate';
    }
    if (arg.column.headerText == 'Duration') {
      this.columnValue = 5;

      this.columnField = 'Duration';
    }

    if (arg.column.headerText == 'Progress') {
      this.columnValue = 6;

      this.columnField = 'Progress';
    }
    if (arg.column.headerText == 'Priority') {
      this.columnValue = 7;

      this.columnField = 'Priority';
    } else {
      console.log('********arg.column*********: ', arg.column);
      this.columnValue = arg.column.index + 1;
      this.columnField = arg.column.field;
    }
    let row: Element = elem.closest('.e-row');
    let uid: string = row && row.getAttribute('data-uid');
    let items: Array<HTMLElement> = [].slice.call(
      document.querySelectorAll('.e-menu-item')
    );
    for (let i: number = 0; i < items.length; i++) {
      items[i].setAttribute('style', 'display: none;');
    }
    if (elem.closest('.e-row')) {
      document
        .querySelectorAll('li#rcopy')[0]
        .setAttribute('style', 'display: block;');

      document
        .querySelectorAll('li#rsibling')[0]
        .setAttribute('style', 'display: block;');

      document
        .querySelectorAll('li#rchild')[0]
        .setAttribute('style', 'display: block;');
      // }
    }
  }

  contextMenuClick(args): void {
    if (args.item.text == 'Cut') {
      this.flag = true;
      this.cutRow = this.treegrid.getRowByIndex(this.rowIndex);
      this.cutRowBool = true;
      this.treegrid.copyHierarchyMode = 'None';
      this.treegrid.copy();
      this.cutRow.setAttribute('style', 'background:#FFC0CB;');
    }
    if (args.item.id == 'rsibling') {
      if (this.cutRowBool == true) {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.ParentItem
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };
        this.http
          .delete<any>(
            `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
          )
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.treegrid.refresh();
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });

        this.cutRowBool = false;
        this.copiedRow.setAttribute('style', 'background:white;');
      } else {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.ParentItem
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };

        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });
        this.dataManager
          .executeQuery(new Query())
          .then((e: ReturnOption) => (this.data = e.result.data as object[]))
          .catch((e) => true);

        this.copiedRow.setAttribute('style', 'background:white;');
      }
    }

    if (args.item.id == 'rchild') {
      if (this.cutRowBool == true) {
        var copyContent = this.treegrid.clipboardModule.copyContent;

        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.TaskID
        );
        newRecord.children = [];
        newRecord.isParent = true;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };
        this.http
          .delete<any>(
            `https://vom-app.herokuapp.com/tasks/${newRecord.TaskID}`
          )
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.treegrid.refresh();
            this.http
              .post<any>('https://vom-app.herokuapp.com/tasks', body)
              .subscribe((data) => {
                this.dataManager
                  .executeQuery(new Query())
                  .then(
                    (e: ReturnOption) => (this.data = e.result.data as object[])
                  )
                  .catch((e) => true);
              });
          });

        this.cutRowBool = false;
        this.copiedRow.setAttribute('style', 'background:white;');
      } else {
        var copyContent = this.treegrid.clipboardModule.copyContent;
        var stringArray = copyContent.split('\t');
        let newRecord: Treerow = new Treerow(
          stringArray[0],
          stringArray[1],
          stringArray[2],
          stringArray[3],
          stringArray[4],
          stringArray[5],
          stringArray[6],
          this.selectedRow.data.TaskID
        );
        newRecord.children = [];
        newRecord.isParent = false;
        newRecord.id = uuidv4();
        const body = {
          TaskID: newRecord.TaskID,
          TaskName: newRecord.TaskName,
          StartDate: newRecord.StartDate,
          EndDate: newRecord.EndDate,
          Duration: newRecord.Duration,
          Progress: newRecord.Progress,
          Priority: newRecord.Priority,
          isParent: newRecord.isParent,
          ParentItem: newRecord.ParentItem,
        };

        this.http
          .post<any>('https://vom-app.herokuapp.com/tasks', body)
          .subscribe((data) => {
            console.log('post:------------------', data);
            this.dataManager
              .executeQuery(new Query())
              .then(
                (e: ReturnOption) => (this.data = e.result.data as object[])
              )
              .catch((e) => true);
          });

        this.copiedRow.setAttribute('style', 'background:white;');
      }
    } else if (args.item.id === 'rcopy') {
      this.MultiSelect = true;

      this.editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,

        newRowPosition: 'Child',
        mode: 'Batch',
      };
      this.copiedRow = this.treegrid.getRowByIndex(this.rowIndex);

      this.treegrid.copyHierarchyMode = 'None';
      this.treegrid.copy();
      this.copiedRow.setAttribute('style', 'background:#FFC0CB;');
    }
  }
  public onClicked(e: MouseEvent): void {
    if (!this.flag) {
      return;
    }

    let element: HTMLElement = <HTMLInputElement>e.target;

    if (
      !element.classList.contains('e-tbar-btn-text') &&
      !element.classList.contains('e-tbar-btn')
    ) {
      return;
    }

    element = <HTMLElement>(
      (element.tagName === 'BUTTON' ? element.firstElementChild : element)
    );
    this.flag = false;
    let hidden: boolean = element.classList.contains('e-ghidden');
    let classFn: Function = hidden ? removeClass : addClass;
    classFn([element], 'e-ghidden');

    if (hidden) {
      this.treegrid.showColumns(element.innerHTML);
    } else {
      this.treegrid.hideColumns(element.innerHTML);
      //this.treegrid.hideColumns(element.innerHTML);
    }
    this.flag = true;
  }

  public dataBound(): void {
    this.flag = true;
  }
  public hideDialog: EmitType<object> = () => {
    this.ejDialog.hide();
    this.showEditColumn = false;
  };
  public buttons: Object = [
    {
      click: this.hideDialog.bind(this),
      // Accessing button component properties by buttonModel property
      buttonModel: {
        content: 'Submit',
        isPrimary: true,
      },
    },
  ];
  // Initialize the Dialog component's target element.
  initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  };

  //Animation options
  public animationSettings: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };

  public showCloseIcon: boolean = true;

  public saveColumn() {
    if (this.checkNewEdit == 'edit') {
      console.log('this.checkNewEdit:', this.checkNewEdit);
      this.listHeadersC.forEach((a) => {
        delete a['customAttributes'];
      });
      // var colorP = 'yellow';
      var catched = false;
      let b = [];
      // myArray.forEach(val => myClonedArray.push(Object.assign({}, val)));
      this.listHeadersC.forEach((r) => {
        if (!catched) {
          catched = true;
          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
          document.body.append(style);
        }

        if (r.field == this.columnField) {
          r.headerText = this.ColName;
          r.type = this.ColType;
          r.textAlign = this.ColAlign;
          r.minWidth = this.ColMinWidth;
          r['customAttributes'] = { class: 'cssClassaa' };
        }
        b.push(Object.assign({}, r));
      });

      this.treeColumns = [];
      console.log('tre', this.treeColumns);
      console.log('------b-------:', b);
      this.treeColumns = [...this.listHeadersC]; //this.listHeadersC;
      console.log('------[this.treeColumns]-------:', this.treeColumns);

      this.textWrap = this.ColChecked;
      this.treegrid.refreshColumns();
    }
    if (this.checkNewEdit == 'add') {
      this.listHeadersC.forEach((a) => {
        delete a['customAttributes'];
      });

      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.e-treegrid .e-headercell.cssClassaa { background-color: ${this.ColBColor}; 
            color:${this.ColFColor};
          }`;
      document.body.append(style);
      this.listHeadersC.push({
        field: this.ColName,
        headerText: this.ColName,
        type: this.ColType,
        textAlign: this.ColAlign,
        minWidth: this.ColMinWidth,
        customAttributes: { class: 'cssClassaa' },
      });

      this.treeColumns = [];
      this.treeColumns = this.listHeadersC;

      this.textWrap = this.ColChecked;
      this.treegrid.refreshColumns();
    }

    this.showEditColumn = false;

    this.ejDialog.hide();

    this.treegrid.refreshColumns();
  }
  public btnclick = function (): void {
    this.ejDialog.hide();

    this.showEditColumn = false;
  };

  // Sample level code to handle the button click action
  public onOpenDialog = function (event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };
  public onOpenDialog = function (): void {
    // Call the show method to open the Dialog
    this.ejDialog.show();
  };
  public onChange(e: ChangeEventArgs): void {
    let columnName: string = <string>e.value;
    if (columnName === 'price') {
      this.dropdown2.dataSource = this.d2data;
      this.dropdown2.value = 'n2';
    }
    if (columnName === 'orderDate') {
      this.dropdown2.dataSource = this.d3data;
      this.dropdown2.value = 'M/d/yyyy';
    }
    //  this.dropdown2.index = 0;
  }

  public changeFontColor(e: ChangeEventArgs): void {
    this.ColFColor = <string>e.value;
  }
  public changeBackground(e: ChangeEventArgs): void {
    this.ColBColor = <string>e.value;
  }
  public checkboxChange(e: any): void {
    if (e.checked) {
      this.textWrap = true;
    } else {
      this.textWrap = false;
    }
    this.treegrid.refreshColumns();
  }
  rowSelected(args) {
    this.selectedRow = args;
  }
  copy() {
    this.copiedRow = this.treegrid.getRowByIndex(this.rowIndex);

    this.treegrid.copyHierarchyMode = 'None';
    this.treegrid.copy();
    this.copiedRow.setAttribute('style', 'background:#FFC0CB;');
  }
  delete(): void {
    const selectedRow: number = this.treegrid.getSelectedRowIndexes()[0];
    if (this.treegrid.getSelectedRowIndexes().length) {
      (this.treegrid.dataSource as object[]).splice(selectedRow, 1);
    } else {
      alert('No records selected for delete operation');
    }
    this.treegrid.refresh();
  }

  /************************** Multi Sort ********************/
  public onClick1(e: MouseEvent): void {
    if (this.taskNameM.checked) {
      this.treegrid.sortByColumn('TaskName', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('TaskName');
    }
  }
  public onClick2(e: MouseEvent): void {
    if (this.durationM.checked) {
      this.treegrid.sortByColumn('Duration', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Duration');
    }
  }
  public onClick3(e: MouseEvent): void {
    if (this.startDateM.checked) {
      this.treegrid.sortByColumn('StartDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('StartDate');
    }
  }
  public onClick4(e: MouseEvent): void {
    if (this.endDateM.checked) {
      this.treegrid.sortByColumn('EndDate', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('EndDate');
    }
  }
  public onClick5(e: MouseEvent): void {
    if (this.priorityM.checked) {
      this.treegrid.sortByColumn('Priority', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Priority');
    }
  }
  public onClick6(e: MouseEvent): void {
    if (this.progressM.checked) {
      this.treegrid.sortByColumn('Progress', 'Ascending', true);
    } else {
      this.treegrid.grid.removeSortColumn('Progress');
    }
  }

  public check(field: string, state: boolean): void {
    switch (field) {
      case 'TaskName':
        this.taskNameM.checked = state;
        break;
      case 'Duration':
        this.durationM.checked = state;
        break;
      case 'StartDate':
        this.startDateM.checked = state;
        break;
      case 'EndDate':
        this.endDateM.checked = state;
        break;
      case 'Priority':
        this.priorityM.checked = state;
        break;
      case 'Progress':
        this.progressM.checked = state;
        break;
    }
  }
}
