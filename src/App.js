import './App.css'
import React, { Component } from 'react'
import Navbar from './components/navbar'
import News from './components/News'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  
  pageSize=15
  apiKey="50c19b73a6ff4f3fa552b218d68c1e5e"
  //apiKey=process.env.REACT_APP_NEWS_API
  
 
  state={
    progress:0
  }
  setProgress=(progress)=> {
    this.setState({progress:progress})
  }
  
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        //onLoaderFinished={() => setProgress(0)}
      />
        <Navbar />

       
       
        <Routes>
          <Route exact path="/" element={<News  apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category={"general"} setProgress={this.setProgress}/>}></Route>
          <Route exact path="/business" element={ <News  apiKey={this.apiKey} key="business" pageSize={this.pageSize} country={"in"} category={"business"} setProgress={this.setProgress} />}></Route>
          <Route exact path="/entertainment" element={<News  apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country={"in"} category={"entertainment"} setProgress={this.setProgress}/>}></Route>
          <Route exact path="/general"element={ <News  apiKey={this.apiKey} key="general" pageSize={this.pageSize} country={"in"} category={"general"}  setProgress={this.setProgress}/>}></Route>
          <Route exact path="/health" element={<News  apiKey={this.apiKey} key="health" pageSize={this.pageSize} country={"in"} category={"health"} setProgress={this.setProgress} />}></Route>
          <Route exact path="/science" element={<News  apiKey={this.apiKey} key="science" pageSize={this.pageSize} country={"in"} category={"science"} setProgress={this.setProgress}/>}></Route>
          <Route exact path="/sports" element={ <News  apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country={"in"} category={"sports"} setProgress={this.setProgress}/>}></Route>
          <Route exact path="/technology" element={<News  apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country={"in"} category={"technology"} setProgress={this.setProgress}/>}></Route>
        </Routes>
        </Router>
      </div>
      
    )
  }
}