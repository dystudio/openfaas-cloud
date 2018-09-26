import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, CardBody } from 'reactstrap';

import { functionsApi } from '../api/functionsApi';
import { FunctionDetailSummary } from '../components/FunctionDetailSummary';
import { GetBadgeModal } from '../components/GetBadgeModal'

export class FunctionDetailPage extends Component {
  constructor(props) {
    super(props);
    const { repoPath } = queryString.parse(props.location.search);
    const { user, functionName } = props.match.params;

    this.handleShowBadgeModal = this.handleShowBadgeModal.bind(this);
    this.handleCloseBadgeModal = this.handleCloseBadgeModal.bind(this);

    this.state = {
      isLoading: true,
      fn: null,
      user,
      repoPath,
      functionName,
      showBadgeModal: false,
    };
  }

  componentDidMount() {
    const { user, repoPath, functionName } = this.state;

    this.setState({ isLoading: true });

    functionsApi.fetchFunction(user, repoPath, functionName).then(res => {
      this.setState({ isLoading: false, fn: res });
    });
  }

  handleShowBadgeModal() {
    this.setState({ showBadgeModal: true });
  }

  handleCloseBadgeModal() {
    this.setState({ showBadgeModal: false });
  }

  render() {
    const { isLoading, fn } = this.state;
    let panelBody = (
      <FunctionDetailSummary
        fn={fn}
        handleShowBadgeModal={this.handleShowBadgeModal}
      />
    );
    
    if (isLoading) {
      panelBody = (
        <div style={{ textAlign: 'center' }}>
          <FontAwesomeIcon icon="spinner" spin />{' '}
        </div>
      );
    }

    return (
      <Card outline color="success">
        <CardHeader
          className="bg-success color-success d-flex align-items-center justify-content-between"
        >
          <div>
            Function Overview
          </div>
        </CardHeader>
        <CardBody>
          { panelBody }
        </CardBody>
        <GetBadgeModal state={this.state.showBadgeModal} closeModal={this.handleCloseBadgeModal} />
      </Card>
    );
  }
}
