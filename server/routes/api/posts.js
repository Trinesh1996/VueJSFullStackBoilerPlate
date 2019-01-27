const express = require("express")
const mongodb = require("mongodb")

const router = express.Router();


// Show Post Data
router.get("/", async (req, res) => {
    const posts = await loadPostsCollection()
    res.json(await posts.find({}).toArray())
   
})

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

// Delete Posts

router.delete('/:id', async (req, res) => {
    const posts  = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})



// Connect to database
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://trinesh:Universe1997@ds213705.mlab.com:13705/jukepainter', {
            useNewUrlParser: true
        
    })
    return client.db('jukepainter').collection('posts')
}



module.exports = router;