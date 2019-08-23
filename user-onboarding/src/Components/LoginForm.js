import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";


const LoginForm = ({ errors, touched, values, status })  =>{

const [login, setLogin] = useState([]);

console.log(errors);

useEffect(() => {
    if(status) {
        setLogin([...login, status]);
    }
},[status]);



    return(
        <div className="logon-form">
            <Form>
                <Field className="field-input" name="firstName" type="text" placeholder="First Name" />
                {touched.firstName && errors.firstName && (
                    <p className="error">{errors.firstName}</p>
                )}
                <Field className="field-input" name="lastName" type="text" placeholder="Last Name" />
                {touched.lastName && errors.lastName && (
                    <p className="error">{errors.lastName}</p>
                )}
                <Field className="field-input" name="userName" type="text" placeholder="UserName" />
                {touched.userName && errors.userName && (
                    <p className="error">{errors.userName}</p>
                )}
                <Field className="field-input" name="password" type="password" placeholder="Password"  />
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
                <button type="submit" >LOGIN RIGHT HERE</button>
            </Form>
            
            {login.map(getIt => (
                <div className="title-container">
                <ul key={getIt.id}>
                <h2>Welcom New User</h2>
                <li>First Name: {getIt.firstName}</li>
                <li>Last Name: {getIt.lastName}</li>
                <li>User Name: {getIt.userName}</li>
                </ul>
                </div>
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
        lastName: Yup.string().required("Now your last name; We need this too, please..."),
        userName: Yup.string().required("Now a User Name; Got to have this to be a user"),
        password: Yup.string().required("& last a Password Need this to keep this secure"),
        terms: Yup.boolean().oneOf([true],"You need to agree to the terms please")
    }),
    handleSubmit(values, {setStatus}) {
        axios.post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log(res);
            setStatus(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

})(LoginForm);

export default FormikLoginForm;