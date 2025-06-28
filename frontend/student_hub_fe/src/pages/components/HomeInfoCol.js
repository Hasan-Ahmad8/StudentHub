import { Link } from "react-router-dom";
import { Questions } from "./QuestionsLIst";

export function InfoCol(){
    return(
        <div className="card-body">
            <h1 className="text-xl font-bold">Student FAQ</h1>
            <div className="divider mt-0 mb-2"></div>
                <Questions numOfQuestions={3}/> 
            <div className="divider mt-0 mb-2"></div>
            <Link to="/faq" className="btn bg-blue-500 hover:bg-blue-600 rounded-xl">See FAQ</Link>
        </div>
    );
}