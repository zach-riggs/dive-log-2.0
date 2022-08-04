import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
    const [diver, setDiver] = useState({
        email: "",
        fullName: "",
    });
    let navigate = useNavigate()

    const registerNewDiver = () => {
        return fetch("http://localhost:8088/divers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(diver)
        })
            .then(res => res.json())
            .then(createdDiver => {
                if (createdDiver.hasOwnProperty("id")) {
                    localStorage.setItem("dive_logger", JSON.stringify({
                        id: createdDiver.id,
                    }))

                    navigate("/")
                }
            })
    };

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/divers?email=${diver.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    window.alert("Account with that email address already exists")
                }
                else {
                    registerNewDiver()
                }
            })
    };

    const updateDiver = (evt) => {
        const copy = {...diver}
        copy[evt.target.id] = evt.target.value
        setDiver(copy)
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Honey Rae Repairs</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateDiver}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateDiver}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}