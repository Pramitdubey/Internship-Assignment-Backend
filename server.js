import express from "express";
import dotenv from 'dotenv';
import cors from "cors"


dotenv.config();
const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

let course=[];
let leads = [];
let comments = [];

//1. Create Course
app.post("/courses",(req,res)=>{
    const newCourse = req.body;
    course.push(newCourse);
    res.status(201).json(newCourse);
});


//2. Update Course
app.put("/courses/:courseId",(req,res)=>{
    const index=course.findIndex((c) => c.courseId === parseInt(req.params.courseId))
    if(index===-1){
        return res.status(404).send("Course not found")

    }
        course[index]={...course[index],...req.body};
        res.status(200).json(course[index]);

   
    
})


//3. Register Course
app.post('/courses/:courseId/register', (req, res) => {
    const index=course.findIndex((c) => c.courseId ===parseInt(req.params.courseId))
    if(index===-1){
        return res.status(404).send("Course not found")

    }
    else{
        const newLead = req.body;
        newLead.courseId = parseInt(req.params.courseId);
        newLead.status = 'Pending'; 
        leads.push(newLead);
        res.status(201).json(newLead);

    }
   
});


//4. Update Lead
app.patch('/leads/:leadId', (req, res) => {

    const index=leads.findIndex((c)=>c.leadId===parseInt(req.params.leadId))

    if(index===-1){
        return res.status(400).send('Lead not found');
    }

    const { status } = req.body; // Valid values: 'Accepted', 'Rejected', 'Waitlisted'
  
    if (!['Accepted', 'Rejected', 'Waitlisted'].includes(status)) {
      return res.status(400).send('Invalid status');
    }

   leads[index].status=status;
   res.status(200).json(leads[index]);

});

//5. Search Lead 
app.get('/leads/search', (req, res) => {
    const { query } = req.query;
    const searchResults = leads.filter(lead =>
        lead.name.toLowerCase().includes(query.toLowerCase()) ||
        lead.email.toLowerCase().includes(query.toLowerCase())
      );
      if (searchResults.length === 0) {
        res.status(404).send("Lead not found" );
    } else {
        res.status(200).json(searchResults);
    }
});

//6. Add Comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    res.status(201).json(newComment);
});


//Starting server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

