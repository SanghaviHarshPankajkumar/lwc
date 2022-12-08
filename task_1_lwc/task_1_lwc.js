import { LightningElement, api  } from 'lwc';

export default class Task_1_lwc extends LightningElement {
    
   showclick
   @api imageUrl
    openfileUpload(event) {
        const file = event.target.files[0]
     this.imageUrl=  URL.createObjectURL(event.target.files[0]);
       this.showclick = false;
            console.log(imageUrl);
        
            
    }
    handleClick(event) {
        this.showclick = true;
    }
}