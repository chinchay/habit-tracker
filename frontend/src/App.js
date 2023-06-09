import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import ProgressCircle from './ProgressCircle';
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { Request2Backend } from './Connect2Backend';
import { BuildCalendar } from './Calendar';
import axios from "axios"

async function UpdateDatabase(habitNumber){
    console.log(habitNumber)
    const data = { "habitNumber" : habitNumber }

    // const url = 'http://localhost:8000/api/updateDB/'
    const url = 'http://192.168.0.218:12345/api/updateDB/'
    
    axios.post(url, data)
    .then(
        response => {console.log(response)}
    ).catch(
        error => {console.error(error)}
    )

    // refresh to update charts
    window.location.reload(false)    
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

function App() {

    const response = Request2Backend()
    // console.log(response)

    const [showStats, SetShowStats] = useState(false)
    // const [response, setResponse] = useState( Request2Backend() )

    return (
        <div className="App">

            <header className="App-header">
                <h1 className='aTitle'>Habit Tracker</h1>
                <p className='aSubtitle'>Achieve your goals every day, and see your stats soar</p>
            </header>


            <section className='content'>

                <div className='semicircle'>
                    <ProgressCircle response={response}/>
                </div>

                <div className="row mb-1">
                    <div className="col-4"></div>
                        <div className="col-4 d-grid gap-2">
                            {/* TODO */}
                            {/* REFACTOR TO AVOID HARD CODING THE LISTHABIT. I HAD REDO AND PUT IN THE CORRECT ORDER THE FOLLOWING: */}
                            <Button className="aButton" variant="secondary" onClick={ () => {UpdateDatabase(0)} }>Exercising</Button>
                            <Button className="aButton" variant="secondary" onClick={ () => {UpdateDatabase(1)} }>Journal Writing</Button>
                            <Button className="aButton" variant="secondary" onClick={ () => {UpdateDatabase(2)} }>Scriptures Reading</Button>
                            <Button className="aButton" variant="secondary" onClick={ () => {SetShowStats(true)} }>See my stats</Button>
                        </div>
                    <div className="col"></div>
                </div>

                <BuildCalendar response={response} width={300} months={4}/>

                <div className='calendarModal'>
                    <Modal
                        scrollable      = {true}
                        show={showStats}
                        onHide          = {()=>SetShowStats(false)}
                        // centered size   = "xl"
                    >
                        <Modal.Header>
                            <Modal.Title>My stats for the current year</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <BuildCalendar response={response} width={800} months={12}/>

                        </Modal.Body>


                    </Modal>

                </div>

                {/* <GetRecords /> */}

            </section>

    </div>
  );
}

export default App;
