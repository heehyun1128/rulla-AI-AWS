import dynamoose from "dynamoose";

export const userSchema= new dynamoose.Schema({
    "userId":{
        type:String,
        
    },
    "name":String,
    "role":String,
    "email":String,
    // "createdAt":{
    //     type:String,
    //     default:()=>new Date().toISOString()
    // }
}, {
    timestamps: true 
})

const UserModel=dynamoose.model("Users",userSchema)


export default UserModel
