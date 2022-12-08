import { LightningElement,api } from 'lwc';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class Task2Uploader extends LightningElement {

    @api recordId;
    get acceptedFormats() {
        return ['.pdf', '.png','.jpg','.jpeg'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        console.log("fire message11");
        this.template.querySelector('c-task2-file-table-show').handleRefresh();
        console.log("handle refresh is finished");
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
            //getRecordNotifyChange(this.recordId),
            
            
        );
        
    }
   

}