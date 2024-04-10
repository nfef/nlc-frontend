import React from 'react';
import CandidateCard from './CandidateCard';
import { API } from '../utils/api';

const CandidateList = () => {
  const [candidates, setCandidates] = React.useState([]);

  React.useEffect(() => {
    API.get('/candidates').then((response) => {
      setCandidates(response.data);
    });
  }, []);

  return (
    <div className='row'>
      {candidates.map((candidate) => (
        <div key={candidate.id} className='col-md-4 col-sm-6 col-xs-12' style={{marginTop: 30}}>
          <CandidateCard candidate={candidate} />
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
