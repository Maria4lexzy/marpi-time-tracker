import {api} from '../utils/RestAPI'

export default async function RegisterEmployee(workerID,firstName, lastName, DOB, contractType, team, cpr){
console.log("heer");
         await api.post("add-worker/"+workerID+'/'+firstName+'/'+lastName+'/'+DOB+'/'+contractType+'/'+team+'/'+cpr
)
        .then(res=>{
            console.log(res);
            console.log(res.data);

        }).catch(e=>{
            if(e.response.status==200){
                console.log('WAS 200');
            }
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        })
        
       
    
    
}