import { LightningElement,api, track, wire} from 'lwc';



import getFiles from '@salesforce/apex/LwcFileTableController.getFiles';

const columns = [
    { label: 'Name', fieldName: 'Title' },
    
    { label: 'Created Date', fieldName: 'CreatedDate' },
    { label: 'File Extension', fieldName: 'FileExtension'},
    { label: 'Size', fieldName: 'ContentSize'}
    
];

export default class Task2FileTableShow extends LightningElement {
   
    @track allFiles = [];
   
    @track columns = columns;
    totalRecords = 0; //Total no.of records
    pageSize=10; //No.of records to be displayed per page
    totalPages; //Total no.of pages
    pageNumber = 1; //Page number    
    recordsToDisplay = []; //Records to be displayed on the page
    
    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }




    //wiring an apex method to a function
    @wire(getFiles)
    wiredFiles({ error, data }) {
        if(data) {
           console.log("method is success");
            this.allFiles = data;
            this.totalRecords = this.allFiles.length;
            this.paginationHelper();
            // var listViewData = [];
            // for(var i=0;i<this.allFiles.length;i++){
            //     listViewData.push({"label" : this.allFiles[i].label, "value" : this.allFiles[i].apiName});
        
           // console.log(listViewData);
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    }
    
    @api 
    handleRefresh(){
        console.log("handle refresh is called");
        window.location.reload(false);
        console.log("return to home page");
    }
    previousPage() {
        this.pageNumber = this.pageNumber - 1;
        this.paginationHelper();
    }
    nextPage() {
        this.pageNumber = this.pageNumber + 1;
        this.paginationHelper();
    }
   
    
    paginationHelper() {
        this.recordsToDisplay = [];
        // calculate total pages
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        // set page number 
        if (this.pageNumber <= 1) {
            this.pageNumber = 1;
        } else if (this.pageNumber >= this.totalPages) {
            this.pageNumber = this.totalPages;
        }
        // set records to display on current page 
        for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
            if (i === this.totalRecords) {
                break;
            }
            this.recordsToDisplay.push(this.allFiles[i]);
        }
    }
    }



