import React from "react";
import { Grid, Paper, Box, Typography, makeStyles } from "@material-ui/core"
import { fisicas, espacios, seguridad, amenidades, especiales, entorno, tiempo } from '../../assets/Strings';

const m2Terrain = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40m2terrain.svg?alt=media&token=31cb600d-f2a4-4531-a561-019953768491";
const m2Build= "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40m2build.svg?alt=media&token=cd98c9f0-4e71-48b8-981d-de91f13918fd";
const bath = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40bathroom.svg?alt=media&token=e8a4f988-cdbb-4b30-9519-584beafadf67";
const halfBath ="https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40halfBath.svg?alt=media&token=f40c6a6e-923d-44a5-ae7d-f091d59e49c7"
const landUseCode ="https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40landuse.svg?alt=media&token=593343f7-e648-4d6e-9cf8-a14e5d2c71f5";
const m2Office ="https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40m2Office.svg?alt=media&token=fb5b7ef4-7ab4-46ff-9543-b0d1fb80ba7e";
const m2Storage = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40m2Storage.svg?alt=media&token=8498d448-7d88-4f25-9d66-be2b3a71a5c6";
const mDepth = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40mBack.svg?alt=media&token=28dd39fb-299f-456b-a178-15bbd0f2ead3";
const mFront = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40mFront.svg?alt=media&token=e62d12fc-1bf1-4ab1-af67-6a914388504a";
const mHeight = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40mHeight.svg?alt=media&token=6d2fa023-d0a9-4229-946f-893c14b39a17";
const totalUnits = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40numAppartments.svg?alt=media&token=bd295fa4-ae4c-4dd8-8715-81e466317699";
const floors = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40numFloors.svg?alt=media&token=956db4eb-d400-42c7-bf6a-d99060423a68";
const parkingSlots = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40parking.svg?alt=media&token=f2c92b73-5702-4ba8-b652-5fb2e63c371c";
const room = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40rooms.svg?alt=media&token=0d8db160-29a1-4cdc-a836-041ce7969dfc";
const unitsForSale = "https://firebasestorage.googleapis.com/v0/b/witideal-b1f99.appspot.com/o/assets%2Ficons%2Fthumb%40saleUnits.svg?alt=media&token=28dd4f07-211c-403f-88c2-1abb6f8eeea8";


const specificDataSections = {
    ...fisicas,
    ...espacios,
    ...seguridad,
    ...amenidades,
    ...especiales,
    ...entorno,
    ...tiempo
}

const iconsArray = {
    m2Terrain,
    m2Build,
    bath,
    halfBath,
    landUseCode,
    m2Office,
    m2Storage,
    mDepth,
    mFront,
    mHeight,
    totalUnits,
    floors,
    parkingSlots,
    room,
    unitsForSale
}

const wdRegularBlue = "#160A53";

const styles = makeStyles(theme => ({
    textNumber: {
        color: wdRegularBlue,
        fontWeight: 700
    },
    text: {
        color: wdRegularBlue,
    },
    paper: {
        borderRadius: 10,
        backgroundColor: "#F7F6FF",
        wordWrap: "break-word"
    }

}));

export const SpecificDataIcons = props => {

    /*

        ===== props
        properData = object, specificData information
     
    */

    const classes = styles();

    const renderIcons = () => {
        let auxIcons = []

        for (let section in specificDataSections) {
            if (Object.keys(specificDataSections[section]).includes('icons')) {
                if (specificDataSections[section].icons.includes(0)) {
                    auxIcons.push(section)
                }
            }
        }

        return (
            auxIcons.map(element => {
                if(props.properData !== undefined){
                    if(props.properData[element] !== undefined && props.properData[element] > 0){
                        return (
                            <Grid item  xs={12} sm={6} md={3} lg={6} key={element}>   
                                <Paper className={classes.paper}>
                                    <Box p={1}>
                                        <img width={80} src={iconsArray[element]} alt='' />
                                        <Typography className={classes.textNumber} variant='h5'>{props.properData[element]}</Typography>
                                        <Typography className={classes.text} variant='subtitle1'>{specificDataSections[element].name}</Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    }else{
                        return(<span key={element}></span>)
                    }
                }else{
                    return(<span key={element}></span>)
                }
                
                
            })
        )
    }


    // console.log('iconos',renderIcons())


    return (
        <React.Fragment>
            <Grid container justify='center' alignItems='center' spacing={2}>
                {renderIcons()}
            </Grid>
        </React.Fragment>
    )
}