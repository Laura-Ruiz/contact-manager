import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {

  const [search, setSearch] = useState({
    text:""
  })

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    
    async function getData() {

      try {
        setState((preValue) => {
          return {
            ...preValue,
            loading: true,
          };
        });
        const response = await ContactService.getAllContacts();
        setState((preValue) => {
          return {
            ...preValue,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data
          };
        });
      } catch (error) {
        setState((preValue) => {
          return {
            ...preValue,
            loading: false,
            errorMessage: error.message,
          };
        });
      }
    }
    getData();
  }, []);

function searchContact(event){
  const {name, value} = event.target
  setSearch((preValue) =>{
    return {
      ...preValue,
      [name]: value
    }
  })
  const theContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(value.toLowerCase())
  })
  setState((preValue) => {
    return {
      ...preValue,
      loading: false,
      filteredContacts: theContacts
    };
  });}

  async function clickDelete(contactId){
    try {
      let response = await ContactService.deleteContact(contactId)
      if(response){
        setState((preValue) => {
          return {
            ...preValue,
            loading: true,
          };
        });
        const response = await ContactService.getAllContacts();
        setState((preValue) => {
          return {
            ...preValue,
            loading: false,
            contacts: response.data,
            filteredContacts: response.data
          };
        });
      }
      
    } catch (error) {
      setState((preValue) => {
        return {
          ...preValue,
          loading: false,
          errorMessage: error.message,
        };
      });
    }
  }

  const { loading, filteredContacts, contacts } = state;

  return (
    <Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold pb-3">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="text"
                        name="text"
                        className="form-control"
                        placeholder="Search Names"
                        value={search.text}
                        onChange={searchContact}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {
                  filteredContacts.length > 0 && 
                    filteredContacts.map(contact => {
                      return (
                        <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  className="img-fluid contact-img"
                                  src={contact.photo}
                                  alt="profile"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name: <span className="fw-bold">{contact.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile: <span className="fw-bold">{contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:{" "}
                                    <span className="fw-bold">{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button className="btn btn-danger my-1" onClick={() => clickDelete(contact.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                    })
                }
               
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ContactList;
