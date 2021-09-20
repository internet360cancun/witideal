import React,{useState,useEffect} from 'react';
import { Grid, Typography } from '@material-ui/core';
import { DropZoneComp } from '../DropzoneComp/dropZoneComp';
import {makeStyles} from '@material-ui/core/styles';
import {imgCategories,genderArray} from '../../assets/Strings';
import {propertyType_es} from '../../assets/Strings';

const wdPurpleSubtitle = '#1E0E6F';

const useStyles = makeStyles(theme => ({
    subtitleText: {
        color: wdPurpleSubtitle,
        fontWeight: 700
    },
}));

export function PromoFormMultimedia(props) {

    /*
        == props
        properData -> data of the property
        properDataFiles-> file objects to upload
        setProperDataFiles-> function to update the files in properdatafiles
        urlPdf->  object file from FB with sections and arrays of URLS
        setUrlPdf -> function to set the new url object to update firestore
        urlsFromFBToDelete -> array of urls to be deleted in the storage
        setUrlsFromFBToDelete -> function to update the array of urls to be deleted in the storage
    */

    const classes = useStyles();
    //const [FilesData,setFiles] = useState({});
    
    var selectedGender = genderArray.indexOf(propertyType_es[props.properData.propertyType]);
    //var selectedGender = 2

    //console.log('props',props)

    const setSectionFiles = (section, newFiles) =>{
        props.setProperDataFiles({
            ...props.properDataFiles,
            [section]: newFiles
        })
    }

    const clearSectionFiles = (section) =>{
        let auxObj = props.properDataFiles;
        delete auxObj[section];
        props.setProperDataFiles({
            ...auxObj
        })
    }

    
    function renderDropZone(){
        var titleAuxVec = [];
        //console.log('imgCategories',imgCategories)
        //console.log('urlPDF in render:',props.urlPdf);
    
        for(let dropzoneSec in imgCategories){
            var secNeedsImg = imgCategories[dropzoneSec];
            //console.log(props.urlPdf[secNeedsImg['section']] !== undefined ? props.urlPdf[secNeedsImg['section']]: 'no hay fotos')
            //console.log(secNeedsImg['maxPhotos']);
            if(secNeedsImg['genders'] !== undefined && secNeedsImg['genders'].includes(selectedGender)){
                //var colSize = secNeedsImg['section'] === 'principalPhotoPath' ? 12 : 3;
                titleAuxVec.push(
                    <Grid item xs={12} key={secNeedsImg['title']}>
                        <Typography variant='h5' align='left' className={classes.subtitleText}>{secNeedsImg['title']}</Typography>
                        <DropZoneComp
                        maxPhotos={secNeedsImg['maxPhotos']}
                        setFiles={setSectionFiles}
                        clearFiles={clearSectionFiles}
                        files={props.properDataFiles}
                        properDataFiles={props.properDataFiles}
                        setProperDataFiles={props.setProperDataFiles}
                        section={secNeedsImg['section']}
                        imgUrls={props.urlPdf[secNeedsImg['section']] !== undefined ? props.urlPdf[secNeedsImg['section']]: []}
                        urlPdf={props.urlPdf}
                        setUrlPdf={props.setUrlPdf}
                        urlsToDel={props.urlsFromFBToDelete}
                        setUrlsToDel={props.setUrlsFromFBToDelete}
                        />
                    </Grid>
                    );
            }
        }
        return titleAuxVec;
    }



    return (
        <React.Fragment>
            <Grid container spacing={4} justify='flex-start' alignItems='center'>
                <Grid item xs={12}>
                    <Typography align='left'>Coloca las fotos en la sección que corresponde para mejorar el desempeño de tu anuncio.</Typography>
                </Grid>
                
                {
                    renderDropZone().map(element=>{
                        return(element)
                    })
                }

            </Grid>
        </React.Fragment >
    )
}