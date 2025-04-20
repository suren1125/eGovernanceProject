import React, { createContext, useState, useEffect } from "react";

export const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  const [Elections,setElection] = useState([]);
  const [VotingWindow , setVotingWindow] = useState({});

  useEffect(() => {
    const GetElections= async () => {
        const mayorResponse = await fetch('http://127.0.0.1:8000/get_candidates_mayor/');
        const deputyMayorResponse = await fetch('http://127.0.0.1:8000/get_candidates_deputymayor/');
        const generalMemberResponse = await fetch('http://127.0.0.1:8000/get_candidates_generalmembers/');

        const mayorData = await mayorResponse.json();
        const deputyMayorData = await deputyMayorResponse.json();
        const generalMemberData = await generalMemberResponse.json();

        if(!mayorData && !deputyMayorData && !generalMemberData){
            console.log('No Election Data recieved');
            return;
        }

        const getVotingWindow = await fetch('http://127.0.0.1:8000/get_voting_window/');
        const votingWindow_ = await getVotingWindow.json();
        setVotingWindow(votingWindow_);

        

        setElection([
          {
            candidate: mayorData,
            title: 'Mayoral Election',
            description:
              'Choose the next mayor who will lead city initiatives, manage budgets, and represent our community for the next 4 years.',
          },
          {
            candidate: deputyMayorData,
            title: 'Deputy Mayor Election',
            description:
              'Elect the deputy mayor who will assist the mayor in administrative duties and serve as acting mayor when needed.',
          },
          {
            candidate: generalMemberData,
            title: 'General Member Election',
            description:
              'Elect general council members who will represent their constituencies, participate in policy-making decisions, and work collaboratively with the mayor and deputy mayor to address community needs and concerns.',
          },
        ]);
        
    };

    GetElections();
  }, []);


  return <ElectionContext.Provider value={{Elections , VotingWindow}}>{children}</ElectionContext.Provider>;
};