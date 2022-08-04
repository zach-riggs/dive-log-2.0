import { Outlet, Route , Routes } from "react-router-dom"
import { NavBar } from "../navigation/NavBar"
import { DiveList } from "../dives/DiveList"
import { DiveForm } from "../dives/DiveForm"
import { CreatedDives } from "../dives/CreatedDives"
export const Application = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>DiveLog</h1>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route path="dives" element={ <DiveList /> } />
                <Route path="dives/created" element={ <CreatedDives /> } />
                <Route path="dives/create" element={ <DiveForm /> } />

            </Route>
        </Routes>
    )
    
}