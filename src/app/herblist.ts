// import { MongoClient } from 'mongodb';



// async function main() {
    // const uri = "mongodb+srv://KonlawatPach:ppaacchh2543@cluster0.ufqqckp.mongodb.net/?retryWrites=true&w=majority";
    // const client = new MongoClient(uri);
    // const dbName = 'herb_lists';

    // // Use connect method to connect to the server
    // await client.connect();
    // console.log('Connected successfully to server');
    // const db = client.db(dbName);
    // const collection = db.collection('herb_data');

    // // the following code examples can be pasted here...

    // return collection;
// }

// export const herb_data = async () => await main()








export const herb_data = [
    {
        "_id" : "Turmeric",
        "nameTH" : "ขมิ้นชัน",
        "description" : "การทดสอบผลในผู้ป่วยโรคท้องอืดเฟ้อ ในโรงพยาบาล 6 แห่ง จำนวน 116 ราย แบ่งกลุ่มผู้ป่วยโดยวิธีสุ่มเป็น 3 กลุ่ม ได้แก่ กลุ่มที่ได้รับแคปซูลยาหลอก กลุ่มที่ได้รับยาแก้ท้องอืด และกลุ่มที่ได้รับขมิ้นชัน ทุกกลุ่มรับประทานครั้งละ 2 แคปซูล วันละ 4 ครั้ง ก่อนอาหาร และก่อนนอน นาน 7 วัน พบว่ากลุ่มที่ได้รับยาหลอกอาการดีขึ้น หรือหายไป 53% ขณะที่กลุ่มที่ได้รับยาแก้ท้องอืด หรือขมิ้นชัน อาการดีขึ้นหรือหายไป 83% และ 87% ตามลำดับ ซึ่งแตกต่างจากกลุ่มที่ได้รับยาหลอกอย่างมีนัยสำคัญ อัตราการเกิดผลแทรกซ้อนที่เกิดขึ้นไม่แตกต่างกันระหว่าง 3 กลุ่ม เป็นอาการที่ไม่รุนแรง และหายเองได้ (คณะกรรมการแห่งชาติด้านยา, 2549)",
        "picture" : "https://apps.phar.ubu.ac.th/thaicrudedrug/images/thumbnail/1339543967.jpg"
    },
    {
        "_id" : "Lemon Grass",
        "nameTH" : "ตะไคร้",
        "description" : "ตะไคร้ เป็นพืชสมุนไพรท้องถิ่นในประเทศแถบเอเชียเขตร้อน มีลักษณะคล้ายหญ้าและมีใบสูงยาวส่งกลิ่นเฉพาะตัว นอกจากนำมาใช้ประกอบอาหาร ปรุงแต่งกลิ่นในอาหาร และทำเครื่องดื่มแล้ว ตะไคร้ยังถูกนำไปใช้ในหลากสาขา เช่น อุตสาหกรรมสบู่ เครื่องสำอาง การบำบัดด้วยกลิ่น หรือการสกัดเป็นยารักษา โดยมีความเชื่อว่าสารเคมีในตะไคร้ที่มีฤทธิ์ต้านอนุมูลอิสระ อาจสามารถช่วยป้องกันการเติบโตของแบคทีเรียกับยีสต์ได้ ช่วยลดอาการปวดเมื่อยกล้ามเนื้อ บรรเทาอาการปวดและลดไข้ ช่วยกระตุ้นการไหลเวียนของเลือดในระหว่างมีประจำเดือน และเป็นส่วนผสมในสารที่ช่วยไล่ยุงได้ เป็นต้น",
        "picture" : "https://res.cloudinary.com/dk0z4ums3/image/upload/v1502873621/attached_image_th/%E0%B8%95%E0%B8%B0%E0%B9%84%E0%B8%84%E0%B8%A3%E0%B9%89-%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%84%E0%B8%B8%E0%B8%93-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C-pobpad.jpg"
    },
    {
        "_id" : "Key Lime",
        "nameTH" : "มะนาว",
        "description" : "หลายคนสงสัยว่า แล้วคำว่า Lemon ที่ในบ้านเราเข้าใจว่ามันคือมะนาว แล้วตกลงมันคืออะไร จริง ๆ แล้วเลมอน (Lemon) ความหมายที่ถูกต้องของมันก็คือ ผลส้มชนิดหนึ่งที่มีหัวท้ายมนหรือมะนาวที่มีผลเป็นลูกออกสีเหลืองใหญ่ ไม่ใช่ผลกลม ๆ สีเขียวลูกเล็ก ๆ อย่างมะนาวที่เราคุ้นเคย",
        "picture" : "https://medthai.com/wp-content/uploads/2013/07/Lime-1.jpg"
    },
    {
        "_id" : "Onion",
        "nameTH" : "หอมใหญ่",
        "description" : "หอมใหญ่ เป็นพืชหัว (bulb) ปลูกได้ในช่วงฤดูหนาว สามารถปลูกได้ในดินทุกชนิดที่มีการระบายน้ำและอากาศดี เจริญได้ดีที่ค่าความเป็นกรด-เบสช่วง 6.0–6.8 อุณหภูมิที่เหมาะสมอยู่ในช่วง 15–24 องศาเซลเซียส และมีความเค็มของดินปานกลาง เป็นพืชล้มลุก ตระกูลเดียวกับหอมแดง ต้นสูงประมาณ 30-40 เซนติเมตร ลำต้นเป็นหัวอยู่ใต้ดิน มีลักษณะกลม มีเปลือกนอกบางๆหุ้มอยู่ เมื่อแห้งจะมีสีน้ำตาลอ่อน ภายในเป็นกาบสีขาวซ้อนกัน ลักษณะของดอกมีสีขาว เป็นช่อ มีดอกย่อยเป็นจำนวนมาก ก้านช่อดอกยาว แทงออกจากลำต้นใต้ดิน [1] ช่วงเวลาในการเพาะปลูกและเก็บผลผลิต : ให้ผลผลิต 2 ครั้งใน 1 ปี คือ ช่วงเดือน มกราคม ถึง เมษายน และในช่วงเดือน พฤศจิกายน ถึง กุมภาพันธ์[2]",
        "picture" : "data:image/jpeg;base64,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"
    }
]

