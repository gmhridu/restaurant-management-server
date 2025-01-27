const express = require('express');
const app = express()
const cors = require('cors');

require('dotenv').config()


const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


// mongoDB connect

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cibrnya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const menuCollection = client.db("bistroDB").collection('menus');
    const reviewCollection = client.db("bistroDB").collection('reviews');

   app.get('/menus', async(req, res)=> {
    const result = await menuCollection.find().toArray()
    res.send(result)
   })
   app.get('/reviews', async(req, res)=> {
    const result = await reviewCollection.find().toArray();
    res.send(result)
   })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



// routes
app.get('/', (req, res) => {
 res.send("Server is running")
})



app.listen(port, () => {
 console.log(`Server is running on port ${port}`)
})