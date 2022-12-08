import { LightningElement,track,api, wire} from 'lwc';
import { publish, MessageContext } from "lightning/messageService";
import ACCOUNT_CHANNEL from "@salesforce/messageChannel/Account_Data__c";
import getAccounts from  '@salesforce/apex/FetchAccountController.getAccounts';

export default class Task3Child1Lwc extends LightningElement {
  
    @track allFiles=[];
    @track tempFiles;
    @track value="";
    @wire(MessageContext)
    messageContext;

   connectedCallback(){
    getAccounts()
    .then(data =>{
        let arr=[];
        console.log("connected callback called");
        for(var i=0;i<data.length;i++){
            arr.push({label:data[i].Name , value: data[i].Id});
            console.log(arr.label+arr.key);
        }
        this.allFiles = arr;
    })
   }
   
    get options(){
        return this.allFiles;
    }

   
    handleChange(event) {
        this.value = event.detail.value;
        this.valueText = "Event Selected";  
        console.log(this.value);
        const messaage = {
            recordId: this.value
          };
      
          //4. Publishing the message
          if(this.value===""){
            console.log("it is empty");
          }
          publish(this.messageContext, ACCOUNT_CHANNEL, messaage);
          console.log("publish successfully");
     }

}