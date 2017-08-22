import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly);
    this.props.products.forEach((product) => {
      if (product.name.indexOf(this.props.filterText) === -1 ||
       (!product.stocked && this.props.inStockOnly)) {
        return;
      } // if product's cat doesn't equal the former one, make a new cat
      if (product.category !== lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      } //else push the next product
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category; // at end of iteration, reassign last cat to curr cat
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleFilterTextInputChange = //handleFilterTextInputChange will refer to SearchBar
    this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange =
    this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  handleInStockInputChange(e) {
    this.props.onInStockInput(e.target.checked);
  }

  render() {
    return (
      <form>
        <input type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
        <p>
          <input type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props){ // props passed in is product array
    super(props); // product array
    this.state = { // set initial state
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextInput = //makes this always be the current this
  this.handleFilterTextInput.bind(this);
    this.handleInStockInput =
  this.handleInStockInput.bind(this);
  }

  handleFilterTextInput(filterText){ //handler function that updates state
    this.setState({
      filterText: filterText
    });
  }

  handleInStockInput(inStockOnly){ //passes in state of inStock check box
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInput}
          onInStockInput={this.handleInStockInput} //triggered on change
        />
        <ProductTable
          products={this.props.products} //props passed into product table
          filterText={this.state.filterText} //initial/default state when 1st created
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
