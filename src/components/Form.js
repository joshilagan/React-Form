import React from 'react'
// install the react-hook-form, npm i react-hook-form yup
// import the userForm 
import { useForm } from 'react-hook-form'
// install resolvers and import it, npm install @hookform/resolvers
import { yupResolver } from '@hookform/resolvers/yup'
//import yup for input value validation
import * as yup from 'yup'

const Form = () => {
   
    //create a schema to shape how the data should look like by chaining methods
    //VALIDATION METHODS:
    //required()-prevent an empty input from user. email()-only an email should be typed in
    //positive()-only positive numbers. integer()-only whole numbers 
    //min() max()-only min or max no. specified inside the parenthesis
    //oneOf([yup.ref("password"), null]) - password inside the parenthesis means only
    //the value of the password should be the reference of the input. if you put age, then
    //age will be the reference, etc. null means no other reference will be taken
    const schema = yup.object().shape({
        fullName: yup.string().required("**You full name is required"),
        email: yup.string().email().required("**Email is required"),
        age: yup.number().typeError('**Age is required').positive().integer().min(18).required(),
        password: yup.string().min(8).typeError('**Password must be atleas 8 characters').max(20).required("**Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords Don't match").required("**Enter Confirmation Password"),        
    })

     //use the useForm state to handle the form inputs
     //formState: {errors} takes in all the errors in the form 
     const { register, handleSubmit, formState: {errors}} = useForm({
        //yupResolver will be the format of our schema
        resolver: yupResolver(schema),
     });

    const onSubmit = (data) => {
        console.log(data);
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1>Sign-up</h1>
            </div>
            <div className='lower'>
                {/* to get all the data from the form, insert{...register("")} */}
                {/*then, name the string inside the parenthesis as the input name */}
                {/* errors.fullName?.message informs user that there's an error.
                error message can be created inside the required() function in the schema above */}
                <input type="text" placeholder='Full Name...' {...register("fullName")}/>
                <p>{errors.fullName?.message}</p>
                <input type="text" placeholder='Email...' {...register("email")}/>
                <p>{errors.email?.message}</p>
                <input type="number" placeholder='Age...' {...register("age")}/>
                <p>{errors.age?.message}</p>
                <input type="password" placeholder='Password...' {...register("password")}/>
                <p>{errors.password?.message}</p>
                <input type="password" placeholder='Confirm Password...' {...register("confirmPassword")}/>
                <p>{errors.confirmPassword?.message}</p>
                <input type='submit'/>
            </div>
        </form>
    </div>
  )
}

export default Form