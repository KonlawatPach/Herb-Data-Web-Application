const axios = require('axios');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { async } = require('rxjs');

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

//HERBS APIs

app.get('/getherb', async (req, res) => {
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

app.get('/getherbproperty', async (req, res) => {
    const collectionNameArray = ["herb_lists", "propertie", "substance", "side_effect", "forbidden_person"];
    let propertyDataArray = {};

    for(let colName of collectionNameArray){
        let propertyData = [];
        var data = JSON.stringify({
            "collection": colName,
            "database": "herb_data",
            "dataSource": "Cluster0",
        });
        await axios(request('post', data, 'find')).then((response) => {
            propertyData = response.data.documents;
        }).catch((error) => console.log(error))

        if(colName == "herb_lists"){
            propertyData = propertyData.map(obj => obj.taxonomy);
            let biocol = Array(8).fill("");
            let biorow = [];
            for(let bioherb of propertyData){
                for(let biopart of bioherb) biocol[biopart.levelNo-1] = biopart.value;
                biorow.push(biocol);
                biocol = Array(8).fill("");
            }
            propertyDataArray['taxonomy'] = biorow;
        }else{
            propertyDataArray[colName] = propertyData;
        }
    }

    res.send(propertyDataArray);
    res.status(200).end();
});

async function updateProperty(collectionName, propertyTextList, propertyIDList, nameEN){
    if(propertyTextList.length>=1){
        let idArray = [];

        var data = JSON.stringify({
            "collection": collectionName,
            "database": "herb_data",
            "dataSource": "Cluster0",
        });
        var existProperty = [];
        await axios(request('post', data, 'find')).then((response) => {
            existProperty = response.data.documents;
        }).catch((error) => console.log(error))
    
        let propertyOldList = existProperty.filter(value => propertyIDList.includes(value._id));    //กรองเอาเฉพาะตัวที่มีในเลขเก่า
    
        let maxIDPlusOne = 0;
        for(let ep of existProperty){
            maxIDPlusOne = Math.max(maxIDPlusOne, Number(ep._id));
        }
        maxIDPlusOne++;
    
        //map เอาลำดับไอดี คำอธิบายและชื่อสมุนไพรที่มี
        let propertyId = existProperty.map(obj => obj._id);
        let propertyDes;
        if(collectionName == "propertie") propertyDes = existProperty.map(obj => obj.propertie_description);
        else if (collectionName == "substance") propertyDes = existProperty.map(obj => obj.substance_description);
        else if (collectionName == "side_effect") propertyDes = existProperty.map(obj => obj.side_effect_description);
        else if (collectionName == "forbidden_person") propertyDes = existProperty.map(obj => obj.forbidden_description);
        let propertyHerbname = existProperty.map(obj => obj.herb_name);

        //เปรียบเทียบหาตัวที่หายไป
        let propertyDisappear;
        if(collectionName == "propertie") propertyDisappear = propertyOldList.filter(value => !propertyTextList.includes(value.propertie_description));
        else if (collectionName == "substance") propertyDisappear = propertyOldList.filter(value => !propertyTextList.includes(value.substance_description));
        else if (collectionName == "side_effect") propertyDisappear = propertyOldList.filter(value => !propertyTextList.includes(value.side_effect_description));
        else if (collectionName == "forbidden_person") propertyDisappear = propertyOldList.filter(value => !propertyTextList.includes(value.forbidden_description));
    
        //check
        let insertProperty = [] //objectlist
        let updateProperty = [] //[property, ลิสต์ชื่อ]
        let deletePropertyId = [] //_id list
        
        for(let pt of propertyTextList){
            if(propertyDes.includes(pt)){       //ถ้ามีอยู่ให้แก้ไข
                let propertyIndex = propertyDes.indexOf(pt);
                let herbNameList = propertyHerbname[propertyIndex];
                idArray.push(propertyId[propertyIndex]);
                if(!herbNameList.includes(nameEN)){ //มีอยู่แล้วแล้วไม่ได้แก้ไขอะไรเลยด้วย
                    herbNameList.push(nameEN);
                    updateProperty.push([propertyId[propertyIndex], herbNameList]);
                }
            }else{                              //ถ้าไม่มีให้เพิ่ม
                if(pt != ''){
                    idArray.push(maxIDPlusOne);
                    if(collectionName == "propertie"){
                        insertProperty.push({
                            "_id" : maxIDPlusOne,
                            "propertie_description" : pt,
                            "herb_name" : [nameEN]
                        });
                    }
                    else if (collectionName == "substance"){
                        insertProperty.push({
                            "_id" : maxIDPlusOne,
                            "substance_description" : pt,
                            "herb_name" : [nameEN]
                        });
                    }
                    else if (collectionName == "side_effect"){
                        insertProperty.push({
                            "_id" : maxIDPlusOne,
                            "side_effect_description" : pt,
                            "herb_name" : [nameEN]
                        });
                    }
                    else if (collectionName == "forbidden_person"){
                        insertProperty.push({
                            "_id" : maxIDPlusOne,
                            "forbidden_description" : pt,
                            "herb_name" : [nameEN]
                        });
                    }
                    maxIDPlusOne++;
                }
            }
        }
    
        for(let pd of propertyDisappear){
            let propertyIndex = propertyId.indexOf(pd._id);
            let herb_name = propertyHerbname[propertyIndex];
            if(herb_name.length<=1){   //ถ้ามีตัวเดียว
                deletePropertyId.push(propertyId[propertyIndex])
            }
            else{  //ถ้ามี >1 ให้ลบสมาชิกแล้วอัพเดท
                herb_name.splice(herb_name.indexOf(nameEN), 1)
                updateProperty.push([pd._id, herb_name]);
            }
        }
    
        console.log(collectionName);
        console.log(insertProperty);
        console.log(updateProperty);
        console.log(deletePropertyId);
        // ลูปปฏิบัติการ
        // insert new property
        if(insertProperty.length>0){
            var data = JSON.stringify({
                "collection": collectionName,
                "database": "herb_data",
                "dataSource": "Cluster0",
                "documents": insertProperty
            });
            await axios(request('post', data, 'insertMany')).catch((error) => console.log(error));
        }
    
        //update exist property
        for(let plist of updateProperty){
            var data = JSON.stringify({
                "collection": collectionName,
                "database": "herb_data",
                "dataSource": "Cluster0",
                "filter": {
                    '_id' : plist[0] 
                },
                "update": { 
                    "$set": plist[1] 
                }
            });
            await axios(request('post', data, 'updateOne')).catch((error) => console.log(error)); 
        }
    
        //delete empty property
        for(let pid of deletePropertyId){
            var data = JSON.stringify({
                "collection": collectionName,
                "database": "herb_data",
                "dataSource": "Cluster0",
                "filter": {
                    "_id" : pid
                },
            });
            await axios(request('post', data, 'deleteOne')).catch((error) => console.log(error)); 
        }
        return idArray;
    }
    return []
}
app.post('/updateherb', async (req, res) => {
    let _id = await req.body.nameEN;
    let herbObject = await req.body.herbObject;

    //เทียบแต่ละ property
    let propertie = herbObject.propertie;
    let substance = herbObject.substance;
    let side_effect = herbObject.side_effect;
    let forbiddenperson = herbObject.forbiddenperson;

    if(propertie != undefined) herbObject.propertie = await updateProperty('propertie', propertie[0], propertie[1], _id);
    if(substance != undefined) herbObject.substance = await updateProperty('substance', substance[0], substance[1], _id);
    if(side_effect != undefined) herbObject.side_effect = await updateProperty('side_effect', side_effect[0], side_effect[1], _id);
    if(forbiddenperson != undefined) herbObject.forbiddenperson = await updateProperty('forbidden_person', forbiddenperson[0], forbiddenperson[1], _id);

    //อัพเดทอันใหม่ลงไป
    var data = JSON.stringify({
        "collection": "herb_lists",
        "database": "herb_data",
        "dataSource": "Cluster0",
        "filter": {
            "_id" : _id
        },
        "update": {
            "$set": herbObject
        }
    });
    await axios(request('post', data, 'updateOne')).catch((error) => { res.send(error) });
    res.status(200).end();
});

//USER DATA APIs//
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