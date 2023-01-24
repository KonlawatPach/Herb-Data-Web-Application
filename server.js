const axios = require('axios');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.raw());            

function request(method, data, action){
    return {
        method: method,
        url: 'https://data.mongodb-api.com/app/data-ijktw/endpoint/data/v1/action/'+action,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'pBBxWErJ10vtVXKQTqnPpzsud688MlnMvkBSYiWW93vSBVLBDGD1OtpsqWcvTjDt',
        },
        data: data
    }
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

app.get('/getherb', async (req, res) => {
    // const promise = await axios(config);
    var data = JSON.stringify({
        "collection": "herb_lists",
        "database": "herb_data",
        "dataSource": "Cluster0",
    });

    res.send(
        await axios(request('post', data, 'find')).then((response) => response.data.documents)
        .catch((error) => console.log(error))
    );
    res.status(200).end();
});

app.post('/updateherb', async (req, res) => {
    
});


//USER DATA//
app.get('/getalluser', async (req, res) => {
    var data = JSON.stringify({
        "collection": "user",
        "database": "herb_data",
        "dataSource": "Cluster0",
    });

    res.send(
        await axios(request('post', data, 'find')).then((response) => response.data.documents)
        .catch((error) => console.log(error))
    );
    res.status(200).end();
});

app.post('/register', async (req, res) => {
    //get user lastID
    var data = {
        "collection": "user",
        "database": "herb_data",
        "dataSource": "Cluster0",
    };
    lastID = ''
    await axios(request('post', data, 'find')).then((response) => {
        getdata = response.data.documents
        getdata = getdata.map((obj) => Object.entries(obj)[0][1]);
        lastID = getdata.sort().reverse()[0]
        // console.log(lastID);
    })
    .catch((error) => {
        lastID = 'error';
        // console.log(error);
    })

    //insert new user
    if(lastID != 'error'){
        let document = await req.body;
        document['_id'] = pad((Number(lastID)+1).toString(), 8);
        document['userstatus'] = 'request';
        data['document'] = document;
        // console.log(data);
        await axios(request('post', data, 'insertOne')).then((response) => {
            res.send({'status': 'complete'});
        })
        .catch((error) => {
            res.send(error);
        })
    }else{
        res.send({'status': 'error'});
    }
    res.status(200).end();
});

app.post('/confirmuser', async (req, res) => {
    let nowemail = await req.body['email'];
    var data = JSON.stringify({
        "collection": "user",
        "database": "herb_data",
        "dataSource": "Cluster0",
        "filter": {
            "email" : nowemail
        },
        "update": { "$set": { "userstatus": 'confirm' } }
    });
    await axios(request('post', data, 'updateOne')).then((response) => {
        getdata = response.data
        res.send(getdata);
    })
    .catch((error) => {
        res.send(error);
    })
    res.status(200).end();
});

app.post('/deleteuser', async (req, res) => {
    let nowemail = await req.body['email'];
    var data = JSON.stringify({
        "collection": "user",
        "database": "herb_data",
        "dataSource": "Cluster0",
        "filter": {
            "email" : nowemail
        }
    });
    await axios(request('post', data, 'deleteOne')).then((response) => {
        getdata = response.data
        res.send(getdata);
    })
    .catch((error) => {
        res.send(error);
    })
    res.status(200).end();
});

app.post('/login', async (req, res) => {
    let nowemail = await req.body['email'];
    let nowpassword = await req.body['password'];

    //get user lastID
    var data = JSON.stringify({
        "collection": "user",
        "database": "herb_data",
        "dataSource": "Cluster0",
        "filter": {
            "email" : nowemail
        }
    });
    var getdata = {}
    await axios(request('post', data, 'findOne')).then((response) => {
        getdata = response.data.document
        console.log(getdata);
    })
    .catch((error) => {
        console.log(error);
    })

    //check user
    if(getdata != null && getdata.email == nowemail && atob(getdata.password) == nowpassword){
        getdata['status'] = 'complete'
        res.send(getdata);
    }else{
        res.send({'status': 'invalid email or password'});
    }
    res.status(200).end();
});

app.post('/checkstatuslogin', async (req, res) => {
    
});


app.listen(9000, () => {
    console.log('Application is running on port 9000');
});

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