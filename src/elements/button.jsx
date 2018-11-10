import React, { PureComponent } from "react";

//material ui
import Button from "@atlaskit/button";

class ButtonElement extends PureComponent {
  render() {
    const { text, ...rest } = this.props;
    return (
      <Button type="button" {...rest}>
        {text}
      </Button>
    );
  }
}

export default ButtonElement;
