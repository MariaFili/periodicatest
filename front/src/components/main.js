import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';



const Order = props => (
    <tr>
        <td>{props.order.id}</td>
        <td>{props.order.email}</td>
        <td>{props.order.address}</td>
        <td>{props.order.fullName}</td>
        <td>{props.order.status}</td>
        <td>{props.order.orderItems.map(item => { return <tbody><tr><td>{item.productName}</td><td>{item.price}</td><td>{item.count}</td></tr></tbody> })}</td>
    </tr>
)



function searching(search) {
    return function (x) {
        return x.fullName.toLowerCase().includes(search.toLowerCase()) ||
            x.address.toLowerCase().includes(search.toLowerCase()) ||
            x.email.toLowerCase().includes(search.toLowerCase()) ||

            !search

    }
}



function statusSearching(search) {
    return function (x) {
        if (search === "all") {
            return x.status
        }
        else {
            return x.status.toLowerCase().includes(search.toLowerCase()) ||

                !search

        }
    }
}

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            search: "",
            status: "",
        }

        this.searchHandler = this.searchHandler.bind(this)
        this.statusHandler = this.statusHandler.bind(this)
        this.filtrationNameAsc = this.filtrationNameAsc.bind(this)
        this.filtrationNameDesc = this.filtrationNameDesc.bind(this)
        this.filtrationMailAsc = this.filtrationMailAsc.bind(this)
        this.filtrationMailDesc = this.filtrationMailDesc.bind(this)
        this.filtrationAddressAsc = this.filtrationAddressAsc.bind(this)
        this.filtrationAddressDesc = this.filtrationAddressDesc.bind(this)
    }

    searchHandler(event) {
        this.setState({ search: event.target.value })
    }
    statusHandler(event) {
        this.setState({ status: event.target.value })
    }

  

    filtrationNameAsc() {
        let res = this.state.orders.sort((a, b) => a.fullName > b.fullName ? -1 : 1);
        this.setState({ orders: res })
    }
    filtrationNameDesc() {
        let res = this.state.orders.sort((a, b) => a.fullName > b.fullName ? 1 : -1);
        this.setState({ orders: res })
    }
    filtrationMailAsc() {
        let res = this.state.orders.sort((a, b) => a.email > b.email ? -1 : 1);
        this.setState({ orders: res })
    }
    filtrationMailDesc() {
        let res = this.state.orders.sort((a, b) => a.email > b.email ? 1 : -1);
        this.setState({ orders: res })
    }
    filtrationAddressAsc() {
        let res = this.state.orders.sort((a, b) => a.address > b.address ? -1 : 1);
        this.setState({ orders: res })
    }
    filtrationAddressDesc() {
        let res = this.state.orders.sort((a, b) => a.address > b.address ? 1 : -1);
        this.setState({ orders: res })
    }




    componentDidMount() {
        const url = '/api/users';
        axios.get(url)
            .then(response => {
                this.setState({
                    orders: response.data
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    orderList() {
        return this.state.orders.filter(searching(this.state.search)).filter(statusSearching(this.state.status)).map(currentorder => {
            return <Order order={currentorder} />;
        })
    }





    render() {
        return (
            <div>
                <ul class="nav">
                    <li class="nav-item">
                        <form className="form-group"><label>Search: </label><input placeholder="enter a keyword" className="form-control" type="text" onChange={this.searchHandler}></input></form>
                    </li>
                    <li class="nav-item">
                        <form onChange={this.statusHandler} >
                            <div className="form-group">
                                <label>Status: </label>
                                <select ref="statusInput"
                                    required
                                    className="form-control"
                                    innerText="choose status"
                                >
                                    <option>all</option>
                                    <option>ready</option>
                                    <option>shipping</option>
                                    <option>canceled</option>
                                    <option>new</option>

                                </select>
                            </div>
                        </form>
                    </li>
                </ul>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>id</th>
                            <th>email <button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationMailAsc} >∧</button><button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationMailDesc} >∨</button></th>
                            <th>address <button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationAddressAsc} >∧</button><button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationAddressDesc} >∨</button></th>
                            <th>fullname <button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationNameAsc} >∧</button><button class="btn btn-outline-secondary btn-sm" onClick={this.filtrationNameDesc} >∨</button></th>
                            <th>status </th>
                            <th>items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.orderList()}
                    </tbody>
                </table>
            </div>
        )
    }
}