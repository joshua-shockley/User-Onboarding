import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";


const LoginForm = ({ errors, touched, values, status })  =>{

const [login, setLogin] = useState([]);
console.log("this is touched, touched");

useEffect(() => {
    if(status) {
        setLogin([...login, status]);
    }
},[status]);



    return(
        <div className="logon-form">
            <Form>
                <Field name="firstName" type="text" placeholder="First Name" />
                {touched.firstName && errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                )}
                <Field name="lastName" type="text" placeholder="Last Name" />
                {touched.lastName && errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                )}
                <Field name="userName" type="text" placeholder="UserName" />
                {touched.userName && errors.userName && (
                    <p className="error">{errors.userName}</p>
                )}
                <Field name="password" type="text" placeholder="Password"  />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container"> 
                <Field 
                name="terms" 
                type="checkbox" 
                checked={values.terms} 
                />
                <span className="checkmark">Please check to agree to Terms of Service
                </span>
                </label>
                <button  >LOGIN RIGHT HERE</button>
            </Form>
            {login.map(login => (
                <ul key={login.id}>
                <li>First Name: {login.firstName}</li>
                <li>Last Name: {login.lastName}</li>
                <li>User Name: {login.userName}</li>
                <li>Password: {login.password}</li>
                <li></li>

                </ul>
            ))}
        </div>
    );
};

const FormikLoginForm = withFormik({
    mapsPropsToValues({ 
        firstName, 
        lastName,
        userName,
        password,
        terms
    }) {
        return{ 
            firstName: firstName || "",
            lastName: lastName || "",
            userName: userName || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required("Lets start with your first name please"),
        lastName: Yup.string().required("We need this too, please..."),
        userName: Yup.string().required("Got to have this to be a user"),
        password: Yup.string().required("Need this to keep this secure")
    }),
    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res);
        });
    }

})(LoginForm);

export default FormikLoginForm;