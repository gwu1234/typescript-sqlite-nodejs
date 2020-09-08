## Node.js and sqlite

It is to demo how to set up sqlite database and node.js as a backend server of a web application.

The main purpose is to show how to forward sql error to frontend  

### 

1) at sql, db.run or db.all catches exception and error:

 db.all(...args)
        .then(
          result=>result;
          )
        .catch(err=>{
              return {error: true, errno: err.errno, code: err.code};
        })

2) at backend controller, forward sql error to frontend

    const resp = await sql(query, id);
    
    let status = 200;
    
    if (!!resp && !!resp.error && resp.error === true) {
    
            status = 400;
    
    }

    if (status === 200) {
  
         return res.status(200).json({resp});
  
    } else {

         const error = {errno: resp.errno, error_code: resp.code};

         return res.status(400).json({ error });

    }


### how to test 

yarn install

yarn start

for GET 

at browse, localhost:4000

at browse, localhost:4000/students

at browse, localhost:4000/student/1

at browse, localhost:4000/courses

at browse, localhost:4000/course/1

at browse, localhost:4000/studentsincourse/1

at browse, localhost:4000/coursesbystudent/1

for POST 

at postman

localhost:4000/addstudent

{
   name:  "name",
   email: "name@mail.com"
}


 