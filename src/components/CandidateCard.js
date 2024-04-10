import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import './candidate-card.style.scss';
import { constants } from '../utils/constants';
import { API } from '../utils/api';
import PaymentDialog from './payment-dialog';

const useStyles = makeStyles({
    dialog: {
        position: 'absolute',
        top: 0,
        maxHeight: '100%',
        overflow: 'hidden',
    },
});

const CandidateCard = ({ candidate }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState(null);

    const handleClickOpen = () => {
        API.get(`/candidates/${candidate.id}`).then((response) => {
            setDetails(response.data);
            console.log('les details ', response.data);
            setOpen(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className='candidate'>
                <div className='candidate-top' style={{ backgroundImage: `url(${constants.baseUrl}uploads/photo/${candidate.photo})` }}>

                </div>
                <div className='candidate-vote'>
                    <span className='candidate-vote_number'>{candidate.votes}</span>
                    <span className='candidate-vote_text'>{candidate.votes > 1 ? "Votes" : "Vote"}</span>
                </div>
                <div className='text-center candidate-bottom'>
                    <div className=' d-flex spacebetween'> <span>Candidat N°{candidate.numero} </span> - <span><strong>{candidate.pays}</strong></span> </div>
                    <h3 className=''>{candidate.nom}</h3>
                    <button onClick={handleClickOpen} className='candidate-btn btn btn-secondary'>
                        VOTE
                    </button>
                </div>

            </div>
            {details && (
                <Dialog open={open} onClose={handleClose} className={classes.dialog}>
                    <PaymentDialog candidate={details}  onClose={handleClose}/>
                </Dialog>
            )}
        </React.Fragment>
    );
};

export default CandidateCard;
