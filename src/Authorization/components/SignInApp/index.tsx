import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";

import { User, userDataBase } from "../../stores/models";
import { getSnapshot } from "mobx-state-tree";
// import { onSnapshot } from "mobx-state-tree";

interface Props {}

@observer
class SignIn extends Component<Props> {
  @observable username: string;
  @observable password: string;
  constructor(props: object) {
    super(props);
    this.username = "";
    this.password = "";
  }

  @action.bound
  handleOnChangeUsername(event: { target: { value: string } }) {
    console.log(event.target.value);
    this.username = event.target.value;
  }

  @action.bound
  handleOnChangePassword(event: { target: { value: string } }) {
    this.password = event.target.value;
  }

  @action.bound
  handleOnSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    console.log(this.username, this.password);

    User.create({
      name: this.username,
      password: this.password,
    });

    // @ts-ignore
    // console.dir(getSnapshot(userDataBase));
    this.clearData();
  }

  @action.bound
  clearData() {
    this.username = "";
    this.password = "";
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="username"
            value={this.username}
            onChange={this.handleOnChangeUsername}
          />
          <input
            type="password"
            placeholder="password"
            value={this.password}
            onChange={this.handleOnChangePassword}
          />
          <input type="submit" value="SignIn" />
        </form>
      </div>
    );
  }
}

export { SignIn };
