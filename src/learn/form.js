import React from 'react'

// 处理多个输入
class FormComp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isGoing: false,
          numberOfGuests: 1,
          numberYear: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileInput = React.createRef();
    
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'isGoing' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleSubmit=(event)=> {
        console.log('表单值: ' + JSON.stringify(this.state));
        console.log(this.fileInput);
        
        event.preventDefault();
    }
    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                参与:
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.isGoing}
                    onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                来宾人数:
                <input
                    name="numberOfGuests"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                年份:
                <input
                    name="numberYear"
                    type="number"
                    value={this.state.numberYear}
                    onChange={this.handleInputChange} />
                </label>
                <br/>
                <label>
                    Upload file:(非受控组件)
                    <input type="file" ref={this.fileInput} />
                </label>
                <br/>
                <button type="submit">onSubmit</button>
            </form>
            </div>
        )
    }
}
export default FormComp