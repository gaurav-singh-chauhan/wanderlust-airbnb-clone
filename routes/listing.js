const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");    
// Middlewares
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
// const upload = multer({dest: "uploads/"});
const upload = multer({storage});

router
.route("/")
.get(wrapAsync(listingController.index)) // Index Route ->
.post( // Create Listing ->
    isLoggedIn, 
    upload.single("listing[image]"), // middleware to store image file on Cloud
    validateListing, 
    wrapAsync(listingController.createListing)
);

router.get("/rooms",
    wrapAsync(listingController.roomsListings)
);

router.get("/iconic-cities",
    wrapAsync(listingController.iconicCitiesListings)
);

router.get("/mountains",
    wrapAsync(listingController.mountainsListings)
);

router.get("/castles",
    wrapAsync(listingController.castlesListings)
);

router.get("/amazing-pools",
    wrapAsync(listingController.amazingPoolsListings)
);

router.get("/camping",
    wrapAsync(listingController.campingListings)
);

router.get("/farms",
    wrapAsync(listingController.farmsListings)
);

router.get("/arctic",
    wrapAsync(listingController.arcticListings)
);

router.get("/domes",
    wrapAsync(listingController.domesListings)
);

router.get("/boats",
    wrapAsync(listingController.boatsListings)
);

// Render Create Form Route ->
router.get( 
    "/new", 
    isLoggedIn,
    listingController.renderCreateForm
);

router
.route("/:id")
.get(listingController.showSpecificListing) // Show specific Listing
.patch( // Update Listing
    isLoggedIn, 
    isOwner,
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing)
)
.delete( // Delete Specific Listing
    isLoggedIn, isOwner, 
    wrapAsync(listingController.destroyListing)
);

// Render Edit Form Route->
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner, 
    listingController.renderEditForm
);


module.exports = router;