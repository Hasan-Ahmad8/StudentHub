import React from "react";
import { Questions } from "./components/QuestionsLIst";

function FAQ() {
  return (
    <section>
        <div className="hero bg-base-300 p-10 rounded-b-xl">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl sm:text-5xl font-bold">
                        Frequently Asked Questions
                    </h1>
                    <p className="py-6 mb-10 sm:mb-20">
                        Questions? Answers? We're here for you.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 m-4 sm:m-10 justify-center items-center lg:items-start">
        
            <div className="w-full lg:w-2/3">
                <Questions numOfQuestions={5} />
            </div>

            <div className="card bg-base-200 w-full max-w-md">
                <div className="card-body">
                    <h2 className="card-title">Any more questions?</h2>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="mail@site.com"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="label-text">Your Question</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 w-full"
                            placeholder="Your question here..."
                        ></textarea>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary w-full">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default FAQ;
