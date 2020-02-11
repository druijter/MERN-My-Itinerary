import  {
    FETCH_CITIES_REQUEST, 
    FETCH_CITIES_SUCCESS, 
    FETCH_CITIES_FAILURE,
    SEND_USER_INPUT
} from './cityTypes'
 

//fetch data//
export const fetchCitiesRequest = () => {
    return {
        type: FETCH_CITIES_REQUEST,
        
    }

}


export const fetchCitiesSuccess  = cities => {
    return {
        type: FETCH_CITIES_SUCCESS,
        payload: cities
    }
}


export const fetchCitiesFailure = (error) => {
    return {
        type: FETCH_CITIES_FAILURE,
        payload: error

    }
}




export const fetchCities = () => {
    return(dispatch) => {
        dispatch(fetchCitiesRequest())

        return fetch("http://localhost:5000/cities/all", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            console.log(response); 
            return response.json()
        })
        .then(data => {
            const cities = data
            console.log(cities)
            dispatch(fetchCitiesSuccess(cities))
        })
        .catch (error => {
            const errorMessage = error.message
            dispatch(fetchCitiesFailure(errorMessage))
            console.log(errorMessage)
        })
    }
    
}

//filter cities//
export const sendUserInput = () => {
    return {
        type:SEND_USER_INPUT,
        text: ''
        
    }

}