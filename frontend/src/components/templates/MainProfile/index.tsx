import { useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useDropzone} from 'react-dropzone'
import filesize from 'filesize'

import Button from '../../atoms/Button'
import IconPhotoProfile from '../../atoms/IconPhotoProfile'

import * as UserActions from '../../../store/ducks/user/actions'

import {
    Container,
    ButtonEditPhoto
} from './styles'

export interface IFile {
    id: string;
    name: string;
    readableSize: string;
    uploaded?: boolean;
    preview: string;
    file: File | null;
    progress?: number;
    error?: boolean;
    url: string;
}

const MainProfile = () => {
    const userSelected = useSelector(state => state.userReducer.userSelected)

    const dispatch = useDispatch()

    const onDrop = useCallback(async (acceptedFiles: File[]) => {

        const photoObject: IFile = {
            file: acceptedFiles[0],
            id: '0',
            name: acceptedFiles[0].name,
            readableSize: filesize(acceptedFiles[0].size),
            preview: URL.createObjectURL(acceptedFiles[0]),
            progress: 0,
            uploaded: false,
            error: false,
            url: ""
        }

        const data = await fetch(photoObject.preview)

        const blob = await data.blob()

        console.log('blob', blob)

        const reader = await new FileReader()

        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            if(userSelected)
                dispatch(UserActions.changePhotoProfile({
                    base64: reader.result,
                    idUser: userSelected.idUser
                }))
        }        
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    return (
        <Container>
            <div {...getRootProps()}>
                <ButtonEditPhoto 
                    {...getInputProps()}
                />
                <IconPhotoProfile size={100} src={userSelected?.photoProfileUser}/>            
            </div>
        
            <span>{userSelected?.nameUser}</span>
            <p>{userSelected?.descriptionUser}</p>

            <Button content='Editar Perfil'/>
        </Container>
    )
}

export default MainProfile