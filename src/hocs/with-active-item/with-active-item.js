import React from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: -1
      };

      this._handleActiveItemChange = this._handleActiveItemChange.bind(this);
    }

    _handleActiveItemChange(activeItem) {
      this.setState({activeItem});
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        onActiveItemChange={this._handleActiveItemChange}
      />;
    }

  }

  WithActiveItem.propTypes = {};

  return WithActiveItem;
};

export default withActiveItem;
