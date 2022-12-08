import { LightningElement,track,api, wire} from 'lwc';
import { subscribe, MessageContext } from "lightning/messageService";
import ACCOUNT_CHANNEL from "@salesforce/messageChannel/Account_Data__c";
import getContacts from  '@salesforce/apex/FetchAccountController.getContacts';
import getOpportunities from  '@salesforce/apex/FetchAccountController.getOpportunities';


const columns1 = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Email', fieldName: 'Email'}
    
];

const column2= [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Close Date', fieldName: 'CloseDate' },
    { label: 'Stage', fieldName: 'StageName'}
    
];
export default class Task3Child2Lwc extends LightningElement {
    
    @track AccId ="";
    @track conList;
    @track oppList;
    @track column1 = columns1;
    @track column2 = column2;
    @wire(MessageContext)
    messageContext;
    receivedMessage;
    subscription = null;
    connectedCallback(){
        this.subscribeToMessage();
    };
    subscribeToMessage(){
        this.subscription = subscribe(this.messageContext,ACCOUNT_CHANNEL,(message)=>this.handleSub(message));
    };

    handleSub(message){
        console.log(JSON.stringify(message));
        this.AccId = message.recordId;
        console.log("ACCid recived");
        console.log(this.AccId);
        
    };


    @wire(getContacts,{AccId: '$AccId'})
    getContacts({ error, data }) {
        if(data) {
           console.log("method is success");
            this.conList = data;
            console.log(JSON.stringify(data));
           
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    };

    @wire(getOpportunities,{AccId: '$AccId'})
    getOpportunities({ error, data }) {
        if(data) {
           console.log("method is success2");
            this.oppList = data;
            console.log(JSON.stringify(data));
           
        } else if (error) {
            this.error = error;
            console.log(error);
        }
    };

}