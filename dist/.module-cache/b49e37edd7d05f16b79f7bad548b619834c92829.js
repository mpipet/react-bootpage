/** @jsx React.DOM */
var React = require('react');
var ReactBootpag = React.createClass({displayName: 'ReactBootpag',
    
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
            href: "/user/:page/",
            pageCallback: function(){}
        };
        
        if(this.props.settings){

            var settingsKeys = Object.keys(this.props.settings);
            for (var i = 0; i < settingsKeys.length; i++ ){
                defaultSett[settingsKeys[i]] = this.props.settings[settingsKeys[i]]; 
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
          var page = Math.min(this.state.page + this.state.increment, this.state.total);
          var href = this.state.href.replace(':page', page);
          list.push( React.DOM.li({
                        key: 'p', 
                        'data-lp': Math.max(1,this.state.page -this.state.increment), 
                        onClick: this.handlePrev, 
                        className: this.state.page == 1 ? 'prev disabled': 'prev'}, 
                            React.DOM.a({href: href, dangerouslySetInnerHTML: {__html: this.state.prevText}})
                        ));
        }
        for(var c = this.state.startPage; c<= Math.min(this.state.total, this.state.startPage + this.state.maxVisible -1 ); c++){
          var href = this.state.href.replace(':page', c);
          list.push(React.DOM.li({className: this.state.page== c ? 'active' : '', onClick: this.handlePage, key: c, 'data-lp': c}, React.DOM.a({href: href}, " ", c)));
        }
        if(this.state.nextText){
            var page = Math.min(this.state.page + this.state.increment, this.state.total);
            var href = this.state.href.replace(':page', page);
            list.push( React.DOM.li({
                        onClick: this.handleNext, 
                        key: 'n', 
                        'data-lp': Math.min(this.state.page + this.state.increment, this.state.total), 
                        className: this.state.page == this.state.total ? 'next disabled': 'next'}, 
                            React.DOM.a({href: href, dangerouslySetInnerHTML: {__html: this.state.nextText}})
                        ));
        }        
 

        return (

            React.DOM.ul({className: "pagination bootpag"}, 
                list
            )
        

        );
    }


});
module.exports = ReactBootpag;
