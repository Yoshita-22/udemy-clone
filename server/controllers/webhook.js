import {Webhook} from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import { purchase } from "../models/Purchase.js";
import course from "../models/Course.js";
//Api Controller Function to manage clerk user with database
export const clerkWebhooks = async(req,res)=>{
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })

        const {data,type} = req.body;
        console.log(data);
        switch(type){
            case 'user.created':{
                const userData = {
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated':{
                const userData = {
                    email:data.email_addresses[0].email_address,
                    name:data.first_name+" "+data.last_name,
                    imageUrl:data.image_url
                }
                await User.findByIdAndUpdate(data.id,userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }
    }catch(err){
        res.json({success:false,message:err.message});
    }
}
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeWebhooks = async (request, response) => {
 
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRETKEY
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  } 

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });
        if (!session.data.length) {
          return response.status(404).send("Checkout session not found");
        }
        const { purchaseId } = session.data[0].metadata;

        const purchaseData = await purchase.findById(purchaseId);

        if (!purchaseData) {
          return response.status(404).send("Purchase not found");
        }

        const userData = await User.findById(purchaseData.userId);
        const courseData = await course.findById(purchaseData.courseId);
        if (!userData) {  
          return response.status(404).send("User not found");
        }else{
          userData.enrolledCourses.push(courseData._id);
          await userData.save()
        }
        if (!courseData) {
          return response.status(404).send("Course not found");
        }else{
          courseData.enrolledStudents.push(userData._id);
          await courseData.save();
          }


        purchaseData.status = "completed";
        await purchaseData.save();

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;

        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
        });

        const { purchaseId } = session.data[0].metadata;
        
        const purchaseData = await purchase.findById(purchaseId);
        purchaseData.status = "failed";
        await purchaseData.save();

        break;
      }

      default:
        console.log("Unhandled event type");
    }

    // ✅ Respond to Stripe
    return response.status(200).send({ received: true });
  } catch (error) {
    response.status(500).send(`Webhook Handler Error: ${error.message}`);
  }
};
