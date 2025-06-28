export function Questions({ numOfQuestions }){

    const questionList = { 
        Q1: [{Question: "How Can I Create An Account", 
            Answer: "Click the 'Sign Up' button in the top right corner and follow the registration process."}],

        Q2: [{Question: "I forgot my password. What should I do?", 
            Answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."}],

        Q3: [{Question: "How do I update my profile information?", 
            Answer: "Go to 'My Account' settings and select 'Edit Profile' to make changes."}],

        Q4: [{Question: "My Grades Are Bad What Do I Do?", 
            Answer: "Try studying."}],

        Q5: [{Question: "I'm New How Can I Find My Classes?", 
            Answer: "You can look up the building your class is in on the campus map. Room numbers are based on floors. Room 201 would be on the second floor."}]
    };

    const questionKeys = Object.keys(questionList);
    const displayedQuestionKeys = questionKeys.slice(0, numOfQuestions);

    return(
        <div className="join join-vertical bg-base-300 rounded-xl ">
            <div className="join join-vertical bg-base-300 rounded-xl ">

                {displayedQuestionKeys.map((key, index) => (
                    <div key={key} className="collapse collapse-arrow join-item border-base-300 border hover:bg-blue-600 mb-5">
                        <input type="checkbox" id={`my-accordion-${index}`} /> 
                        <label htmlFor={`my-accordion-${index}`} className="collapse-title font-semibold"> 
                            {questionList[key][0].Question}
                        </label>
                        <div className="collapse-content text-sm">
                            <p>{questionList[key][0].Answer}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}