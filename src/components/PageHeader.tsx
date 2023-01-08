import { Grid, Spacer, Text } from "@nextui-org/react"
import React from "react"

type Props = {
    mainTitle: string;
}

function PageTitle({ mainTitle }: Props) {
    return (
        <>
            <Text h2 css={ { marginBottom: "0 !important" } }>{ mainTitle }</Text>
        </>
    )
}

type PHProps = {
    mainTitle: string;
    buttons: React.ReactNode[];
}

export default function PageHeader({ mainTitle, buttons }: PHProps) {
    return <>
        <Grid.Container alignItems="center"><>

            <Grid><PageTitle mainTitle={ mainTitle }/></Grid>

            {buttons.length > 0 ? <Spacer x={0.5} /> : null}
            { buttons.map((button) => {
                return <>
                    <Spacer/>
                    <Grid direction="column" alignItems={ "center" }>
                        { button }
                    </Grid>
                </>
            }) }

        </>
        </Grid.Container>

        <Spacer y={ 2 }/>
    </>
}