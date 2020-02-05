import React, { Component } from 'react'
import FilterCities from './FilterCities'
import homeIcon from '../Pictures/homeIcon.png';
import '../CSS/Cities.css';
import DSC_0265 from '../Pictures/DSC_0265.JPG';

const cityURL = "http://localhost:5000/cities/all"


export default class Cities extends Component {


  state = {
    isFetching: true,
    cities : [],
    filteredCities: [],

  }




  handleChangeValue = (e) => {

    this.setState({
      cityFilter: e.target.value
    })
   

    this.filterCities()


  }

 

  filterCities = () => {
    let cityFilterExtracted = this.state.cities
    // console.log(this.state.cities)

    
    // if(this.state.isFetching !== true & this.state.cityFilter ===undefined){
    //   cityFilterExtracted = this.state.cities

    // }

    if(this.state.isFetching !== true & this.state.cityFilter !==undefined){

    
cityFilterExtracted = this.state.cityFilter


    
    let filteredCities = this.state.cities
 



    filteredCities = filteredCities.filter((city) => {
  
      let cityName = city.name.toLowerCase() 
      let country = city.country.toLowerCase() 

      if(cityName.toLowerCase().includes(
        cityFilterExtracted.toLowerCase()) ||country.includes(
          cityFilterExtracted.toLowerCase()) ){  return cityName
        
      }

    
    })


    
    this.setState({
      filteredCities
      
    })
  }
  

}



    componentDidMount(){
     
   this.setState({...this.state, isFetching: true})
  
        fetch(cityURL)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
            this.setState({cities: result, 
            isFetching: false,
          
            filteredCities: result
          })
        
 
       
                  
        }
        
        
        );
      
        
    }
 
 

    
    render(props) {



      let listItemsMap =''
      let userCitySelection=''
      let filteredCities = ''
     
     if(this.state.isFetching !== true  ){
     
     

         const {filteredCities} = this.state;
         listItemsMap = filteredCities.map((cityMapper) =>
        <div className ="citycard" key={cityMapper._id}>
          <ul>
         <li className ="cityname" key={cityMapper._id}>{cityMapper.name}</li> 
        
         </ul>
         <div className = "city-image-flexer">
         <img className ="city-image" src={DSC_0265} alt ="DSC_0265"/>
         </div>
         </div>
         );
    
      
          
     }
     
    
    
      
        return (
          
            
            <div className="city-container">
              <FilterCities cities = {this.state.cities}  onChangeValue ={this.handleChangeValue}  />
           
           
     
          {listItemsMap}

          <div className = "home-flexer">
            <a href='/'><img className = "homeIcon" src = {homeIcon} alt ="homeIcon"/></a>
          </div>
          
            </div>
        )
      
            
   
    }

   
}

