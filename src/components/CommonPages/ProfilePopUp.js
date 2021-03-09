import React from 'react'
import * as mui from '../../materialImportHelper/materialImports';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        // padding:theme.spacing(2),
        width:'50%',
        maxWidth:'none',

    },

   
  }));
  

const ProfilePopUp=(props)=>{
const {title, children, openPopup, setOpenPopup} =props;
const classes=useStyles();
    return(
        <>
        <mui.Dialog open={openPopup} classes={{paper:classes.dialogWrapper}} >
            <mui.DialogTitle className="text-center">
                <div>
                    <mui.Typography variant="h6" component="div">
                        {title}
                    </mui.Typography>
                </div>
            </mui.DialogTitle>
            <mui.DialogContent divider={true}>
                {children}
            </mui.DialogContent>
        </mui.Dialog>
        </>
    )
}

export default ProfilePopUp;