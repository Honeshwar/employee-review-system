const Review = require("../models/reviewSchema");
const User = require("../models/userSchema")

// dashboard of admin contain all employees/ all users
exports.dashboard = async (req,res)=>{
    const users = await User.find({});
    console.log('users at dashboard',users);
    return res.render('adminDashboard.ejs',{title:'Dashboard',users,layout:'../layouts/layout2.ejs'})//get admin in ejs file from locals.user that set by passport MW setAuth func that we crated, at time of login is added to locals, or each req it will be added
}

// add employee controllers
exports.addEmployee = async (req,res)=>{
    const user = req.body;
    //finding that user is already exist or not
    const findUser = await User.findOne({email:user.email});
    if(findUser !== null || user.password !== user.confirmPassword){
        return res.redirect('back');
    }

    //create use if not exist
    const newUser = User.create({...user});console.log('new user',newUser);
    return res.redirect('back');
}

// update employee controllers
exports.updateEmployee = async (req,res)=>{
    try {
        const employee = req.body;
        const id = req.params.id;//userId or employeeId
    
        const updateEmployee = await User.updateOne({_id:id},employee);
        console.log('updated ',updateEmployee);
        
         return res.redirect('back');// /admin/dashboard
    
       } catch (error) {
           console.log("error while updating user",error);
        return res.redirect('back');
       }
}

// delete employee controllers
exports.deleteEmployee = async (req,res)=>{
   try {
    const id = req.params.id;

     const deleted = await User.deleteOne({_id:id});
     console.log("deleted",deleted);
     return res.redirect('back');// /admin/dashboard

   } catch (error) {
       console.log("error while delete user",error);
       return res.redirect('back');
   }
}

// assign review controllers
exports.assignReview = async (req,res)=>{

    try {
        const data = req.body;//{from:id,to:id}
        const newReview = await Review.create(data);
        console.log('new Reviewer',newReview);
        
        //find user /employee and add review id in review array
        const reviewer = await User.findById({_id:data.from});
         reviewer.reviews.push(newReview.id);//save on RAM
         reviewer.save();//save in db
        
         console.log("User after assign review",reviewer);
        return res.redirect('back');
    } catch (error) {
        console.log("error while assign review to user",error);
        return res.redirect('back');
    }
}

// make admin controllers
exports.makeAdmin = async (req,res)=>{

    try {
        const id = req.params.id;
        const user = await User.findById({_id:id});
      
        if(user.role === 'employee'){
            const newAdmin = await User.updateOne({_id:id},{role:'admin'});//field update it do
        }else{
            const newAdmin = await User.updateOne({_id:id},{role:'employee'});//field update it do
        }

        console.log('new admin',newAdmin);

        return res.redirect('back');
        
    } catch (error) {
        console.log("error while assign making admin to an employee to user",error);
        return res.redirect('back');
    }
}