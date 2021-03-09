import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as NAVIMPORTS from '../../materialImportHelper/navImports';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow:1,
    },
    card:{
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
      height: 250,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
}));
export default function ErrorPage() {

    const classes = useStyles();
    const theme = useTheme();
    const history=useHistory();
    const handleRouting = (toPage) => {
     switch(toPage){
         case 'calendar':history.push(ROUTES.CALENDAR);
         break;
         case 'account':history.push(ROUTES.PROFILE_PAGE);
         break;
         default:break;

     }
    };
   
    return (
        <>
            <div className={classes.root}>
                <NAVIMPORTS.Grid container justify="center" spacing={3} >
                    <NAVIMPORTS.Grid item xs={10} >
                        <NAVIMPORTS.Card>
                                <NAVIMPORTS.CardActionArea>
                                    <NAVIMPORTS.CardMedia
                                    className={classes.media}
                                    image="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png"
                                    title="Contemplative Reptile" 
                                    />
                                    <NAVIMPORTS.CardContent>
                                        <NAVIMPORTS.Typography gutterBottom variant="h5" component="h2">
                                        Access Denied
                                        </NAVIMPORTS.Typography>
                                        <NAVIMPORTS.Typography variant="body2" color="textSecondary" component="p">
                                            You might have entered a restricted area or an invalid url
                                        </NAVIMPORTS.Typography>
                                    </NAVIMPORTS.CardContent>
                                </NAVIMPORTS.CardActionArea>
                                <NAVIMPORTS.CardActions>
                                    <NAVIMPORTS.Button size="small" color="primary" onClick={()=>handleRouting("account")}>
                                    My Account
                                    </NAVIMPORTS.Button>
                                    <NAVIMPORTS.Button size="small" color="primary" onClick={()=>handleRouting("calendar")}>
                                    Calendar Overview
                                    </NAVIMPORTS.Button>
                                </NAVIMPORTS.CardActions>
                            </NAVIMPORTS.Card>
                    </NAVIMPORTS.Grid>

                </NAVIMPORTS.Grid>
            </div>
   
        </>
    );
}



