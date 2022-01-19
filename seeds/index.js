const mongoose=require('mongoose');
const cities = require('./cities');
const campground = require('../models/campground');
const {places,descriptors}=require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await campground.deleteMany({});
    for(let i=0; i<300;i++){
        const  random1000 = Math.floor(Math.random() * 1000);
        const  price = Math.floor(Math.random() * 20)+10;
        const camp = new campground({
            author: '61e6ee26c3ccb388f291b26d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nesciunt veritatis distinctio? Deserunt magnam a architecto reiciendis assumenda commodi rem error tempore quos omnis. Autem blanditiis vero numquam corporis exercitationem.`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dhnwmtttu/image/upload/v1642528415/YelpCamp/egytxqsnclckbovyxikj.jpg',
                  filename: 'YelpCamp/zxjevatfz69vdqcip842',
                },
                {
                    url: 'https://res.cloudinary.com/dhnwmtttu/image/upload/v1642528415/YelpCamp/ipqkfco3lefaxdfoqjfv.jpg',
                  filename: 'YelpCamp/t8niu8b3zcfaryyyfn3t',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    db.close();
});
