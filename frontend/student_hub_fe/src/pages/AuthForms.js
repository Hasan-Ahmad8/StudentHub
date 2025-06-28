import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";


export function AuthForms(){
    const [showForm, setShowForm] = useState("login");

    return(
            <section>
                {showForm === "login" ? (
                    <>
                        <Login setShowForm = {setShowForm} />
                    </>
                ) : (
                    <>
                        <Signup setShowForm = {setShowForm}  />
                    </>
                )}
        </section>
  );
}