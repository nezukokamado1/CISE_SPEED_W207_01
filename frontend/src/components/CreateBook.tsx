import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Books";

const researchTypes = ["Case Study", "Experiment", "Survey", "Literature Review", "Other"]; 

const CreateBookComponent = () => {
  const navigate = useRouter();
  const [book, setBook] = useState<Book>(DefaultEmptyBook);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(book);
    fetch("http://localhost:8082/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then((res) => {
        console.log(res);
        setBook(DefaultEmptyBook);
        navigate.push("/");
      })
      .catch((err) => {
        console.log("Error from CreateBook: " + err);
      });
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Book List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">SPEED APP</h1>
            <p className="lead text-center">Submit an Article!</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Article"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Authors"
                  name="authors"
                  className="form-control"
                  value={book.authors}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Journal Name"
                  name="journalName"
                  className="form-control"
                  value={book.journalName}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Publication Year"
                  name="publicationYear"
                  className="form-control"
                  value={book.publicationYear}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Volume (Optional)"
                  name="volume"
                  className="form-control"
                  value={book.volume}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Issue Number (Optional)"
                  name="issueNumber"
                  className="form-control"
                  value={book.issueNumber}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Pages (Optional)"
                  name="pages"
                  className="form-control"
                  value={book.pages}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="DOI"
                  name="doi"
                  className="form-control"
                  value={book.doi}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <textarea
                  placeholder="Keywords (Optional)"
                  name="keywords"
                  className="form-control"
                  value={book.keywords}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <select
                  name="typeOfResearch"
                  className="form-control"
                  value={book.typeOfResearch}
                  onChange={onChange}
                >
                  <option value="">Select Type of Research (Optional)</option>
                  {researchTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div className="form-group">
                <textarea
                  placeholder="Abstract (Optional)"
                  name="abstract"
                  className="form-control"
                  value={book.abstract}
                  onChange={onChange}
                  rows={3}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Institution/Organization (Optional)"
                  name="institution"
                  className="form-control"
                  value={book.institution}
                  onChange={onChange}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-100">
                Submit Book/Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
