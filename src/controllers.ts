import {sql, insert} from "./db";

interface RestRequest { 
    oprign: string, 
    proxy: string,
    method: String,
    endpoint: string, 
    status: number,
    restTime: () => string 
 };

exports.getOneStudent = async (req, res) => {
    console.log ("endpoint: GET getOneStudent");  
    
    const id: number  = req.params.id | 0; 
    console.log("student id = ", id); 
        
    const student = await sql("SELECT * FROM students WHERE id = ?", id);
    console.log ("db returns = ", student);
    
    // 200 OK: query successful; 400 bad request: query failed
    const status = !!student? 200:400;
    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.origin,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq);   

    return res.status(status).json({student});
};

exports.getAllStudents = async (req, res) => {
    console.log ("endpoint: GET getllStudents");  
      
    const response = await sql("SELECT * FROM students");
    const students = response;
    console.log ("db returns = ", students);
    
    // 200 OK: query successful; 400 bad request: query failed
    const status = !!students? 200:400;
    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.host,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq);   

    return res.status(status).json({ students });
}

exports.getOneCourse = async (req, res) => {
    console.log ("endpoint: GET getOneCourse");  

    const id: number  = req.params.id | 0; 
    console.log("course id = ", id); 
        
    const response = await sql("SELECT * FROM courses  WHERE id = ?", id);
    const course = response;
    console.log ("db returns = ", course);
    
    // 200 OK: query successful; 400 bad request: query failed
    const status = !!course? 200:400;
    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.origin,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq);   

    return res.status(status).json({course});
};
    
exports.getAllCourses = async (req, res) => {
    console.log ("endpoint: GET getAllCourses");  
        
    const response = await sql("SELECT * FROM courses ORDER BY status DESC");
    const courses = response;
    console.log ("db returns = ", courses);
    
    const status = !!courses? 200:400;
    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.host,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq);   

    return res.status(status).json({ courses });
}

//find students in a given course id
exports.getStudentsInCourse = async (req, res) => {
    console.log ("endpoint: GET getStudentsInCourse");      
    const id: number  = req.params.id | 0; 
    console.log("course id = ", id); 
    const query: string = "SELECT s.id, s.name, s.email FROM course_student cs INNER JOIN students s ON s.id = cs.student_id WHERE cs.course_id = ?";
    const resp = await sql(query, id);
    console.log(resp);
    console.log ("db returns = ", resp);
    
    // 200 OK: query successful; 400 bad request: query failed
    let status = 200;
    if (!!resp && !!resp.error && resp.error === true) {
            status = 400;
    }

    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.host,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq);  
    
    if (status === 200) {
         const students = resp;
         return res.status(200).json({students });
    } else {
         const error = {errno: resp.errno, error_code: resp.code};
         return res.status(400).json({ error });
    }
}

//find courses taken by a given student id
exports.getCoursesByStudent = async (req, res) => {
    console.log ("endpoint: GET getCoursesByStudent");       
    const id: number  = req.params.id | 0; 
    console.log("student id = ", id); 
    const query: string = `
         SELECT c.id, c.name, c.status 
            FROM course_student cs 
            INNER JOIN courses c 
            ON c.id = cs.course_id WHERE cs.student_id = ?
        `;

    //console.log(query);
    const resp = await sql(query, id);
    console.log(resp);
    console.log ("db returns = ", resp);
    
    // 200 OK: query successful; 400 bad request: query failed
    let status = 200;
    if (!!resp && !!resp.error && resp.error === true) {
        status = 400;
    }

    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.host,
        method: req.method,
        endpoint: req.url,
        status: status,
        restTime: Date()
    } 
    console.log(incomingReq); 
    
    if (status === 200) {
        const courses = resp;
        return res.status(200).json({courses });
    } else {
        const error = {errno: resp.errno, error_code: resp.code};
        return res.status(400).json({ error });
    }
}

// create new workorder and its relationship with assigned used 
exports.createNewStudent = async (req, res) => {
    console.log ("endpoint: POST createNewStudent");  
      
    const name = req.body.name;
    console.log("name = ", name);
    const email = req.body.email;
    console.log("email = ", email);

    // insert new student to students
    const query: string = "INSERT INTO students (name,email) VALUES (?, ?)";
    console.log("create new student sql");
    console.log(query);
    const resp = await insert(query, name, email);
    
    let status = 200;
    if (!!resp && !!resp.error && resp.error === true) {
        status = 400;
    }

    const incomingReq: RestRequest = {
        origin: req.headers.referer,
        proxy: req.headers.host,
        method: req.method,
        endpoint: req.url,
        status: 200,
        restTime: Date()
    } 
    console.log(incomingReq); 
    
    if (status === 200) {
        const success = {status: "success", "record id": resp.lastID};
        return res.status(200).json({success});
    } else {
        const error = {errno: resp.errno, error_code: resp.code};
        return res.status(400).json({ error });
    }
}

