import { defineArrayMember, defineType } from "sanity";
import { BasketIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const orderType =defineType({
    name: 'order',
    title: 'Order',
    type: 'document',
    icon:BasketIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "stripeCheckputSessionId",
            title: "Stripe Customer ID",
            type: "string",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "stripeCustomerId",
            title: "Stripe Customer ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "CustomerName",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Customer email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "stringPaymentInternetId",
            title: "Stripe Payment Internet ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "products",
            title: "Products",
            type: "array",
            of:[
                defineArrayMember({
                    type:"object",
                    fields:[
                        defineField({
                            name: "product",
                            title: "Product Bought",
                            type: "reference",
                            to:[{type:"product"}],
                        }),
                        defineField({
                            name:"quantity",
                            title:"Quantity Purchased",
                            type:"number",
                        }),
                    ],
                    preview:{
                        select:{
                            product:"product.name",
                            quantity:"quantity",
                            image:"product.image",
                            price:"product.price",
                            currency:"productType.currency",

                        },
                        prepare(select){
                            return{
                            title: `${select.product}x${select.quantity}`,
                            subtitle: `${select.price*select.quantity}`,
                            media:select.image,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "totalPrice",
            title: "Total Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "amountDiscount",
            title: "Amount Discount",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "status",
            title: "Order Status",
            type: "string",
            options:{
            list:[
                {title:"Pending",value:"Pending"},
                { title: "Paid", value: "paid" },   
                { title: "Shipped", value: "shipped" },
                { title: "Deliverd", value: "delivered" },
                { title: "Cancelled", value: "cancelled" }
                ],
                
            },
        }),
        defineField({
            name: "OrderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        
       

        
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId:"orderNumber",
            email:"email"

        },
        prepare(select) {
            const orderIdSnippet=`${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`;
            return {
               title:`${select.name} (${orderIdSnippet})`,
               subtitle:`${select.name} ${select.currency}, ${select.email}`,
               media:BasketIcon,
            };
        },
    },


})