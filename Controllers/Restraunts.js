const Restraunts = require('../Models/Restraunts');

exports.getRestrauntsBylocId = (req, res) => {
    const locId = req.params.locId;
    Restraunts.find({ location_id: locId })
        .then(response => {
            res.status(200).json({
                message: "Restraunts Fetched Successfully",
                Restraunts: response
            })
        })
        .catch(err => {
            res.status(500).json({
                erroe: err
            })
        })
};

exports.restrauntFilter = (req, res) => {
    let { mealtype, location, cuisine, lcost, hcost, sort, page } = req.body;

    sort = sort ? sort : 1;
    //if we get the value of sort then sort in that order otherwise it will sort in ascending order

    page = page ? page : 1;
    const itemsperpage = 2;
    let startIndex, endIndex;

    let filterobj = {};

    mealtype && (filterobj['mealtype_id'] = mealtype);
    location && (filterobj['location_id'] = location);
    cuisine && (filterobj['cuisine_id'] = { $in: cuisine });//cuiseine recieves an array 
    //$ in checks if selected options are present or not
    lcost && hcost && (filterobj['min_price'] = { $lte: hcost, $gte: lcost });
    Restraunts.find(filterobj).sort({ min_price: sort })
        .then(response => {
            //to find the first and the last index
            startIndex = page * itemsperpage - itemsperpage;
            endIndex = page * itemsperpage;
            const filterResponse = response.slice(startIndex, endIndex);
            let arr = [];
            for (let i = 1; i <= Math.ceil(response.length / itemsperpage); i++) {
                arr.push(i);
            }
            res.status(200).json({
                message: "Filter applied Successfully",
                restraunts: filterResponse,
                currentPage: page,
                pageCount : arr
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};
       
exports.getRestrauntsByresId = (req, res) => {
    const { resId } = req.params;
    Restraunts.findById(resId)
        .then(response => {
            res.status(200).json(
                {
                    message: "Restaurants Fetched Succesfully",
                    restaurant: response
                }
            )
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
};

