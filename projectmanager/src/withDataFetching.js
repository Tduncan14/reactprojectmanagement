import React,{Component} from 'react';

// creating an highorder component that returns a  new component

export default function withDataFetching(WrappedComponent){


 class WithDataFetching extends Component{

    constructor(props){
        super(props);
        this.state ={
         data:[],
         loading:true,
         error:''
        }
    }


    async componentDidMount(){

       try {
           const data = await fetch(this.props.dataSource)

           const dataJSON = await data.json();


           if(dataJSON){
               this.setState({
                   data:dataJSON,
                   loading:false
               });
           }
       }

        catch(error){
            this.setState({
                loading:false,
                error:error.message
            })
        }

    }
      
    render(){
        const {data,loading,error} = this.state;
    return(
        <WrappedComponent   
          data={data}
          loading={loading}
          error = {error}
          {...this.props}/>
    )
  }
}

    WithDataFetching.displayName = `withDataFetching(${WrappedComponent.name})`;


    return WithDataFetching;

}