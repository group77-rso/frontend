import React, {Key, useEffect, useState} from "react"
import PageHeader from "../../components/PageHeader"
import {Badge, Button, Grid, Spacer, Table, Text, Tooltip} from "@nextui-org/react"
import {AiFillEye} from "react-icons/ai"
import {Navigate} from "react-router-dom"
import {Category, getAllCategoriesCall} from "../../api/categories"
import {scraperScrapeEndpoint} from "../../constants/api";

type Props = {
    title: string;
}

export default function Categories({title}: Props) {

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [items, setItems] = useState<Category[]>([])
    const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null)

    useEffect(() => {
        document.title = title

        getAllCategoriesCall(async response => {
            const data = await response.json()
            console.log(data);

            setIsLoaded(true)
            if (!response.ok) {
                setError(data.detail)
            } else {
                setError(null)
                setItems(data)
            }
        })
    }, [])

    const columns: { key: string, label: string, align: "start" | "end" }[] = [
        {key: "name", label: "IME", align: "start"},
        {key: "action", label: "", align: "start"}
    ]

    const rows = items.map((item) => {
        return {
            key: item.categoryId,
            name: item.name,
            action: item.categoryId,
        }
    })

    const renderCategoriesCell = (item: any, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return <Text b>{item[columnKey]}</Text>
            case "action":
                return <><Button color="success" onClick={() => setSelectedMerchant(item[columnKey])} icon={<AiFillEye fill="currentColor"/>}>Obišči kategorijo</Button></>
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