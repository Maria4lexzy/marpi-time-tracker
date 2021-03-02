const rules ={
    visitor:{
        static:["visit", "sign-in:visit"]
    },
    worker:{
        static:[
            "users:getSelf",
            "dashbaord:visit",
            "worker-profile-page:visit"    
        ],
        dynamic:{
            "profile:edit":({userId, documentId}) =>{
                if(!userId || !documentId) return false;
                return userId === documentId;
            }
        }
    },
    admin:{
        static: [
            "users:create",
            "users:edit",
            "users:get",
            "users:getSelf",
            "dashboard:visit",
            "manager-profile-page:visit"
        ]
    }
};

export default rules;