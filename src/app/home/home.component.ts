import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {MatPaginator,MatSort,MatTableDataSource} from '@angular/material';
import { User } from '../_models';
import { UserService } from '../_services';
import { ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
@Component({selector: 'app-home',templateUrl: 'home.component.html', styleUrls:['home.component.css'],})
export class HomeComponent implements OnInit {
    currentUser: User;

    users: User[] = [];
    //displayedColumns = ['position', 'name', 'weight', 'symbol'];
    displayedColumns = ['emp_no', 'ename','email','level','stack','targetLevel','targetStack','completion_date'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    
    
    
    
    
    
    @ViewChild (MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
      ngOnInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
      

      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    change(selectedLevel: string ) {
      selectedLevel = selectedLevel.trim(); // Remove whitespace
    selectedLevel = selectedLevel.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = selectedLevel;
     }
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // ngOnInit() {
    //     this.loadAllUsers();
    // }
    exportToExcel() {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(ELEMENT_DATA);  //this.biller= List that holds values[In Excel sheet, you column name will be derived from Json key’s]
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ESM");
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }
}

// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
//   }
export interface PeriodicElement {
    
    emp_no:number;
    ename: string;
    email : string;
    level: string;
    stack:string;
    targetLevel: string;
    targetStack : string;
    completion_date: string;
  }
//   const ELEMENT_DATA: PeriodicElement[] = [
//     {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//     {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//     {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Pi'},
//     {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//     {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//     {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'I'},
//     {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//     {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//     {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//     {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   ];

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
  const ELEMENT_DATA: PeriodicElement[] = [
    {emp_no:2001, ename: 'Jacob', email:'jacob@xyz.com', level:'Pre-Foundation',stack:'Java',targetLevel:'Foundation',targetStack:'Java',completion_date:'12-Jun-2018'},
    {emp_no:2003, ename: 'luke', email:'luke@xyz.com', level:'Foundation',stack:'Analytics',targetLevel:'I',targetStack:'Analytics',completion_date:'02-May-2018'},
    {emp_no:2332, ename: 'mary', email:'mary@xyz.com', level:'Pre-Foundation',stack:'Java',targetLevel:'Foundation',targetStack:'Java',completion_date:'15-Jun-2018'},
    {emp_no:2323, ename: 'john', email:'john@xyz.com', level:'Pre-Foundation',stack:'Testing',targetLevel:'Foundation',targetStack:'Testing',completion_date:'20-July-2017'},
    {emp_no:3203, ename: 'joe', email:'joe@xyz.com', level:'T',stack:'Microsoft',targetLevel:'PI',targetStack:'Microsoft',completion_date:'30-Jan-2018'},
    {emp_no:5010, ename: 'ben', email:'ben@xyz.com', level:'Foundation',stack:'Analytics',targetLevel:'I',targetStack:'Java',completion_date:'18-Feb-2018'},
    {emp_no:1011, ename: 'pete', email:'pete@xyz.com', level:'I',stack:'Java',targetLevel:'T',targetStack:'Java',completion_date:'23-Mar-2018'},
    {emp_no:2431, ename: 'ruan', email:'ruan@xyz.com', level:'I',stack:'Testing',targetLevel:'T',targetStack:'Testing',completion_date:'01-Apr-2018'},
    {emp_no:1102, ename: 'mark', email:'mark@xyz.com', level:'Pre-Foundation',stack:'Microsoft',targetLevel:'Foundation',targetStack:'Microsoft',completion_date:'12-Jun-2018'},
    {emp_no:2322, ename: 'elsey', email:'elsey@xyz.com', level:'T',stack:'Testing',targetLevel:'PI',targetStack:'Java',completion_date:'14-Feb-2018'},
    {emp_no:4444, ename: 'amy', email:'amy@xyz.com', level:'I',stack:'Java',targetLevel:'T',targetStack:'Java',completion_date:'31-Dec-2017'},

    
    
  ];
 