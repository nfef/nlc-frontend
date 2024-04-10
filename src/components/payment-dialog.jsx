import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import  {API} from '../utils/api';
import { generateUniqueId } from '../utils/Utils';
import './payment-dialog.style.scss';
import { constants } from '../utils/constants';

const PaymentDialog = ({ candidate, onClose }) => {
    
    const [voteNumber, setVoteNumber] = useState(0);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(1);
    const [placeholder, setPlaceholder] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [textbtn, setTextbtn] = useState('Aller au paiement');
    const selectRef = useRef(null);

    const handlePaymentChange = (e) => {
        
        setPaymentMethod(e.target.value);
    }

    const handleVoteChange = (e) => {
        setVoteNumber(e.target.value);
    }

    const estMultipleDeSix = (nombre) => {
        return nombre % 6 === 0;
      }




    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const selectedValue = selectRef.current.value;
        console.log('selectedValue ',selectedValue);
        // console.log('selectedValue ',selectedValue);
        const formData = new FormData();

        if(selectedValue == "USD" || selectedValue == "EUR"){
            if(estMultipleDeSix(voteNumber)){
                formData.append("amount", (1 / constants.unique_vote_amount_foreign) * voteNumber);
            }else{
                onClose();
                Swal.fire({
                    title: 'Information',
                    text: 'Vous avez choisi le paiement par carte ou PayPal. Veuillez saisir un nombre de vote multiple de 6.',
                    confirmButtonText: 'OK',
                    
                    
                  });
                 
            }
            
        }else{
            formData.append("amount", constants.unique_vote_amount * voteNumber);
        }
        formData.append("currency_code", selectedValue);
        formData.append("votes", voteNumber);
        formData.append("lang", "fr");
        formData.append("item_ref", `c${candidate.id}_${generateUniqueId()}`);
        formData.append("item_name", `Vote pour ${candidate.nom}`);
        formData.append("description", `Vote pour ${candidate.nom}`);
        formData.append("public_key", constants.publicKey);
        // formData.append("environement", "test");

        setTextbtn('Redirection vers le paiement en cours ...');
        API.post(`/gotopaiement/${candidate.id}`, formData).then((res) => {
            // console.log('res.data.response ', res.data);
            if(res.data.response == 'success'){
                window.location.href = res.data.payment_url;
            }else{
                console.log(res.data);
            }
            console.log('data', res);
          });


    }

    return (
        <div className='paymentdialog'>
            <h1>Vote pour {candidate.nom}</h1>
            <h3>Pour les paiements mobiles (Orange & MTN)</h3>
            <p className="paymentdialog-note">
            100 F CFA = 1 vote 
            </p>
            <hr />
            <h3>Pour les paiements par carte ou PayPal</h3>
            <p className="paymentdialog-note">
            $1 (Dollar) = 6 votes
            </p>
            <p className="paymentdialog-note">
            1€ (Euro) = 6 votes
            </p>
            <hr />
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label htmlFor="inputPayment">Moyen de Paiement</label>
                    <select ref={selectRef}  className="form-control">
                        <option value="">--Select un moyen de paiement--</option>
                        <option value="XAF">Orange Money</option>
                        <option value="XAF">MTN Mobile Money</option>
                        <option value="USD">Carte de crédit ($ Americain)</option>
                        <option value="EUR">Carte de crédit (€uro)</option>
                        <option value="USD">PAYPAL ($ Americain)</option>
                        <option value="EUR">PAYPAL (€uro)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="inputNumber">Entrez le nombre de vote(s)</label>
                    <input type="number"  value={voteNumber} className="form-control" onChange={handleVoteChange} id="inputNumber"  />
                    {/* <input type="number" step={step} value={voteNumber} className="form-control" onChange={handleVoteChange} id="inputNumber" placeholder={placeholder} /> */}
                </div>
                <button type="submit" className="btn btn-default btn-success">{textbtn}</button>
            </form>
            {/* <div className="paymentdialog-candidate">
                <img src={`${constants.baseUrl}uploads/photo/${candidate.photo}`} className='img-fluid' alt="" />
            </div> */}
        </div>
    )
}

export default PaymentDialog