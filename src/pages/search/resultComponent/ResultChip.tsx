import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Stack,
    Typography,
    Box, 
    IconButton
} from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { useAppContext } from "../../../context/appContext"
import * as typing from '../../../types/appTypes'
import '../css/search.css'

interface forResultChips{
    result: typing.theUser['user']
}

const ResultChip: React.FC<forResultChips> = ({ result }) => {

    const navigate = useNavigate()

    const { currentUser, doFollow, token, searchType, getTheView } = useAppContext()
    const isFollowing = currentUser.following.indexOf(result!._id) !== -1

    const handleFollow = (userId: string )=>{
        doFollow(userId, token, searchType)
    }

    const handleShowUser = async (userId: string)=>{
        const canNavigate = await getTheView(userId, token, searchType)
        if (canNavigate) return navigate(`/u/:${userId}`)
    }

    useEffect(()=>{

    },[currentUser])

  return (
    <>
        <Box
            sx={{
                boxSizing:"border-box",
                ml: 1,
                // minWidth: "300px",
                width: "300px",
                height: "90%",
                borderRadius: "10px",
                backgroundColor:"#f7f7f7",
                display:"flex", 
                flexDirection:"row", 
                alignItems: 'center',
                jusifyContent: "space-between",
                "&.MuiBox-root:hover":{
                    backgroundColor: "#e8f2fc"
                }
            }}
        >
            <div className="resultChipImageDiv" onClick={()=>handleShowUser(result?._id as string)}>
                <img  className="resultDisplayPic" src={result?.picture} alt={`${result?.username} display pic`}/>
            </div>
            <Stack sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    ml: 1
                }}
                onClick={()=>handleShowUser(result?._id as string)}
            >
                <Typography variant="subtitle1">{result?.firstname} {result?.lastname}</Typography>
                <Typography variant="subtitle2" sx={{ color: "#048"}}>{`@${result?.username.substring(0, 12)}`}</Typography>
            </Stack>
            <Stack sx={{
                    borderRadius: "50%",
                    height: "100%",
                    display: "flex", flexDirection:"column", justifyContent: 'center',
                    width:"50px",
                    p:0,
                    mr: 2,
                }}>
                <IconButton 
                    onClick={()=>handleFollow(result?._id as string)}
                >
                    {!isFollowing? <PersonAddAltIcon />: <PersonRemoveAlt1Icon/>}
                </IconButton>
            </Stack>
        </Box>
    </>
  )
}

export default ResultChip