import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Dive.css"
export const DiveList = () => {
    const [dives, setDives] = useState([])
    const [divers, setDivers] = useState([])
    const [locations, setLocations] = useState([])
    const [times, setTimes] = useState([])
    const navigate = useNavigate()
    

    const localDiveLogger = localStorage.getItem("dive_logger")
    const diveLoggerObj = JSON.parse(localDiveLogger)

    const getAllDives = () => {
        fetch(`http://localhost:8088/dives`)
        .then( response => response.json())
        .then( diveArray => {
            setDives(diveArray)
            setTimes(diveArray)
        })
    }

    const getCompletedDives = () => {
        fetch(`http://localhost:8088/completed?diverId=${diveLoggerObj.id}&_expand=dive`)
        .then(response => response.json())
        .then(completedArray => {
            setCompleted(completedArray)
        })
    }

    const getAllLocations = () => {
        fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
        .then(locationArray => {
            setLocations(locationArray)
        })
    }
    
    const getDiveLocation = (dive) => {
        const foundLocation = locations.find(location => location.id === dive.locationId)

        return foundLocation
    }


    useEffect(
        () => {
            getAllDives()

            getAllLocations()

        },
        []
    )

 
    const addButton = (dives) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/logged`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: diveLoggerObj.id,
                    diveId: dives.id
                })
            })
            .then(response => response.json())
            .then( () => {
                getAllDives()
            })
        }}
        >Dove</button>
    } 

    const deleteButton = (doveId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/dove/${doveId}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                getAllDives()

            })

            }} className="dive__delete">Remove</button>
        }
    

    const addOrDeleteButton = (dive) => {
        const matchDive = completedDives.find(diveElement => completedElement.diveId === dive.id
            && diveElement.diverId === diveLoggerObj.id)

     return matchDive
        ? deleteButton(matchDive.id)
        : addButton(dive) 
    }


    return <>
    
        <h2>List of Dives</h2>

        <button onClick={ () => { 
            if (showCompleted) { updateShowCompleted(false)}
            
            else { updateShowCompleted(true) }

        }}>Toggle Dives</button>

        <article className="dives">
            {
                schedule.map(
                    (dive) => {
                        return <section className="dive" key={`dive--${dive.id}`}>
                            <header>{dive.startDate}</header>
                            <section>
                                {
                                    dive.title
                                    ? `${dive.title}: ${getDiverNames(dive)}`
                                    : `${getDiverNames(dive)}`
                                }
                            </section>
                            
                            <section>{dive.venue} - {dive.city}, {getDiveLocation(dive)?.name}</section>

                            <footer>
                                {
                                addOrDeleteButton(dive)
                                }
                            </footer>
                                
                    </section>
                    }
                )
            }
        </article>
    
    
    
    </>
}