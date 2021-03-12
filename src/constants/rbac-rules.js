const rules ={
    visitor:{
        static:["visit", "sign-in:visit"]
    },
    worker:{
        static:[
            "worker-application:visit",

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
            "manager-profile-page:visit",
            "manager-application:visit"
        ]
    },
    manager:{
        static:[
            "manager-application:visit"
        ]
    }
};

export default rules;