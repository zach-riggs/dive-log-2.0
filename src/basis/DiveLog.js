import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { Application } from "./views/Application"
import "./DiveLog.css"
import { Login } from "./authenticator/Login"
import { Register } from "./authenticator/Register"



export const DiveLog = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					
					<Application />
				</>
			</Authorized>

		} />
	</Routes>
}