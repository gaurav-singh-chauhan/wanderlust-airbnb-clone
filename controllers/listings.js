const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allTrendingListings = await Listing.find({ category: "trending" });
    res.render("listings/index.ejs", {allTrendingListings});
};

module.exports.roomsListings = async (req, res) => {
    const allRoomsListings = await Listing.find({category: "rooms" });
    res.render("listings/rooms.ejs", {allRoomsListings});
};

module.exports.iconicCitiesListings = async (req, res) => {
    const allIconicCitiesListings = await Listing.find({category: "iconic-cities" });
    res.render("listings/iconic-cities.ejs", {allIconicCitiesListings});
};

module.exports.mountainsListings = async (req, res) => {
    const allMountainsListings = await Listing.find({category: "mountains" });
    res.render("listings/mountains.ejs", {allMountainsListings});
};

module.exports.castlesListings = async (req, res) => {
    const allCastlesListings = await Listing.find({category: "castles" });
    res.render("listings/castles.ejs", {allCastlesListings});
};

module.exports.amazingPoolsListings = async (req, res) => {
    const allAmazingPoolsListings = await Listing.find({category: "amazing-pools" });
    res.render("listings/amazing-pools.ejs", {allAmazingPoolsListings});
};

module.exports.campingListings = async (req, res) => {
    const allCampingListings = await Listing.find({category: "camping" });
    res.render("listings/camping.ejs", {allCampingListings});
};

module.exports.farmsListings = async (req, res) => {
    const allFarmsListings = await Listing.find({category: "farms" });
    res.render("listings/farms.ejs", {allFarmsListings});
};

module.exports.arcticListings = async (req, res) => {
    const allArcticListings = await Listing.find({category: "arctic" });
    res.render("listings/arctic.ejs", {allArcticListings});
};

module.exports.domesListings = async (req, res) => {
    const allDomesListings = await Listing.find({category: "domes" });
    res.render("listings/domes.ejs", {allDomesListings});
};

module.exports.boatsListings = async (req, res) => {
    const allBoatsListings = await Listing.find({category: "boats" });
    res.render("listings/boats.ejs", {allBoatsListings});
};

module.exports.renderCreateForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showSpecificListing = async (req, res) => {
    let {id} = req.params;

    let listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: { // Nested Populate
            path: "author"
        },
    })
    .populate("owner");
    
    if(!listing){
        req.flash("error", "Listing doesn't exist!");
        res.redirect("/listings");
    }

    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename };
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if(!listing){
        req.flash("error", "Listing doesn't exist!");
        res.redirect("/listings");
    }
    // Preview image with some cloudinary tranformations
    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {listing, originalImgUrl});
};

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing);

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updatedListing.image = {url,filename};
    await updatedListing.save();
    }
    
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};