// app.get('/products', async (req:any, res:any) => {
//     const products = await Product.find({});
//     res.json(products);
// });


// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "herb_lists",
//     "database": "herb_data",
//     "dataSource": "Cluster0",
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-ijktw/endpoint/data/v1/action/findOne',
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Request-Headers': '*',
//         'api-key': 'pBBxWErJ10vtVXKQTqnPpzsud688MlnMvkBSYiWW93vSBVLBDGD1OtpsqWcvTjDt',
//     },
//     data: {
//         "collection": "herb_lists",
//         "database": "herb_data",
//         "dataSource": "Cluster0",
//     }
// };
            
// export const herb_data = async () => await axios(config)
//     .then(function (response:any) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error:any) {
//         console.log(error);
//     });


/////////////////////////////////////////////////////////////////////////////

// export const herb_data = [
//     {
//         "_id" : "Turmeric",
//         "nameTH" : "ขมิ้นชัน",
//         "description" : "การทดสอบผลในผู้ป่วยโรคท้องอืดเฟ้อ ในโรงพยาบาล 6 แห่ง จำนวน 116 ราย แบ่งกลุ่มผู้ป่วยโดยวิธีสุ่มเป็น 3 กลุ่ม ได้แก่ กลุ่มที่ได้รับแคปซูลยาหลอก กลุ่มที่ได้รับยาแก้ท้องอืด และกลุ่มที่ได้รับขมิ้นชัน ทุกกลุ่มรับประทานครั้งละ 2 แคปซูล วันละ 4 ครั้ง ก่อนอาหาร และก่อนนอน นาน 7 วัน พบว่ากลุ่มที่ได้รับยาหลอกอาการดีขึ้น หรือหายไป 53% ขณะที่กลุ่มที่ได้รับยาแก้ท้องอืด หรือขมิ้นชัน อาการดีขึ้นหรือหายไป 83% และ 87% ตามลำดับ ซึ่งแตกต่างจากกลุ่มที่ได้รับยาหลอกอย่างมีนัยสำคัญ อัตราการเกิดผลแทรกซ้อนที่เกิดขึ้นไม่แตกต่างกันระหว่าง 3 กลุ่ม เป็นอาการที่ไม่รุนแรง และหายเองได้ (คณะกรรมการแห่งชาติด้านยา, 2549)",
//         "picture" : "https://apps.phar.ubu.ac.th/thaicrudedrug/images/thumbnail/1339543967.jpg"
//     },
//     {
//         "_id" : "Lemon Grass",
//         "nameTH" : "ตะไคร้",
//         "description" : "ตะไคร้ เป็นพืชสมุนไพรท้องถิ่นในประเทศแถบเอเชียเขตร้อน มีลักษณะคล้ายหญ้าและมีใบสูงยาวส่งกลิ่นเฉพาะตัว นอกจากนำมาใช้ประกอบอาหาร ปรุงแต่งกลิ่นในอาหาร และทำเครื่องดื่มแล้ว ตะไคร้ยังถูกนำไปใช้ในหลากสาขา เช่น อุตสาหกรรมสบู่ เครื่องสำอาง การบำบัดด้วยกลิ่น หรือการสกัดเป็นยารักษา โดยมีความเชื่อว่าสารเคมีในตะไคร้ที่มีฤทธิ์ต้านอนุมูลอิสระ อาจสามารถช่วยป้องกันการเติบโตของแบคทีเรียกับยีสต์ได้ ช่วยลดอาการปวดเมื่อยกล้ามเนื้อ บรรเทาอาการปวดและลดไข้ ช่วยกระตุ้นการไหลเวียนของเลือดในระหว่างมีประจำเดือน และเป็นส่วนผสมในสารที่ช่วยไล่ยุงได้ เป็นต้น",
//         "picture" : "https://res.cloudinary.com/dk0z4ums3/image/upload/v1502873621/attached_image_th/%E0%B8%95%E0%B8%B0%E0%B9%84%E0%B8%84%E0%B8%A3%E0%B9%89-%E0%B8%AA%E0%B8%A3%E0%B8%A3%E0%B8%9E%E0%B8%84%E0%B8%B8%E0%B8%93-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%82%E0%B8%A2%E0%B8%8A%E0%B8%99%E0%B9%8C-pobpad.jpg"
//     },
//     {
//         "_id" : "Key Lime",
//         "nameTH" : "มะนาว",
//         "description" : "หลายคนสงสัยว่า แล้วคำว่า Lemon ที่ในบ้านเราเข้าใจว่ามันคือมะนาว แล้วตกลงมันคืออะไร จริง ๆ แล้วเลมอน (Lemon) ความหมายที่ถูกต้องของมันก็คือ ผลส้มชนิดหนึ่งที่มีหัวท้ายมนหรือมะนาวที่มีผลเป็นลูกออกสีเหลืองใหญ่ ไม่ใช่ผลกลม ๆ สีเขียวลูกเล็ก ๆ อย่างมะนาวที่เราคุ้นเคย",
//         "picture" : "https://medthai.com/wp-content/uploads/2013/07/Lime-1.jpg"
//     },
//     {
//         "_id" : "Onion",
//         "nameTH" : "หอมใหญ่",
//         "description" : "หอมใหญ่ เป็นพืชหัว (bulb) ปลูกได้ในช่วงฤดูหนาว สามารถปลูกได้ในดินทุกชนิดที่มีการระบายน้ำและอากาศดี เจริญได้ดีที่ค่าความเป็นกรด-เบสช่วง 6.0–6.8 อุณหภูมิที่เหมาะสมอยู่ในช่วง 15–24 องศาเซลเซียส และมีความเค็มของดินปานกลาง เป็นพืชล้มลุก ตระกูลเดียวกับหอมแดง ต้นสูงประมาณ 30-40 เซนติเมตร ลำต้นเป็นหัวอยู่ใต้ดิน มีลักษณะกลม มีเปลือกนอกบางๆหุ้มอยู่ เมื่อแห้งจะมีสีน้ำตาลอ่อน ภายในเป็นกาบสีขาวซ้อนกัน ลักษณะของดอกมีสีขาว เป็นช่อ มีดอกย่อยเป็นจำนวนมาก ก้านช่อดอกยาว แทงออกจากลำต้นใต้ดิน [1] ช่วงเวลาในการเพาะปลูกและเก็บผลผลิต : ให้ผลผลิต 2 ครั้งใน 1 ปี คือ ช่วงเดือน มกราคม ถึง เมษายน และในช่วงเดือน พฤศจิกายน ถึง กุมภาพันธ์[2]",
//         "picture" : "data:image/jpeg;base64,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"
//     }
// ]