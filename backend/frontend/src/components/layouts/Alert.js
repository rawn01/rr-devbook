import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {
  const { alerts } = props;
  return (
    <>
      {alerts && alerts.length > 0 && alerts.map((alert) => {
        return (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
          </div>
        )
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alert
  }
}

export default connect(mapStateToProps, null)(Alert);
