/** @jsx React.DOM */
var React = require('react');
var ReactBootpag = React.createClass({
    
    getInitialState: function(){
        var defaultSett = {
            total: 20,
            startPage: 1,
            page: 1,
            maxVisible: 10,
            nextCallback: function(){},
            prevCallback: function(){},
            nextText: '&raquo;',
            prevText: '&laquo;',
            increment: 1,
            pageCallback: function(){}
        };
        
        if(this.props.settings){

            var settingsKeys = Object.keys(this.props.settings);
            for (var i = 0; i <= settingsKeys.length; i++ ){
                defaultSett[settingsKeys[i]] = this.props.settings[settingsKeys]; 

            }
        }
        return defaultSett;
    },

    handleNext: function(event){
        var num = parseInt(event.currentTarget.getAttribute('data-lp'));
        var update = {page:num, pageStart: this.state.startPage}
        if(this.state.startPage - this.state.increment + this.state.maxVisible  <= this.state.page){
            update.startPage = Math.min(this.state.startPage + this.state.maxVisible, this.state.total );
        }
        this.setState(update);        
        this.state.nextCallback(this.state, num);

    },

    handlePrev: function(event){
        var num = parseInt(event.currentTarget.getAttribute('data-lp'));
        var update = {page:num, startPage: this.state.startPage}
        if(this.state.startPage - this.state.increment >= num){
            update.startPage = Math.max(this.state.startPage - this.state.maxVisible, 1);
        }
        this.setState(update); 
        this.state.prevCallback(this.state, num);
    
    },

    handlePage: function(event){
        var num = parseInt(event.currentTarget.getAttribute('data-lp'));
        this.setState({page:num});
        this.state.pageCallback(this.state, num);

    },

    render: function(){
        
        var list = [];

        if(this.state.prevText){
            list.push( <li 
                        key={'p'}
                        data-lp={Math.max(1,this.state.page -this.state.increment)}
                        onClick={this.handlePrev} 
                        className={this.state.page == 1 ? 'prev disabled': 'prev'  } >
                            <a dangerouslySetInnerHTML={{__html: this.state.prevText}}></a>
                        </li>);
        }
        for(var c = this.state.startPage; c<= Math.min(this.state.total, this.state.startPage + this.state.maxVisible -1 ); c++){
            list.push(<li className={this.state.page== c ? 'disabled' : ''} onClick={this.handlePage} key={c} data-lp={c}><a>{c}</a></li>);
        }
        if(this.state.nextText){
            list.push( <li 
                        onClick={this.handleNext}
                        key={'n'}
                        data-lp={Math.min(this.state.page + this.state.increment, this.state.total)} 
                        className={this.state.page == this.state.total ? 'next disabled': 'next'  }>
                            <a dangerouslySetInnerHTML={{__html: this.state.nextText}}></a>
                        </li>);
        }        
 

        return (

            <ul className="pagination bootpag">
                {list}
            </ul>
        

        );
    }


});
module.exports = ReactBootpag;
