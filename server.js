import express from "express";

const app = express();
app.use(express.json());

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
app.put('/leads/:leadId', (req, res) => {

    const index=leads.findIndex((c)=>c.leadId===parseInt(req.params.leadId))

    if(index===-1){
        return res.status(400).send('Lead not found');
    }

    const { status } = req.body; // Valid values: 'Accept', 'Reject', 'Waitlist'
  
    if (!['Accept', 'Reject', 'Waitlist'].includes(status)) {
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
    res.status(200).json(searchResults);
});

//6. Add Comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    res.status(201).json(newComment);
});


const PORT = 3000;

//Starting server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

