import React from 'react';
import { useDropzone } from 'react-dropzone';
import useFirebaseTools from '../../Hooks/useFirebaseTools';

export function UploadImgToFirebaseTest(props) {

    const {uploadImage} = useFirebaseTools();

    const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png'
    });

    console.log(acceptedFiles);

    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
    </li>
    ));

    const rejectedFilesItems = rejectedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
    </li>
    ));


    const handleUpload = () => {
        if(acceptedFiles.length > 0){
            for(var file in acceptedFiles){
                let imageFile = acceptedFiles[file];
                uploadImage(imageFile,imageFile.name);
            }
        } else{
            alert('Porfavor selecciona al menos 1 imagen para subir en tu inmueble.')
        }
    }

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>
                    {acceptedFilesItems}
                </ul>
                <h4>Rejected files</h4>
                <ul>
                    {rejectedFilesItems}
                </ul>
            </aside>
            <div>
                <button onClick={handleUpload}>Click to Upload</button>
            </div>
        </section>
    );
}
