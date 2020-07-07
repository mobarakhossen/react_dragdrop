import React from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import MenuDragDrop from './components/MenuDragDrop';
import { Container} from 'react-bootstrap';

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
       <Container>
         <br></br>
         <MenuDragDrop/>
       </Container>
     
    </Provider>
    
  );
}

export default App;
