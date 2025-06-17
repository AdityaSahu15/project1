import mongoose,{Schema} from "mongoose";


const productSchema=new Schema(
    {
        productName:{
            type:String,
            required:true,
            trim:true,
        },
        productPrice:{
            type:Number,
            required:true,
            trim:true,
        },
        productDescription:{
            type:String,
            trim:true,
        },
        productStock:{
            type:Number,
            required:true,
        },
        productImage:{
            type:String
        },
        productBrand:{
            type:String,
        },
        productCategory:{
            type:String,
        }
    },{timestamps:true})

    export const Product =mongoose.model("Product",productSchema)