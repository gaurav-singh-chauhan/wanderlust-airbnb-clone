const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const mongoUrl = "mongodb://127.0.0.1:27017/wonderlust";
const Review = require("./review");

// async function main(){
//     await mongoose.connect(mongoUrl);
// }

// main();

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["trending", "rooms", "iconic-cities", "mountains", "castles", "amazing-pools", "camping", "farms", "arctic", "domes", "boats"],
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
        // type: String,
        // default: "https://unsplash.com/photos/brown-stone-near-sea-at-golden-hour-vmZ2DehWQ3Q",
        // set: (v) => 
        // v === "" // if
        // ? "https://unsplash.com/photos/brown-stone-near-sea-at-golden-hour-vmZ2DehWQ3Q" // if true do this 
        // : v , // else
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    };
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

