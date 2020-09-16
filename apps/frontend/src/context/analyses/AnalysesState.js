import React, { useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AnalysesContext from './analysesContext';
import analysesReducer from './analysesReducer';
import { ANALYSIS_COMPLETE, ANALYSIS_ERROR, START_ANALYSIS } from '../types';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['X-XSRF-TOKEN'] = document.cookie.split('=').pop(); //TODO

const AnalysesState = (props) => {
  const initialState = {
    performing: false,
    results: {},
  };

  const [state, dispatch] = useReducer(analysesReducer, initialState);

  const performAnalysis = (cloneUrl, fullName) => {
    dispatch({ type: START_ANALYSIS });
    const socket = new WebSocket(`wss://${window.location.host}/api/v1/analyses`);
    socket.onopen = () => {
      console.log(socket);
      socket.send(
        JSON.stringify({
          event: 'perform_analysis',
          data: { clone_url: cloneUrl },
        }),
      );
    };
    socket.onerror = (err) => {
      console.log(err);
      socket.close();
    };
    socket.onmessage = (message) => {
      console.log(message);
      const { event, data } = JSON.parse(message.data);
      switch (event) {
        case 'analysis_result':
          console.log(data);
          dispatch({ type: ANALYSIS_COMPLETE, payload: { [`${fullName}`]: data } });
          toast.success('Analysis complete!');
          socket.close();
          break;
        case 'error':
          console.log(data);
          dispatch({ type: ANALYSIS_ERROR });
          toast.error('Analysis error!');
          socket.close();
          break;
        default:
          console.log(data);
          socket.close();
      }
    };
    socket.onclose = (ev) => {
      console.log('closed');
    };
  };

  return (
    <AnalysesContext.Provider
      value={{
        performing: state.performing,
        results: state.results,
        performAnalysis,
      }}
    >
      {props.children}
    </AnalysesContext.Provider>
  );
};

export default AnalysesState;
