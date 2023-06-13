import React, { useCallback, useState } from 'react';
import axios from 'axios';
import {Button, Card, Accordion, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


function App() {

  const[listUser, setListUser] = useState([]);
  const[listUserDetail, setListUserDetail] = useState([]);
  const[inputUserName, setInputUserName] = useState("");


  const getUserDetail = useCallback(async (param:any) =>{

    setListUserDetail([]);

    axios.get(`https://api.github.com/users/${param}/repos`)
    .then(res =>{
      console.log('res detail', res.data)
      setListUserDetail(res.data)
    })
    .catch(err => console.log('err ', err))
  }, []);


  const onBtnSubmit = () => {

    axios.get(`https://api.github.com/search/users?q=${inputUserName}`)
    .then(res =>{
      console.log('res ', res)
      setListUser(res.data.items)
    })
    .catch(err => console.log('err ', err))
  }


  const renderListUser = () => {
    return listUser.map((val:any, i:any) => {
      return(
        <Accordion defaultActiveKey="0" className='mb-2' key={i}>
          <Accordion.Item eventKey={i}>
            <Accordion.Header onClick={()=>getUserDetail(val.login)}>{val.login}</Accordion.Header>
            <Accordion.Body>
            {
              listUserDetail.length > 0
              ?
              listUserDetail.map((val:any, idx:any) =>{
                return (
                      <Card className='my-3' key={idx}>
                        <Card.Body className="py-2 px-0">
                          <Card.Text style={{ fontSize: '19px', fontWeight:'bold'}} className="mb-1 mx-3">
                              {val.name}
                          </Card.Text>
                          <Card.Text className="mb-0 mx-3">
                              {val.description}
                          </Card.Text>
                          <Card.Text className="mb-0 mx-3">
                            <FontAwesomeIcon icon={faStar} className="me-2" style={{ color : 'black'}}/>  {val.stargazers_count}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                )
              })
              : null
            } 
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    })
  }

  return (
    <div className="container">
       <div className="row justify-content-center">
        <div className="col-sm-4">
        <Form>
          <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
            <Form.Control size="lg" type="text" placeholder="Enter Username" onChange={e => setInputUserName(e.target.value)}/>
          </Form.Group>
        </Form>
        <div className="d-grid gap-2 mb-3">
        <Button variant="primary" size="lg" onClick={onBtnSubmit}>
          Search
        </Button>
        </div>
            {inputUserName !== "" ? <p>Showing users for "{inputUserName}"</p> : null}
           {
            listUser.length > 0
            ?
            renderListUser()
            : null
           }
        </div>
       </div>
    </div>
  );
}

export default App;
