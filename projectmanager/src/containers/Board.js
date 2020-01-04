import React,{Component} from 'react';
import styled from 'styled-components';
import data from '../assets/data.json';
import Lane from '../components/Lane/Lane.js'
import withDataFetching from '../withDataFetching';

const BoardWrapper = styled.div `
display:flex;
justify-content:space-between;
flex-direction:row;
margin:5%;

@media (max-width: 768px) {
    flex-direction: column;
  }
`

const  info = data;


class Board extends Component {

  constructor(props){
      super(props)

    this.state={
        data:[],
        loading:true,
        error:'',
        lanes:[]
    }
  }


  async componentDidMount(){


    try{

         const lanes = this.props.lanes
        console.log(info,'info')

        const tickets = await fetch('../assets/data.json')

        console.log(tickets,'tickets')
        const ticketsJSON =  await tickets.json();




        if(ticketsJSON){

            this.setState({
                data:ticketsJSON,
                loading:false,
                lanes:lanes
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
       const { lanes,data,loading,error} = this.state;


    //    const lanes = [
    //        {id:1,title:'To Do'},
    //        {id:2,title:'In Progress'},
    //        {id:3,title:'Review'},
    //        {id:4,title:'Done'}
    //    ]


       console.log(this.state.data,'data')
    return(
        <BoardWrapper>
            {
            lanes.map(lane =>
             <Lane 
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

// expport a the function to hoc to create a new component

// const Board = ({lanes,loading,error,data}) => (
//  <BoardWrapper>
//      {
//         lanes.map(lane =>(
//             <Lane       
//             key={lane.id}
//             title={lane.title}
//             loadin={loading}
//             error={error}
//             tickets ={data.filter(ticket => ticket.lane === lane.id)}
//             />
//         ))
//      }

//  </BoardWrapper>
// )


// export default Board;
export default withDataFetching(Board)