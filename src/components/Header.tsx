import {Link, useNavigate} from "react-router-dom"
import {links} from "../constants/links"
import {Button, Dropdown, Navbar, Spacer, Text, User as UserDisplay} from "@nextui-org/react"
import React, {Key, useCallback, useEffect, useState} from "react"

export default function Header() {
    const [selected, setSelected] = useState<string>(links[0].path)


    let navigate = useNavigate();

    const displayName = "Gregor Gabrovšek"

    return <Navbar variant="floating" isBordered style={{zIndex: "9999999"}}>
        <Navbar.Brand>
            {/*<img width="32px" src={"birdlogo.svg"}/>*/}
            <Spacer/>
            <Text size={20} color="inherit" hideIn="md" style={{letterSpacing: "0px"}} weight={"bold"}>
                Primerjalnik cen
            </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight activeColor={"success"} hideIn="sm" variant={"underline"}>
            <Navbar.Link
                as={Link} key={""} className={"nav-item"} to={""} onClick={() => setSelected("")}
                isActive={"" === selected} isDisabled={"" === selected}
            >Prva stran</Navbar.Link>
            <Navbar.Link
                as={Link}
                key={"categories"} className={"nav-item"} to={"categories"} onClick={() => setSelected("categories")}
                isActive={"categories" === selected} isDisabled={"categories" === selected}
            >Kategorije</Navbar.Link>
            <Navbar.Link
                as={Link}
                key={"merchants"} className={"nav-item"} to={"merchants"} onClick={() => setSelected("merchants")}
                isActive={"merchants" === selected} isDisabled={"merchants" === selected}
            >Trgovci</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
            <UserDisplay
                src={ "https://avatars.githubusercontent.com/u/33792369?v=4" }
                name={displayName}
                description="Admin"
                bordered
            />
            <Navbar.Item>
                <Button auto flat color={"error"}>
                    Odjava
                </Button>
            </Navbar.Item>
        </Navbar.Content>
    </Navbar>
}