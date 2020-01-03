import React,{Component} from 'react';
import styled from 'styled-components';
import data from '../../assets/data.json';


const BoardWrapper = styled.div `

`

const  info = data;


class Board extends Component {

  constructor(){
      super()

    this.state={
        data:[],
        loading:true,
        error:''
    }
  }


  async componentDidMount(){


    try{

        const tickets = await fetch(info)

        const ticketsJSON =  await tickets.json();




        if(ticketsJSON){

            this.setState({
                data:ticketsJSON,
                loading:false
            })
        }

    }

    catch(error){

        this.setState({
            error:error.message
        })
    }






  }


  render(){
       const {data,loading,error} = this.state;


       const lanes = [
           {id:1,title:'To Do'},
           {id:2,title:'In Progress'},
           {id:3,title:'Review'}
       ]
    return(
        <BoardWrapper>
            {
            lanes.map(lane =>
             <lane 
               key={lane.id}
               title={lane.title}
               loading={loading}
               error={error}
               tickets={data.filter(
                   ticket => ticket.lane == lane.id
               )}


               />)
            }
        </BoardWrapper>
    )
  }




}


export default Board;