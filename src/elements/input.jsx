import React, { PureComponent } from "react";
import { Input, Form } from "semantic-ui-react";

export class InputElement extends PureComponent {
  render() {
    return <Input {...this.props} />;
  }
}

export class FormInputElement extends PureComponent {
  render() {
    return <Form.Input {...this.props} />;
  }
}
