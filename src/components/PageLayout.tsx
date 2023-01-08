import Header from "./Header"
import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Spacer, Text } from "@nextui-org/react"
import { Box } from "./box"

export default function PageLayout() {
    return (
        <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
            <Header/>
            <Spacer y={3}/>
            <div className={ "container" }>
                <Outlet/>
            </div>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </Box>
    )
}