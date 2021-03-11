import {api} from '../utils/RestAPI'

export async function RegisterEmployee(workerID,firstName, lastName, DOB, contractType, team, cpr){

         await api.post("add-worker/"+workerID+'/'+firstName+'/'+lastName+'/'+DOB+'/'+contractType+'/'+team+'/'+cpr)
        .then(res=>{
            console.log(res);
            console.log(res.data);

        }).catch(e=>{
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
        })
        
       
    
    
}