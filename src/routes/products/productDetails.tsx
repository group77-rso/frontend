import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader"
import React, {Key, useEffect, useState} from "react"
import {getCategoryItems, Category, CategoryDetail, Product} from "../../api/categories"
// import Alert, { ActionType } from "../../../components/Alert"
import {Button, Container, Grid, Link, Loading, Spacer, Table, Text} from "@nextui-org/react"
import {getPricesForProduct, Price, Prices} from "../../api/prices";
import {getPricesEndpoint} from "../../constants/api";
import {AiFillEye} from "react-icons/ai";

export default function ProductDetails() {
    let params = useParams()

    const [prices, setPrices] = useState<Array<Price> | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [error, setError] = useState<any | null>(null)
    const [currency, setCurrency] = useState<string>("EUR")

    const pageTitle = name == null ? "Podrobnosti izdelka" : `Izdelek: ${ name }`

    useEffect(() => {
        if (params.productId == null) {
            setError("missing category ID")
            return
        }

        const invoice: number = +params.productId
        if (isNaN(invoice)) {
            setError("invalid category ID")
            return
        }

        fetch(getPricesEndpoint + "/" + params.productId).then(async (response) => {
            const data = await response.json()
            setPrices(data.prices)
            setName(data.product.name)
        })
    }, [])

    const columns: { key: string, label: string, align: "start" | "end" }[] = [
        {key: "name", label: "NAZIV", align: "start"},
        {key: "mercator", label: "MERCATOR", align: "end"},
        {key: "spar", label: "SPAR", align: "end"},
        {key: "jager", label: "JAGER", align: "end"},
        {key: "action", label: "", align: "end"}
    ]

    const loading = <Container justify={"center"} display={"grid"}>
        <Spacer y={2} />
        <Loading size={"xl"} color="error" type="points" />
        <Spacer />
        <Text size={25} weight={"light"}>Nalaganje podrobnosti izdelka...</Text>
    </Container>

    const renderCategoriesCell = (item: any, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return <Text b>{item[columnKey]}</Text>
            case "mercator":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} {currency}</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "spar":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} {currency}</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "jager":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} {currency}</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "action":
                return <Button  css={ { textAlign: "end", marginLeft: "20px"} } icon={<AiFillEye fill="currentColor"/>}>Poglej podrobnosti</Button>
        }

        return <Text>{item[columnKey]}</Text>
    }

    // @ts-ignore
    const basicDetails = <>
        <Text h2>Trgovci:</Text>
        {prices?.map((price) => {
            console.log(price)
            return (<>
                <Spacer />
            <Text h3>{price.merchant}</Text>
            <Text b>Cena izdelka:</Text>
            <Text>{price.price}</Text>

            <Text b>Povezava do izdelka izdelka:&nbsp;</Text>
            <Link color="success" href={price.productLink}>&nbsp;{price.productLink}</Link>
            <Spacer />
        </>)})}
    </>


    return (<>
        <PageHeader mainTitle={ pageTitle } buttons={ [] }/>
        {/*<Alert action={ ActionType.GetInvoiceDetails } error={ error }/>*/}
        <Text>{error}</Text>

        {name == null && error == null ? loading : null}

        { name != null ? basicDetails : <Loading /> }

    </>)
}