import { Button, Card, Container, Grid, Spacer, Text } from "@nextui-org/react"
import PageHeader from "../components/PageHeader"
import { Navigate } from "react-router-dom"
import React, { useState } from "react"

export default function MainPage() {
    const [navigationDestination, setNavigationDestination] = useState<string | null>(null)

    let welcomeMessage
    const currentHour = new Date().getHours()
    if (currentHour < 10 && currentHour > 4) {
        welcomeMessage = `Dobro jutro!`
    } else if (currentHour > 19 || currentHour < 4) {
        welcomeMessage = `Dober večer!`
    } else {
        welcomeMessage = `Pozdravljeni!`
    }

    if (navigationDestination != null) return <Navigate to={navigationDestination} />

    return <>
        <PageHeader mainTitle={ welcomeMessage } buttons={ [] }/>
        {/*<Spacer y={ 1.5 }/>*/}
    </>
}