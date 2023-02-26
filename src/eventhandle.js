import React from "react";
export class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        }
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        // this.handleClick = this.handleClick.bind(this)
    }
    // class Fileds 语法
    handleClick  = ()  =>  {
        this.setState((state) => ({
            isToggleOn: !state.isToggleOn
        }))
    }
    render () {
        return(
            <button onClick={this.handleClick}>{
                this.state.isToggleOn ? 'On' : 'OFF'
            }</button>
        );
    }
}   