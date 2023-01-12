const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());


var data = JSON.stringify({
    "collection": "herb_lists",
    "database": "herb_data",
    "dataSource": "Cluster0",
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-ijktw/endpoint/data/v1/action/find',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'pBBxWErJ10vtVXKQTqnPpzsud688MlnMvkBSYiWW93vSBVLBDGD1OtpsqWcvTjDt',
    },
    data: data
};
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

app.get('/getherb', async (req, res) => {
    const promise = await axios(config)
    res.send(
        await axios(config).then((response) => response.data)
        .catch((error) => console.log(error))
    );
    res.status(200).end();
});

app.listen(9000, () => {
    console.log('Application is running on port 9000');
});

    // const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// require('dotenv').config();
// const { MONGO_USERNAME, MONGO_PASSWORD, CLUSTER } = process.env;

// app.use(express.json());
// mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${CLUSTER}.ufqqckp.mongodb.net/?retryWrites=true&w=majority`, {
//     useNewUrlParser: true
// })
// // // สร้าง database schema
// // const Cat = mongoose.model('Cat', { name: String });
// // // สร้าง instance จาก model
// // const kitty = new Cat({ name: 'JavaScript' });
// // // save ลง database (return เป็น Promise)
// // kitty.save().then(() => console.log('meow'));

// // mock data
// const products = [
//   {
//     id: '1001',
//     name: 'Node.js for Beginners',
//     category: 'Node',
//     price: 990
//   },
//   {
//     id: '1002',
//     name: 'React 101',
//     category: 'React',
//     price: 3990
//   },
//   {
//     id: '1003',
//     name: 'Getting started with MongoDB',
//     category: 'MongoDB',
//     price: 1990
//   }
// ];

// app.get('/products', (req, res) => {
//   res.json(products);
// });

// app.get('/products/:id', (req, res) => {
//   const { id } = req.params;
//   const result = products.find((product) => product.id === id);
//   res.json(result);
// });

// app.post('/products', (req, res) => {
//   const payload = req.body;
//   res.json(payload);
// });

// app.put('/products/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({ id });
// });

// app.delete('/products/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({ id });
// });

// app.listen(9000, () => {
//   console.log('Application is running on port 9000');
// });