import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { ContactService } from '../../../services/ContactService';

const EditContact = () => {

  let {contactId} = useParams();
  const navigate = useNavigate()


  const [state, setState] = useState({
    loading: false, 
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: ""
  })

  useEffect(() => {
    async function getContact(contactId){
    
      try {
        setState(preValue => {
          return{
            ...preValue, 
            loading: true,
          }
        })
        let response = await ContactService.getContact(contactId)
        let groupResponse = await ContactService.getGroups()

        setState(preValue => {
          return{
            ...preValue, 
            loading: false,
            contact: response.data,
            groups: groupResponse.data
          }
        })
      } catch (error) {
        setState(preValue => {
          return{
            ...preValue, 
            loading: false,
            errorMessage: error.message
          }
        })
      }
    }

    getContact(contactId)
  }, [contactId])
  
  const updateInput = (event) => {
    let { name, value } = event.target;
    setState((preValue) => {
      return {
        ...preValue,
        contact: {
          ...preValue.contact,
          [name]: value,
        },
      };
    });
  };
  async function submitForm(event){
    event.preventDefault()
    try {
      let response = await ContactService.updateContact(state.contact, contactId)
      if(response){
        navigate("/contacts/list", {replace: true})
      }
    } catch (error) {
      setState((preValue) => {
        return {
          ...preValue,
          errorMessage: error.message,
        };
      });
      navigate(`/contacts/edit/${contactId}`, {replace: false})

    }
  }
  const {contact, groups} = state

  return (
    <Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold pb-3">Edit Contact</p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="name"
                      value={contact.name}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-2">
                  <input
                      required={true}
                      name="photo"
                      value={contact.photo}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                    />
                  </div>
                  <div className="mb-2">
                  <input
                      required={true}
                      name="mobile"
                      value={contact.mobile}
                      onChange={updateInput}
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                    />
                  </div>
                  <div className="mb-2">
                  <input
                      required={true}
                      name="email"
                      value={contact.email}
                      onChange={updateInput}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-2">
                  <input
                      required={true}
                      name="company"
                      value={contact.company}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="mb-2">
                  <input
                      required={true}
                      name="title"
                      value={contact.title}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-2">
                  <select
                      required={true}
                      name="groupId"
                      value={contact.groupId}
                      onChange={updateInput}
                      className="form-control"
                    >
                      <option value="">Select a group</option>
                      {groups.length > 0 &&
                        groups.map((group) => {
                          return <option key={group.id} value={group.id}>{group.name}</option>;
                        })}
                    </select>
                  </div>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Update"
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <img
                  className="contact-img"
                  src={contact.photo}
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default EditContact;
