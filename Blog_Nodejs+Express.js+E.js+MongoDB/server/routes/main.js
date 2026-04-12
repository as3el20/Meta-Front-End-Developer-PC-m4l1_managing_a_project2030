const Express = require('express');
const Router = Express.Router();
const Post = require('../models/post');


// Router.get('/', (req,res)=>{
//     res.send('Hello Nodjs');
// });

/*
Get:
Home
 */

Router.get('/', async (req,res)=>{

    try {
        const local = {
        title:"Nodejs Blog",
        Description:"Simple Blog Created By Nodejs"
    }
    //pagination
      let perPage = 7;
      let page = req.query.page || 1;

      const data = await Post.aggregate([{$sort:{createdAt:-1}}])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

      const count = await Post.count;
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);

      res.render('index',{
        local,
        data,
        current:page,
        nextPage:hasNextPage ? nextPage : null
      });

      
    } catch (error) {
      console.log(error);
    }
});

/*
GET:
Post:id
 */
Router.get('/post/:id', async (req,res)=>{

    try {


      let slug = req.params.id;
      const data = await Post.findById({_id:slug});
      const local = {
      title:data.title,
      Description:"Simple Blog Created By Nodejs"
  }
      res.render('post',{local,data});

      
    } catch (error) {
      console.log(error);
    }
});

/*
POst:
Post:searchTerm
 */

Router.post('/search', async (req,res)=>{ 

    try {


  
      const local = {
      title:'search',
      Description:"Simple Blog Created By Nodejs"
       }

       let SerachTerm = req.body.searchTerm;
       let noSpecialChar = SerachTerm.replace(/[^a-zA-Z0-9]/g,"");
       const data = await Post.find({
        $or:[
          {title:{$regex:new RegExp(noSpecialChar,'i')}},
          {body:{$regex:new RegExp(noSpecialChar,'i')}},
        ]
       })
  
      res.render('search',{
        data,local
      });

      
    } catch (error) {
      console.log(error);
    }
});

// function insertPostData () {
//   Post.insertMany([
//     {
//       title: "Building APIs with Node.js",
//       body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
//     },
//     {
//       title: "Deployment of Node.js applications",
//       body: "Understand the different ways to deploy your Node.js applications, including on-premises, cloud, and container environments..."
//     },
//     {
//       title: "Authentication and Authorization in Node.js",
//       body: "Learn how to add authentication and authorization to your Node.js web applications using Passport.js or other authentication libraries."
//     },
//     {
//       title: "Understand how to work with MongoDB and Mongoose",
//       body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
//     },
//     {
//       title: "build real-time, event-driven applications in Node.js",
//       body: "Socket.io: Learn how to use Socket.io to build real-time, event-driven applications in Node.js."
//     },
//     {
//       title: "Discover how to use Express.js",
//       body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//     },
//     {
//       title: "Asynchronous Programming with Node.js",
//       body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
//     },
//     {
//       title: "Learn the basics of Node.js and its architecture",
//       body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
//     },
//     {
//       title: "NodeJs Limiting Network Traffic",
//       body: "Learn how to limit netowrk traffic."
//     },
//     {
//       title: "Learn Morgan - HTTP Request logger for NodeJs",
//       body: "Learn Morgan."
//     },
//   ])
// }

// insertPostData();












Router.get('/about', (req,res)=>{
    res.render('about');
});

module.exports=Router