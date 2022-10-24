const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Required Field"] },
    country: { type: String, required: [true, "Required Field"] },
    background: { type: String, default: "null" },
    poster: { type: String, default: "null" },
    language: { type: String, default: "null" },
    popularity: { type: Number, default: "null" },
    genres: { type: Array, default: [] },
    rating: { type: Number, required: [true, "Required Field"] },
    vote_count: { type: Number, required: [true, "Required Field"] },
    tmdbId: { type: Number, default: 0},
    year: { type: Number, default: "null" },
    plot: { type: String, required: [true, "Required Field"], default: "null" },
    userId: { type: String, required: [true, "Required Field"]}
}, { timestamps: true })
// , unique: [true, "Duplicate Entry Schema Validation Error"] 
// , unique: [true, "Duplicate Entry Schema Validation Error"]  //note this 
const Wishlist = mongoose.model('wishlist', wishlistSchema)

module.exports = Wishlist;