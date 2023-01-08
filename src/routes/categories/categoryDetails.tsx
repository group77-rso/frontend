import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader"
import React, {Key, useEffect, useState} from "react"
import {getCategoryItems, Category, CategoryDetail, Product} from "../../api/categories"
// import Alert, { ActionType } from "../../../components/Alert"
import {Button, Container, Grid, Loading, Spacer, Table, Text} from "@nextui-org/react"
import {getPricesForProduct, Price, Prices} from "../../api/prices";
import {getPricesEndpoint} from "../../constants/api";
import {AiFillEye} from "react-icons/ai";

export default function CategoryDetails() {
    let params = useParams()

    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail | null>(null)
    const [prices, setPrices] = useState<Map<number, Array<Price>>>(new Map<number, Array<Price>>())
    const [names, setNames] = useState<Map<number, string>>(new Map<number, string>())
    const [error, setError] = useState<any | null>(null)

    const pageTitle = categoryDetail == null ? "Podrobnosti kategorije" : `Kategorija: ${ categoryDetail.name }`

    useEffect(() => {
        if (params.categoryId == null) {
            setError("missing category ID")
            return
        }

        const invoice: number = +params.categoryId
        if (isNaN(invoice)) {
            setError("invalid category ID")
            return
        }

        getCategoryItems(
            +params.categoryId,
            async response => {
                const data = await response.json()
                console.log(data)

                if (!response.ok) {
                    setError(data.detail)
                } else {
                    setError(null)
                    setCategoryDetail(data)

                    const urls = data.products.map((product: Product) => fetch(getPricesEndpoint + "/" + product.productId))
                    Promise.all(urls).then(async (responses) => {
                        const parsedResponses = await Promise.all(responses.map(async res => await res.json()));
                        let allPrices = new Map<number, Array<Price>>();
                        let allNames = new Map<number, string>();
                        parsedResponses.forEach((res: Prices) => {
                            allPrices.set(res.product.productId, res.prices)
                            allNames.set(res.product.productId, res.product.name)
                        })
                        setPrices(allPrices)
                        setNames(allNames)
                    })
                }
            },
            async () => {
                setError("error occurred when loading the category")
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
        <Text size={25} weight={"light"}>Nalaganje podrobnosti kategorije...</Text>
    </Container>

    let rows: Array<{key: number, name: string | undefined, mercator: number | null, spar: number | null, jager: number | null, action: number}> = [];
    if (prices === null || prices.size === 0) {
    } else {
        prices.forEach((val, k) => {
            let final: {key: number, smallest: string | null, name: string | undefined, mercator: number | null, spar: number | null, jager: number | null, action: number} = {
                key: k,
                name: names.get(k),
                smallest: null,
                mercator: null,
                spar: null,
                jager: null,
                action: k,
            }
            let smallest = 1000000;
            val.forEach(value => {
                // @ts-ignore
                const mer: "mercator" | "spar" | "jager" = value.merchant.toLowerCase()
                final[mer] = value.price
                if (value.price < smallest) {
                    smallest = value.price;
                    final.smallest = mer;
                }
            })
            rows.push(final)
        })
    }
    console.log("rows", rows)

    const renderCategoriesCell = (item: any, columnKey: Key) => {
        switch (columnKey) {
            case "name":
                return <Text b>{item[columnKey]}</Text>
            case "mercator":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} €</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "spar":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} €</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "jager":
                if (item[columnKey] !== null) return <Text  css={ { textAlign: "end" } }>{item[columnKey]} €</Text>
                return <Text css={ { textAlign: "end" } }>----</Text>
            case "action":
                return <Button  css={ { textAlign: "end" } } icon={<AiFillEye fill="currentColor"/>}>Poglej podrobnosti</Button>
        }

        return <Text>{item[columnKey]}</Text>
    }

    // @ts-ignore
    const basicDetails = <>
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
                        {(columnKey) => <Table.Cell >{renderCategoriesCell(item, columnKey)}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    </>

    return (<>
        <PageHeader mainTitle={ pageTitle } buttons={ [] }/>
        {/*<Alert action={ ActionType.GetInvoiceDetails } error={ error }/>*/}
        <Text>{error}</Text>
        {categoryDetail == null && error == null ? loading : null}

        { categoryDetail != null ? basicDetails : null }

    </>)
}