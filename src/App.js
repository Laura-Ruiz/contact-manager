
import {Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import NavBar from '../src/components/NavBar/NavBar'
import ContactList from '../src/components/Contact/ContactList/ContactList'
import AddContact from '../src/components/Contact/AddContact/AddContact'
import ViewContact from '../src/components/Contact/ViewContact/ViewContact'
import EditContact from '../src/components/Contact/EditContact/EditContact'
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
    <NavBar/>  
    <Routes>   
      <Route path={'/'} element={<Navigate to={'/contacts/list'}/>}/>
      <Route path={'/contacts/list'} element={<ContactList/>}/>
      <Route path={'/contacts/add'} element={<AddContact/>}/>
      <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
      <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
    </Routes>
    </Fragment>
  );
}

export default App;
