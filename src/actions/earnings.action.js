import * as urls from '../constants/urlTypes';
import * as actions from '../constants/actionTypes';
import * as CONFIG from '../constants/config';

export function getEarningsByTicker(stock){
    return dispatch => {
      return fetch(urls.iexUrl + '/beta/stock/' + stock.toLowerCase() + '/earnings/10?token=' + CONFIG.apiToken, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json'
        },
      }).then(function(response){
        if(!response.ok) {
          return Promise.reject(response.statusText);
        }
        return response.json();
      }).then(function(json){
        dispatch(receiveEarnings(json));
        return json;
    });
    }
}

export function receiveEarnings(earnings){
    return {
        type: actions.RECEIVE_EARNINGS,
        earnings
    }
}