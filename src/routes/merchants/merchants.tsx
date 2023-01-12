import React, {Key, useEffect, useState} from "react"
import PageHeader from "../../components/PageHeader"
import {Badge, Button, Grid, Spacer, Table, Text, Tooltip} from "@nextui-org/react"
import {AiFillEye} from "react-icons/ai"
import {Navigate} from "react-router-dom"
import {Category, getAllCategoriesCall} from "../../api/categories"
import {merchantsGraphQL, scraperScrapeEndpoint} from "../../constants/api";

type Props = {
    title: string;
}

interface Merchant {
    name: string;
    merchantId: number;
}

export default function Merchants({title}: Props) {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [items, setItems] = useState<Merchant[]>([])
    const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null)

    useEffect(() => {
        document.title = title

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var graphql = JSON.stringify({
            query: "que{ry {\r\n  merchants {\r\n    name\r\n    merchantId\r\n  }\r\n}",
            variables: {}
        })

        fetch(merchantsGraphQL, {
            method: 'POST',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        }).then(async response => {
            console.log("aratata")
            const data = await response.json()
            console.log(data);

            setIsLoaded(true)
            if (!response.ok || data.errors != undefined) {
                setError(data.detail)
                setItems([{name: "Mercator",merchantId: 1001},{name: "Jager",merchantId: 1003},{name: "Spar",merchantId: 1002}])
            } else {
                setError(null)
                setItems(data.data.merchants)
            }
        })
        console.log("ptong")
    }, [])

    const columns: { key: string, label: string, align: "start" | "end" }[] = [
        {key: "name", label: "IME", align: "start"},
        {key: "action", label: "", align: "start"}
    ]

    const rows = items.map((item) => {
        return {
            key: item.merchantId,
            name: item.name,
            action: item.merchantId,
        }
    })

    const renderCategoriesCell = (item: any, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return <Text b>{item[columnKey]}</Text>
            case "action":
                return <></>
                // return <><Button color="success" onClick={() => setSelectedMerchant(item[columnKey])} icon={<AiFillEye fill="currentColor"/>}>Obišči trgovca</Button></>
        }

        return <Text>{item[columnKey]}</Text>
    }

    console.log(rows)

    const doTheScrape = () => {
        fetch(scraperScrapeEndpoint)
    }

    return (<>
            <PageHeader mainTitle={title} buttons={[]}/>

            {selectedMerchant !== null ? <Navigate to={selectedMerchant.toString()} /> : null}
            {/*{ <Alert error={ error } action={ ActionType.GetAllCustomers }/> }*/}

            <Button
                color="error"
                onClick={() => doTheScrape()}
            >Izvedi scrape novih cen</Button>
            <Spacer></Spacer>

            <Table
                aria-label="Example table with dynamic content"
                bordered sticked
                css={{
                    height: "auto",
                    minWidth: "100%",
                }}
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Column key={column.key} align={column.align}>{column.label}</Table.Column>
                    )}
                </Table.Header>
                <Table.Body items={rows}>
                    {(item) => (
                        <Table.Row key={item.key}>
                            {(columnKey) => <Table.Cell>{renderCategoriesCell(item, columnKey)}</Table.Cell>}
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </>
    )
}