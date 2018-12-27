import React from 'react';
import dateFns from 'date-fns';
import left from '../icons/left.png';
import right from '../icons/right.png';
import './Calender.css';

class Calender extends React.Component {
    state = {
        currentMonth : new Date(),
        selectedDate : new Date()
    }
    renderHeader(){
        return (
            <div className="cal-header1">
                <div onClick={this.prevMonth} className="cal-header-left">
                    <img src={left} />
                </div>
                <div className="cal-header-middle">
                    <span>
                        {dateFns.format(this.state.currentMonth,'MMMM YYYY')}
                    </span>
                </div>
                <div onClick={this.nextMonth} className="cal-header-right">
                    <img src={right}/>
                </div>
            </div>
        )
    }
    renderWeeks(){
        const format = 'dddd';
        const { currentMonth , selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        let day = startDate ;
        let rows = [] ;
        for(let i=0;i<7;i++){
            rows.push(<div className="cal-day" key={i}>
                {dateFns.format(dateFns.addDays(startDate,i),format).toLocaleUpperCase()}
            </div>);
        }
        while(day<=endDate){
            for(let i=0 ; i<7 ; i++ ){
                const cloneDay = day;
                rows.push(
                    <div className={`cal-cell${
                        !dateFns.isSameMonth(day,monthStart)
                            ?'-disabled'
                            :dateFns.isSameDay(day,selectedDate)?'-sameday':''}`} 
                    key={day} 
                    onClick={()=>this.onDateClick(dateFns.parse(cloneDay))}>
                        {dateFns.format(day,'DD')}
                    </div>
                );
                day = dateFns.addDays(day,1);
            } 
        }
        return rows;
    }
    onDateClick = day => {
        this.setState({selectedDate:day});
    }
    nextMonth = () => {
        this.setState( { currentMonth:dateFns.addMonths(this.state.currentMonth,1) } )
    }
    prevMonth =() => {
        this.setState( { currentMonth:dateFns.subMonths(this.state.currentMonth,1) } )
    }
    render (){
        return (
            <div className="main">
                <div className="cal-header">{this.renderHeader()}</div>
                <div className="cal-weeks">{this.renderWeeks()}</div>
            </div>
        );
    }
}
export default Calender;