import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {WarningModal} from '../WarningModal/warningModal';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ThumbComponent } from "../ThumbComponent/thumbComponent";
import { ThumbComponentURL } from '../ThumbComponentURL/thumbComponentURL';
import ListImagesDragable from '../ListImagesDragable/listImagesDragable'
const wdPurpleSubtitle = "#1E0E6F";
const wdLightPurple = "#F9F7FC";
const wdDarkPurple = "#E0D7EE";

const useStyles = makeStyles(theme => ({
    subtitleText: {
        color: wdPurpleSubtitle,
        fontWeight: 700
    },
    //styles from demo dropzone
    thumbsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    imgSize: {
        width: "50vw"
    },
    img: {
        display: "block",
        width: "auto",
        height: "100%",
        transition: "5s"
    },
    dragContainer: {
        backgroundColor: wdLightPurple,
        borderRadius: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: wdPurpleSubtitle,
        transition: "0.3s",
        "&:hover": {
            backgroundColor: wdDarkPurple,
            borderStyle: "solid",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
            cursor: "pointer"
        }
    },
    dragContainer_hover: {
        backgroundColor: wdDarkPurple,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 1,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        borderColor: wdPurpleSubtitle
    }
}));

export function DropZoneComp(props) {
    const classes = useStyles();

    const [warning,setWarning] = useState({
        open: false,
        alarmText:''
    })


    const [open, setOpen] = React.useState(false);
    const [modalToRender, setModalToRender] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleWarning = (alarmText) =>{
        setWarning({
            open: !warning.open,
            alarmText:`${alarmText}`
        })
    }


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png, image/jpg",
        onDrop: (acceptedFiles, rejectedFiles) => {
            let numFilesInSection = props.files[props.section] !== undefined ? Object.entries(props.files[props.section]).length : 0;
            let availableMemory = props.maxPhotos - (numFilesInSection + props.imgUrls.length)
            console.log('acceptedFiles', acceptedFiles.length)
            console.log('availableMemory', availableMemory)
            if (acceptedFiles.length <= availableMemory) {
                keepFiles(acceptedFiles);
            }else{
                handleWarning(`Aún dispones de ${availableMemory} espacios para fotos, pero estás intentando subir ${acceptedFiles.length} fotos.`);
            }
            rejectedFiles.map(file => {
                return <p>El archivo {file.path} no tiene formato .jpg o .png</p>;
            });
        },

    });

    const section = props.section;

    function keepFiles(filesToKeep) {
        let limitedFiles = [];
        let keepedFiles = {};
        for (let i = 0; i < filesToKeep.length; i++) {
            if (i < props.maxPhotos - props.imgUrls.length) {
                limitedFiles[i] = filesToKeep[i];
            }
        }

        limitedFiles.forEach(file => {
            keepedFiles[file.path] = Object.assign(file, {
                preview: URL.createObjectURL(file)
            });
        });

        console.log('section', props.section, 'files', { ...props.files[props.section] }, 'keepedFiles', { ...keepedFiles })

        props.setFiles(props.section, {
            ...props.files[props.section],
            ...keepedFiles
        })

    }

    function delFile(newFiles) {
        console.log('newFiles in del:', newFiles)
        if (Object.entries(newFiles).length <= 0) {
            props.clearFiles(props.section)
        } else {
            props.setFiles(
                props.section, {
                ...newFiles
            })
        }


    }


    function renderFiles() {
        let masterFileObject = props.files[props.section];

        let imgSources = [];
        let fileKeys = [];
        for (let file in masterFileObject) {
            imgSources.push(masterFileObject[file].preview);
            fileKeys.push(file);
        }

        return imgSources.map((element, index) => {
            return (
                <Grid item xs={12} md={6} lg={4} key={element}>
                    <React.Fragment >
                        <ThumbComponent
                            openModal={handleOpen}
                            modalSetter={setModalToRender}
                            fileKey={fileKeys[index]}
                            files={props.files[props.section]}
                            //setFiles={props.setFiles}
                            delFile={delFile}
                        >
                            {element}
                        </ThumbComponent>
                    </React.Fragment>
                </Grid>
            );
        });
    }

    const renderModal = () => {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <img
                            className={classes.imgSize}
                            src={modalToRender}
                            alt={modalToRender}
                        />
                    </div>
                </Fade>
            </Modal>
        );
    };

    const dragActive = (
        <React.Fragment>
            <Box p={2} className={classes.dragContainer_hover}>
                <Typography className={classes.subtitleText} variant="h5">
                    Suelta los archivos
        </Typography>
            </Box>
        </React.Fragment>
    );


    const dragInactive = (
        Object.entries(props.files[props.section] !== undefined ? props.files[props.section] : []).length < props.maxPhotos - props.imgUrls.length ?
            <React.Fragment>
                <Grid item xs={12}>
                    <Box p={2} className={classes.dragContainer}>
                        <Typography className={classes.subtitleText} variant="h5">
                            Arrastra los archivos o presiona para seleccionar
                    </Typography>
                        <Typography variant='subtitle1'>
                            (Fotos disponibles para subir: {props.maxPhotos - props.imgUrls.length - Object.entries(props.files[props.section] !== undefined ? props.files[props.section] : []).length})
                    </Typography>
                    </Box>
                </Grid>
            </React.Fragment> :
            <span></span>
    );

    const handleDelPrincipalPhotoFromFB = (link) => {
        let auxObj = props.urlPdf;
        delete auxObj['principalPhotoPath'];
        props.setUrlPdf(auxObj);
        props.setUrlsToDel([...props.urlsToDel, link]);

    }

    const handleDelUrlLink = (link, section) => {
        let auxObj = props.urlPdf;
        console.log('auxObj before: ', auxObj);
        let tempImgArray = auxObj[section].filter(url => url !== link)

        console.log('filter in tempImgArray', tempImgArray)
        auxObj[section] = tempImgArray;
        console.log('auxObj after: ', auxObj)

        if (auxObj[section].length === 0) {
            delete auxObj[section]
        }

        console.log('last auxObj', auxObj)

        // console.log('section en AuxObj before: ',auxObj[section])
        // console.log('url in section',link)

        // auxObj[section].splice(link);

        // console.log('section en AuxObj after: ',auxObj[section])


        // if(Object.entries(auxObj[section]).length === 0){
        //     delete auxObj[section];
        // }

        props.setUrlPdf(auxObj);
        props.setUrlsToDel([...props.urlsToDel, link]);
    }

    const renderUrlFiles = () => {
        let urlPreviews = [];

        if (props.imgUrls.length > 0) {
            if (typeof (props.imgUrls) === 'string') {
                urlPreviews.push(
                    <ThumbComponentURL
                        openModal={handleOpen}
                        modalSetter={setModalToRender}
                        files={props.imgUrls}
                        delUrl={handleDelPrincipalPhotoFromFB}
                        section={props.section}
                    />
                )
            } else {
                for (let link in props.imgUrls) {

                    urlPreviews.push(
                        <ThumbComponentURL
                            openModal={handleOpen}
                            modalSetter={setModalToRender}
                            files={props.imgUrls[link]}
                            delUrl={handleDelUrlLink}
                            section={props.section}
                        />
                    )
                }
            }
        }
        return urlPreviews.map((element, index) => {
            return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <React.Fragment >
                        {element}
                    </React.Fragment>
                </Grid>
            )
        })
    }


    return (
        <React.Fragment>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? dragActive : dragInactive}
            </div>

            <aside className={classes.thumbsContainer}>
                <Grid container justify='flex-start' alignItems='center' spacing={1}>
                    {renderUrlFiles()}
                    {props.section === 'extras' ? (
                    <ListImagesDragable 
                        pictures={props.files[props.section]}
                        principalPhotoPath={props.files.principalPhotoPath}
                        setProperDataFiles={props.setProperDataFiles}
                    />
                    ) : renderFiles()}
                    {renderModal()}
                </Grid>
            </aside>
            <aside className={classes.thumbsContainer}>
                
            </aside>

            <WarningModal
                open={warning.open}
                alarmText={warning.alarmText}
                handleClose={handleWarning}
            />

        </React.Fragment>
    );
}
