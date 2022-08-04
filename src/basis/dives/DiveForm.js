import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const DiveForm = () => {
    const [dive, update] = useState({
        number: "",
        location: "",
        depth: "",
        visibility: "",
        comments: "",
        bottomTime: undefined,
        totalBottomTime: undefined
    })
    const [diver, setDiver] = useState({
        name: ""
    })
    const [location, setLocations] = useState([])
    const localDiveLogger = localStorage.getItem("dive_logger")
    const diveLoggerObj = JSON.parse(localDiveLogger)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                setLocations(locationArray)
            })
        }
    )

    const handleCreateButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

        const createdDive = {
            diverId: diveLoggerObj.id,
            number: dive.number,
            location: dive.location,
            depth: dive.depth,
            visibility: dive.visibility,
            comments: dive.comments,
            bottomTime: dive.bottomTime,
            totalBottomTime: dive.totalBottomTime,
        }
        const createdDiver = {
            name: diver.name
        }

        fetch(`http://localhost:8088/dives`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdDive)
        })
            .then(response => response.json())
            .then( (newDive) => {
                createdDiver.divetId = newDive.id
               return fetch(`http://localhost:8088/divers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createdDiver)
               })
               .then(response => response.json())
               
            })
            .then(() => {
                navigate("/dives/created")
            })
    }   
    
    return <form className="diveForm">
        <h2 className="diveForm__number">Create Dive</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="number">number:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={dive.number}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.number = changeEvt.target.value
                            update(copy)
                        }
                    }>{dive.number}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="diver">Diver:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={diver.name}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...diver }
                            copy.name = changeEvt.target.value
                            setDiver(copy)
                        }
                    }>{diver.name}</textarea>
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label htmlFor="location">Location:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={dive.location}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.location = changeEvt.target.value
                            update(copy)
                        }
                    }>{dive.location}</textarea>
            </div>
        <div className="form-group">
            <label htmlFor="depth">Depth:</label>
            <textarea
                required autoFocus
                type="text"
                style={{
                    height: "1.5rem"
                }}
                className="form-control"
                value={diver.depth}
                onChange={
                    (changeEvt) => {
                        const copy = { ...dive }
                        copy.depth = changeEvt.target.value
                        update(copy)
                    }
                }>{diver.depth}</textarea>
        </div>
        <div className="form-group">
                <label htmlFor="visibility">Visibility:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "1.5rem"
                    }}
                    className="form-control"
                    value={dive.visibility}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.visibility = changeEvt.target.value
                            update(copy)
                        }
                    }>{dive.visibility}</textarea>
            </div>
            <div className="form-group">
                    <Dropdown
                    label="Location: "
                    options={location}
                    value={dive.location}
                    onChange={
                        (dive)=> {
                            const copy = {...dive}
                            copy.locationId = parseInt(dive.target.value)
                            update(copy)
                        }
                    } />
                    
                </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="Bottom-Time">Bottom Time:</label>
                <input
                    required autoFocus
                    type="time"
                    
                    className="form-control"
                    value={dive.startBottomTime}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.startBottomTime = changeEvt.target.value
                            update(copy)
                        }
                    }/>
            </div>
            <div className="form-group">
                <label htmlFor="Total-Bottom-Time">Total Bottom Time:</label>
                <input
                    required autoFocus
                    type="totalBottomTime"
                    
                    className="form-control"
                    value={dive.startTotalBottomTime}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.startTotalBottomTime = changeEvt.target.value
                            update(copy)
                        }
                    }/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="comments">Comments:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "5rem"
                    }}
                    className="form-control"
                    value={dive.comments}
                    onChange={
                        (changeEvt) => {
                            const copy = { ...dive }
                            copy.comments = changeEvt.target.value
                            update(copy)
                        }
                    }>{dive.comments}</textarea>
            </div>
        </fieldset>
        <fieldset>
        </fieldset>
        <button
            onClick={(clickEvent) => handleCreateButtonClick(clickEvent)}
            className="btn btn-primary">
            Create Dive
            </button>
    </form>
}
const Dropdown = ({label, options, onChange})  => {
    return (
        <label>
        {label}
        <select onChange={(dive) => {onChange(dive)}}>
            {options.map( (option) => {
               return <option key={`state--${option.id}`} value={option.id}>{option.abbreviation}</option>

            })}
        </select>
        </label>
        
    )
}