import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const CreatedDives = () => {
    const [createdDives, setCreatedDives] = useState([])
    const [allDivers, setAllDivers] = useState([])
    const [locations, setLocations] = useState([])
    const localDiveLogger = localStorage.getItem("dive_logger")
    const diveLoggerObj = JSON.parse(localDiveLogger)
    const navigate = useNavigate()

    const getAllDives = () => {
        fetch(`http://localhost:8088/dives?diverId=${diveLoggerObj.id}`)
        .then( response => response.json())
        .then( diveArray => {
            setCreatedDives(diveArray)
        })
    }

    const getAllLocations = () => {
        fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
        .then(locationArray => {
            setLocations(locationArray)
        })
    }

    const getDiverName = (dive) => {
        const filteredDivers = allDivers.filter(diveDiver => {
            return diveDiver.diveId === dive.id
        })
        const diverNames = filteredDivers.map(diveDiver => {
            return  diveDiver.name
            })
        return diverNames.join(", ")
       
    }

    const getDiveLocation = (dive) => {
        const foundLocation = locations.find(location => location.id === dive.locationId)

        return foundLocation
    }

    const deleteButton = (deleteId) => {
        return <button onClick= {() => {
            fetch(`http://localhost:8088/dives/${deleteId}`, {
                method: "DELETE"
            })
            .then( () => {
                getAllDives()
            })
        }} className="dive__delete">Delete</button>
    }

    useEffect(
        () => {
            getAllDives()

            getAllLocations()

            fetch(`http://localhost:8088/divers`)
            .then(response => response.json())
            .then(diverArray => {
                setAllDivers(diverArray)
            })
        },
        []
    )

    const handleCreateButtonClick = (dive) => {
        dive.preventDefault()

        navigate("/dives/create")
    }

    return <>
    
        <h2>List of Dives</h2>
        <button
        onClick={(click) => handleCreateButtonClick(click)}
        className="btn btn-primary"
        >Add Dive</button>
        <article className="dives">
        
            {
                createdDives.map(
                    (dive) => {
                        return <section className="dive" key={`dive--${dive.id}`}>
                            <header>{dive.startDate}</header>
                            <section>
                                {
                                    dive.title
                                    ? `${dive.title}: ${getDiverName(dive)}`
                                    : `${getDiverName(dive)}`
                                }
                            </section>
                            <section>{dive.depth} - {dive.visibility}, {getDiveLocation(dive)?.name}</section>
                            <footer>{ deleteButton(dive.id) }</footer>

                    </section>
                    }
                )
            }
        
        </article>
        
    
    
    </>

    
}