/**
 * this component takes the rules that you defined and decides 
 * whether or not users can perform the desired action or see some part of the UI. 
 * If the answer is yes, then the Can component renders the yes prop. 
 * Otherwise, the component renders the no prop.
 */

 import rules from '../constants/rbac-rules';
 //check whether the user had permission
 //returns true or false
 const check=(rules,role,action,data)=>{
     const permissions = rules[role];
     if(!permissions){
         //rolse is not present
         console.log("role is not present");
         return false;
     }

     const staticPermissions = permissions.static;

     if(staticPermissions && staticPermissions.includes(action)){
         //static rule not provided for action
         console.log("static rule not provided for action");
         return true;
     }
     const dynamicPermissions=permissions.dynamic;

     if(dynamicPermissions){
         const permissionCondition=dynamicPermissions[action];
       if(!permissionCondition){
             //dynamic rule not provided for action
         console.log("dynamic rule not provided for action");
         return false;
       }     
       return permissionCondition(data);

     }
     return false;
 };
//renders components based on the return value of check : if use has permission or not
 const Can = props=>
 {
     let roleArray = [];
     if(props.role.worker)
     {
        roleArray.push("worker");
     }
     else if(props.role.manager)
     {
         roleArray.push("manager");
     }
     else if(props.role.admin)
     {
         roleArray.push("admin");
     }
     else{
         roleArray.push("visitor");
     }
     console.log(roleArray);
   return  check(rules, roleArray, props.perform, props.data) 
    ? props.yes()
    : props.no();
   
 }
     
 Can.defaultProps={
    yes:()=>null,
    no: ()=>null
};
 export default Can;